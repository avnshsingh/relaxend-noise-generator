import type { NoiseColorId } from "./colors"
import {
  DEFAULT_EQ_GAINS,
  EQ_BANDS,
  type EqGains,
} from "./eq"
import { CLICK_FADE_SECONDS } from "./presets"

const WORKLET_URL = "/worklets/noise-processor.js"
const MIN_CUTOFF = 280
const MAX_CUTOFF = 18000
const BELL_FUNDAMENTAL = 220
const BELL_PARTIALS = [
  { ratio: 1, gain: 0.2, decay: 6.8 },
  { ratio: 2.01, gain: 0.11, decay: 5.4 },
  { ratio: 2.76, gain: 0.07, decay: 4.4 },
  { ratio: 4.07, gain: 0.045, decay: 3.1 },
  { ratio: 5.43, gain: 0.025, decay: 2.3 },
  { ratio: 6.88, gain: 0.012, decay: 1.6 },
] as const

function toneToCutoff(tone: number): number {
  const t = Math.min(1, Math.max(0, tone))
  return MIN_CUTOFF * (MAX_CUTOFF / MIN_CUTOFF) ** t
}

/** Peak gain at volume=1. Twice the previous 0.72 ceiling. */
const OUTPUT_GAIN = 1.44
/** Phone speakers are quieter; extra 50% on coarse-pointer devices. */
const MOBILE_OUTPUT_BOOST = 1.5

function isMobilePlayback(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
}

function volumeToGain(volume: number): number {
  const v = Math.min(1, Math.max(0, volume))
  const boost = isMobilePlayback() ? MOBILE_OUTPUT_BOOST : 1
  return v ** 1.6 * OUTPUT_GAIN * boost
}

function fadeDuration(seconds: number | undefined): number {
  if (!seconds || seconds <= 0) return CLICK_FADE_SECONDS
  return seconds
}

export class NoiseEngine {
  private ctx: AudioContext | null = null
  private source: AudioWorkletNode | null = null
  private toneFilter: BiquadFilterNode | null = null
  private eqFilters: BiquadFilterNode[] = []
  private gain: GainNode | null = null
  private limiter: DynamicsCompressorNode | null = null
  private analyser: AnalyserNode | null = null
  private bellGain: GainNode | null = null
  private ready: Promise<void> | null = null
  private idleSuspendTimer: number | null = null
  private color: NoiseColorId = "pink"
  private volume = 0.4
  private tone = 0.62
  private eqGains: EqGains = { ...DEFAULT_EQ_GAINS }

  getAnalyser(): AnalyserNode | null {
    return this.analyser
  }

  getContext(): AudioContext | null {
    return this.ctx
  }

  async start(fadeInSeconds?: number): Promise<void> {
    this.clearIdleSuspend()
    await this.ensureGraph()
    if (!this.ctx || !this.gain) return

    if (this.ctx.state === "suspended") {
      await this.ctx.resume()
    }

    const now = this.ctx.currentTime
    const fade = fadeDuration(fadeInSeconds)
    this.gain.gain.cancelScheduledValues(now)
    this.gain.gain.setValueAtTime(0.0001, now)
    this.gain.gain.exponentialRampToValueAtTime(
      volumeToGain(this.volume),
      now + fade,
    )
  }

  async stop(fadeSeconds = CLICK_FADE_SECONDS): Promise<void> {
    if (!this.ctx || !this.gain) return

    const now = this.ctx.currentTime
    const fade = Math.max(CLICK_FADE_SECONDS, fadeDuration(fadeSeconds))
    this.gain.gain.cancelScheduledValues(now)
    this.gain.gain.setValueAtTime(Math.max(this.gain.gain.value, 0.0001), now)
    this.gain.gain.exponentialRampToValueAtTime(0.0001, now + fade)

    this.scheduleIdleSuspend(fade * 1000 + 40)
  }

  async strikeBell(): Promise<void> {
    this.clearIdleSuspend()
    await this.ensureGraph()
    if (!this.ctx || !this.bellGain) return

    if (this.ctx.state === "suspended") {
      await this.ctx.resume()
    }

    const now = this.ctx.currentTime
    for (const partial of BELL_PARTIALS) {
      const osc = this.ctx.createOscillator()
      const env = this.ctx.createGain()
      osc.type = "sine"
      osc.frequency.value = BELL_FUNDAMENTAL * partial.ratio
      env.gain.setValueAtTime(partial.gain, now)
      env.gain.exponentialRampToValueAtTime(0.0001, now + partial.decay)
      osc.connect(env)
      env.connect(this.bellGain)
      osc.start(now)
      osc.stop(now + partial.decay + 0.05)
    }

    this.scheduleIdleSuspend(7200)
  }

  setColor(color: NoiseColorId): void {
    this.color = color
    this.source?.port.postMessage({ color })
  }

  setVolume(volume: number): void {
    this.volume = volume
    if (!this.ctx || !this.gain) return
    if (this.ctx.state !== "running") return
    const now = this.ctx.currentTime
    this.gain.gain.cancelScheduledValues(now)
    this.gain.gain.setTargetAtTime(volumeToGain(volume), now, 0.03)
  }

  setTone(tone: number): void {
    this.tone = tone
    if (!this.ctx || !this.toneFilter) return
    const now = this.ctx.currentTime
    this.toneFilter.frequency.cancelScheduledValues(now)
    this.toneFilter.frequency.setTargetAtTime(toneToCutoff(tone), now, 0.04)
  }

  setEq(gains: EqGains): void {
    this.eqGains = { ...gains }
    if (!this.ctx || this.eqFilters.length === 0) return
    const now = this.ctx.currentTime
    for (let i = 0; i < EQ_BANDS.length; i++) {
      const band = EQ_BANDS[i]
      const filter = this.eqFilters[i]
      if (!band || !filter) continue
      filter.gain.cancelScheduledValues(now)
      filter.gain.setTargetAtTime(this.eqGains[band.id], now, 0.04)
    }
  }

  dispose(): void {
    this.clearIdleSuspend()
    void this.ctx?.close()
    this.ctx = null
    this.source = null
    this.toneFilter = null
    this.eqFilters = []
    this.gain = null
    this.limiter = null
    this.analyser = null
    this.bellGain = null
    this.ready = null
  }

  private scheduleIdleSuspend(delayMs: number): void {
    this.clearIdleSuspend()
    this.idleSuspendTimer = window.setTimeout(() => {
      const level = this.gain?.gain.value ?? 0
      if (level < 0.002 && this.ctx?.state === "running") {
        void this.ctx.suspend()
      }
    }, delayMs)
  }

  private clearIdleSuspend(): void {
    if (this.idleSuspendTimer !== null) {
      window.clearTimeout(this.idleSuspendTimer)
      this.idleSuspendTimer = null
    }
  }

  private async ensureGraph(): Promise<void> {
    if (this.ctx && this.source) return
    if (this.ready) {
      await this.ready
      return
    }

    this.ready = this.buildGraph()
    try {
      await this.ready
    } catch (error) {
      this.ready = null
      throw error
    }
  }

  private async buildGraph(): Promise<void> {
    const ctx = new AudioContext()
    this.ctx = ctx
    await ctx.audioWorklet.addModule(WORKLET_URL)

    const source = new AudioWorkletNode(ctx, "noise-processor", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [1],
    })
    source.port.postMessage({ color: this.color })

    const toneFilter = ctx.createBiquadFilter()
    toneFilter.type = "lowpass"
    toneFilter.Q.value = 0.707
    toneFilter.frequency.value = toneToCutoff(this.tone)

    const eqFilters = EQ_BANDS.map((band) => {
      const filter = ctx.createBiquadFilter()
      filter.type = band.type
      filter.frequency.value = band.freq
      if (band.type === "peaking") filter.Q.value = Math.SQRT2
      filter.gain.value = this.eqGains[band.id]
      return filter
    })

    const gain = ctx.createGain()
    gain.gain.value = 0.0001

    const limiter = ctx.createDynamicsCompressor()
    limiter.threshold.value = -1.5
    limiter.knee.value = 3
    limiter.ratio.value = 20
    limiter.attack.value = 0.003
    limiter.release.value = 0.12

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    analyser.smoothingTimeConstant = 0.45
    analyser.minDecibels = -92
    analyser.maxDecibels = -18

    const bellGain = ctx.createGain()
    bellGain.gain.value = 0.9

    source.connect(toneFilter)
    let node: AudioNode = toneFilter
    for (const filter of eqFilters) {
      node.connect(filter)
      node = filter
    }
    node.connect(gain)
    gain.connect(limiter)
    limiter.connect(analyser)
    analyser.connect(ctx.destination)
    bellGain.connect(ctx.destination)

    this.source = source
    this.toneFilter = toneFilter
    this.eqFilters = eqFilters
    this.gain = gain
    this.limiter = limiter
    this.analyser = analyser
    this.bellGain = bellGain
  }
}
