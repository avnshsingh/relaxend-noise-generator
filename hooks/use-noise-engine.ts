"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"

import {
  isLockedNoiseColor,
  isNoiseColorId,
  type NoiseColorId,
  type NoiseLabColor,
} from "@/lib/audio/colors"
import { NoiseEngine } from "@/lib/audio/engine"
import {
  DEFAULT_EQ_GAINS,
  parseEqGains,
  type EqBandId,
  type EqGains,
} from "@/lib/audio/eq"
import {
  BELL_VALUES,
  CLICK_FADE_SECONDS,
  DEFAULT_BELL_MINUTES,
  DEFAULT_COLOR,
  DEFAULT_FADE_IN_SECONDS,
  DEFAULT_FADE_OUT_SECONDS,
  DEFAULT_TIMER_MINUTES,
  DEFAULT_TONE,
  DEFAULT_VOLUME,
  FADE_VALUES,
  INTENT_PRESETS,
  isBuiltInTimer,
  MAX_CUSTOM_TIMER,
  MIN_CUSTOM_TIMER,
  type IntentId,
} from "@/lib/audio/presets"

const STORAGE_KEY = "hum-noise-lab"

type PersistedState = {
  color: NoiseColorId
  volume: number
  tone: number
  timerMinutes: number
  bellMinutes: number
  fadeInSeconds: number
  fadeOutSeconds: number
  customTimers: number[]
  eq: EqGains
}

const FALLBACK: PersistedState = {
  color: DEFAULT_COLOR,
  volume: DEFAULT_VOLUME,
  tone: DEFAULT_TONE,
  timerMinutes: DEFAULT_TIMER_MINUTES,
  bellMinutes: DEFAULT_BELL_MINUTES,
  fadeInSeconds: DEFAULT_FADE_IN_SECONDS,
  fadeOutSeconds: DEFAULT_FADE_OUT_SECONDS,
  customTimers: [],
  eq: { ...DEFAULT_EQ_GAINS },
}

const listeners = new Set<() => void>()
let memory: PersistedState = FALLBACK
let loaded = false

function parseCustomTimers(value: unknown): number[] {
  if (!Array.isArray(value)) return []
  const unique = new Set<number>()
  for (const item of value) {
    if (
      typeof item === "number" &&
      Number.isInteger(item) &&
      item >= MIN_CUSTOM_TIMER &&
      item <= MAX_CUSTOM_TIMER &&
      !isBuiltInTimer(item)
    ) {
      unique.add(item)
    }
  }
  return [...unique].sort((a, b) => a - b)
}

function pickAllowed(
  value: unknown,
  allowed: readonly number[],
  fallback: number,
): number {
  return typeof value === "number" && allowed.includes(value) ? value : fallback
}

function isValidTimer(minutes: unknown, customTimers: number[]): minutes is number {
  if (typeof minutes !== "number" || !Number.isInteger(minutes)) return false
  return isBuiltInTimer(minutes) || customTimers.includes(minutes)
}

function parseState(raw: string | null): PersistedState {
  if (!raw) return FALLBACK
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    const customTimers = parseCustomTimers(parsed.customTimers)
    let timerMinutes = parsed.timerMinutes
    if (timerMinutes === 90 && !customTimers.includes(90)) timerMinutes = 60

    return {
      color:
        typeof parsed.color === "string" && isNoiseColorId(parsed.color)
          ? parsed.color
          : FALLBACK.color,
      volume:
        typeof parsed.volume === "number" && parsed.volume >= 0 && parsed.volume <= 1
          ? parsed.volume
          : FALLBACK.volume,
      tone:
        typeof parsed.tone === "number" && parsed.tone >= 0 && parsed.tone <= 1
          ? parsed.tone
          : FALLBACK.tone,
      customTimers,
      eq: parseEqGains(parsed.eq),
      timerMinutes: isValidTimer(timerMinutes, customTimers)
        ? timerMinutes
        : FALLBACK.timerMinutes,
      bellMinutes: pickAllowed(
        parsed.bellMinutes,
        BELL_VALUES,
        FALLBACK.bellMinutes,
      ),
      fadeInSeconds: pickAllowed(
        parsed.fadeInSeconds,
        FADE_VALUES,
        FALLBACK.fadeInSeconds,
      ),
      fadeOutSeconds: pickAllowed(
        parsed.fadeOutSeconds,
        FADE_VALUES,
        FALLBACK.fadeOutSeconds,
      ),
    }
  } catch {
    return FALLBACK
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

function getSnapshot(): PersistedState {
  return memory
}

function getServerSnapshot(): PersistedState {
  return FALLBACK
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function write(partial: Partial<PersistedState>) {
  memory = { ...getSnapshot(), ...partial }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory))
  }
  emit()
}

function fadeMsForStop(seconds: number): number {
  return (seconds > 0 ? seconds : CLICK_FADE_SECONDS) * 1000
}

export function useNoiseEngine(options: { color?: NoiseLabColor } = {}) {
  const lockedColor = isLockedNoiseColor(options.color) ? options.color : null
  const engineRef = useRef<NoiseEngine | null>(null)
  const stopTimerRef = useRef<number | null>(null)
  const fadeTimerRef = useRef<number | null>(null)
  const bellIntervalRef = useRef<number | null>(null)
  const deadlineRef = useRef<number | null>(null)
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const [playing, setPlaying] = useState(false)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const clearBell = useCallback(() => {
    if (bellIntervalRef.current) window.clearInterval(bellIntervalRef.current)
    bellIntervalRef.current = null
  }, [])

  const clearSleepTimers = useCallback(() => {
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current)
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    stopTimerRef.current = null
    fadeTimerRef.current = null
    deadlineRef.current = null
    setRemainingMs(null)
  }, [])

  const clearTimers = useCallback(() => {
    clearBell()
    clearSleepTimers()
  }, [clearBell, clearSleepTimers])

  useEffect(() => {
    const engine = new NoiseEngine()
    engineRef.current = engine

    if (!loaded) {
      loaded = true
      memory = parseState(window.localStorage.getItem(STORAGE_KEY))
      emit()
    }

    const next = getSnapshot()
    engine.setColor(lockedColor ?? next.color)
    engine.setVolume(next.volume)
    engine.setTone(next.tone)
    engine.setEq(next.eq)

    return () => {
      clearTimers()
      engine.dispose()
      engineRef.current = null
    }
    // lockedColor is applied in the effect below; listing it here would rebuild the
    // AudioContext (and trip Fast Refresh if the dep array length changes).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount/unmount only
  }, [clearTimers])

  const activeColor = lockedColor ?? settings.color

  useEffect(() => {
    engineRef.current?.setColor(activeColor)
    engineRef.current?.setVolume(settings.volume)
    engineRef.current?.setTone(settings.tone)
    engineRef.current?.setEq(settings.eq)
  }, [activeColor, settings.eq, settings.volume, settings.tone])

  const stop = useCallback(
    async (fadeSeconds?: number) => {
      clearTimers()
      await engineRef.current?.stop(fadeSeconds)
      setPlaying(false)
    },
    [clearTimers],
  )

  const armTimer = useCallback((minutes: number) => {
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current)
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)

    if (minutes <= 0) {
      deadlineRef.current = null
      setRemainingMs(null)
      return
    }

    const fadeOut = getSnapshot().fadeOutSeconds
    const durationMs = minutes * 60 * 1000
    const fadeMs = Math.min(fadeMsForStop(fadeOut), durationMs)
    const waitMs = Math.max(0, durationMs - fadeMs)
    deadlineRef.current = Date.now() + durationMs
    setRemainingMs(durationMs)

    fadeTimerRef.current = window.setTimeout(() => {
      void engineRef.current?.stop(fadeMs / 1000)
    }, waitMs)

    stopTimerRef.current = window.setTimeout(() => {
      clearBell()
      deadlineRef.current = null
      setRemainingMs(null)
      setPlaying(false)
    }, durationMs)
  }, [clearBell])

  const armBell = useCallback((minutes: number) => {
    clearBell()
    if (minutes <= 0) return
    bellIntervalRef.current = window.setInterval(() => {
      void engineRef.current?.strikeBell()
    }, minutes * 60 * 1000)
  }, [clearBell])

  const play = useCallback(async () => {
    setError(null)
    try {
      const next = getSnapshot()
      await engineRef.current?.start(next.fadeInSeconds)
      setAnalyser(engineRef.current?.getAnalyser() ?? null)
      setPlaying(true)
      armTimer(next.timerMinutes)
      armBell(next.bellMinutes)
    } catch {
      setError("Couldn’t start audio. Try tapping play again.")
      setPlaying(false)
    }
  }, [armBell, armTimer])

  const toggle = useCallback(() => {
    if (playing) {
      void stop()
    } else {
      void play()
    }
  }, [play, playing, stop])

  const setColor = useCallback(
    (next: NoiseColorId) => {
      if (lockedColor) return
      const eq = { ...DEFAULT_EQ_GAINS }
      write({ color: next, tone: DEFAULT_TONE, eq })
      engineRef.current?.setColor(next)
      engineRef.current?.setTone(DEFAULT_TONE)
      engineRef.current?.setEq(eq)
    },
    [lockedColor],
  )

  const setVolume = useCallback((next: number) => {
    write({ volume: next })
    engineRef.current?.setVolume(next)
  }, [])

  const setTone = useCallback((next: number) => {
    write({ tone: next })
    engineRef.current?.setTone(next)
  }, [])

  const setEqBand = useCallback((id: EqBandId, db: number) => {
    const eq = { ...getSnapshot().eq, [id]: db }
    write({ eq })
    engineRef.current?.setEq(eq)
  }, [])

  const resetEq = useCallback(() => {
    const eq = { ...DEFAULT_EQ_GAINS }
    write({ eq })
    engineRef.current?.setEq(eq)
  }, [])

  const setTimerMinutes = useCallback(
    (next: number) => {
      write({ timerMinutes: next })
      if (playing) armTimer(next)
      else {
        deadlineRef.current = null
        setRemainingMs(null)
      }
    },
    [armTimer, playing],
  )

  const addCustomTimer = useCallback(
    (minutes: number) => {
      if (
        !Number.isInteger(minutes) ||
        minutes < MIN_CUSTOM_TIMER ||
        minutes > MAX_CUSTOM_TIMER
      ) {
        return false
      }
      const customs = getSnapshot().customTimers
      if (!isBuiltInTimer(minutes) && !customs.includes(minutes)) {
        write({
          customTimers: [...customs, minutes].sort((a, b) => a - b),
        })
      }
      setTimerMinutes(minutes)
      return true
    },
    [setTimerMinutes],
  )

  const removeCustomTimer = useCallback(
    (minutes: number) => {
      const next = getSnapshot().customTimers.filter((item) => item !== minutes)
      const timerMinutes =
        getSnapshot().timerMinutes === minutes ? 0 : getSnapshot().timerMinutes
      write({ customTimers: next, timerMinutes })
      if (playing) armTimer(timerMinutes)
      else if (timerMinutes === 0) {
        deadlineRef.current = null
        setRemainingMs(null)
      }
    },
    [armTimer, playing],
  )

  const setBellMinutes = useCallback(
    (next: number) => {
      write({ bellMinutes: next })
      if (next > 0) {
        void engineRef.current?.strikeBell()
      }
      if (playing) armBell(next)
    },
    [armBell, playing],
  )

  const setFadeInSeconds = useCallback((next: number) => {
    write({ fadeInSeconds: next })
  }, [])

  const setFadeOutSeconds = useCallback(
    (next: number) => {
      write({ fadeOutSeconds: next })
      if (playing) armTimer(getSnapshot().timerMinutes)
    },
    [armTimer, playing],
  )

  const applyIntent = useCallback(
    (id: IntentId) => {
      const preset = INTENT_PRESETS.find((item) => item.id === id)
      if (!preset) return
      setColor(preset.color)
      setTone(preset.tone)
      void play()
    },
    [play, setColor, setTone],
  )

  useEffect(() => {
    if (!playing || !deadlineRef.current) return

    const tick = () => {
      const deadline = deadlineRef.current
      if (!deadline) return
      setRemainingMs(Math.max(0, deadline - Date.now()))
    }

    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [playing, settings.timerMinutes])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space") return
      const target = event.target as HTMLElement | null
      if (
        target?.closest(
          "button, input, textarea, select, [role='slider'], [role='combobox'], [data-slot='toggle-group-item'], [contenteditable='true']",
        )
      ) {
        return
      }
      event.preventDefault()
      toggle()
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [toggle])

  return {
    analyser,
    playing,
    color: activeColor,
    volume: settings.volume,
    tone: settings.tone,
    eq: settings.eq,
    timerMinutes: settings.timerMinutes,
    customTimers: settings.customTimers,
    bellMinutes: settings.bellMinutes,
    fadeInSeconds: settings.fadeInSeconds,
    fadeOutSeconds: settings.fadeOutSeconds,
    remainingMs,
    error,
    play,
    stop,
    toggle,
    setColor,
    setVolume,
    setTone,
    setEqBand,
    resetEq,
    setTimerMinutes,
    addCustomTimer,
    removeCustomTimer,
    setBellMinutes,
    setFadeInSeconds,
    setFadeOutSeconds,
    applyIntent,
  }
}
