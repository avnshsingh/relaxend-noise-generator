/**
 * Real-time colored noise on the audio thread.
 * Types: white, pink, brown, green, gray, blue, violet.
 */

class Biquad {
  constructor() {
    this.b0 = 1
    this.b1 = 0
    this.b2 = 0
    this.a1 = 0
    this.a2 = 0
    this.x1 = 0
    this.x2 = 0
    this.y1 = 0
    this.y2 = 0
  }

  setBandpass(freq, Q, sampleRate) {
    const w0 = (2 * Math.PI * freq) / sampleRate
    const cos = Math.cos(w0)
    const sin = Math.sin(w0)
    const alpha = sin / (2 * Q)
    const a0 = 1 + alpha
    this.b0 = (sin / 2) / a0
    this.b1 = 0
    this.b2 = -this.b0
    this.a1 = (-2 * cos) / a0
    this.a2 = (1 - alpha) / a0
  }

  setPeaking(freq, Q, gainDb, sampleRate) {
    const A = 10 ** (gainDb / 40)
    const w0 = (2 * Math.PI * freq) / sampleRate
    const cos = Math.cos(w0)
    const sin = Math.sin(w0)
    const alpha = sin / (2 * Q)
    const a0 = 1 + alpha / A
    this.b0 = (1 + alpha * A) / a0
    this.b1 = (-2 * cos) / a0
    this.b2 = (1 - alpha * A) / a0
    this.a1 = (-2 * cos) / a0
    this.a2 = (1 - alpha / A) / a0
  }

  setLowShelf(freq, gainDb, sampleRate) {
    const A = 10 ** (gainDb / 40)
    const w0 = (2 * Math.PI * freq) / sampleRate
    const cos = Math.cos(w0)
    const sin = Math.sin(w0)
    const alpha = sin / 2
    const twoSqrtAAlpha = 2 * Math.sqrt(A) * alpha
    const a0 = A + 1 + (A - 1) * cos + twoSqrtAAlpha
    this.b0 = (A * (A + 1 - (A - 1) * cos + twoSqrtAAlpha)) / a0
    this.b1 = (2 * A * (A - 1 - (A + 1) * cos)) / a0
    this.b2 = (A * (A + 1 - (A - 1) * cos - twoSqrtAAlpha)) / a0
    this.a1 = (-2 * (A - 1 + (A + 1) * cos)) / a0
    this.a2 = (A + 1 + (A - 1) * cos - twoSqrtAAlpha) / a0
  }

  setHighShelf(freq, gainDb, sampleRate) {
    const A = 10 ** (gainDb / 40)
    const w0 = (2 * Math.PI * freq) / sampleRate
    const cos = Math.cos(w0)
    const sin = Math.sin(w0)
    const alpha = sin / 2
    const twoSqrtAAlpha = 2 * Math.sqrt(A) * alpha
    const a0 = A + 1 - (A - 1) * cos + twoSqrtAAlpha
    this.b0 = (A * (A + 1 + (A - 1) * cos + twoSqrtAAlpha)) / a0
    this.b1 = (-2 * A * (A - 1 + (A + 1) * cos)) / a0
    this.b2 = (A * (A + 1 + (A - 1) * cos - twoSqrtAAlpha)) / a0
    this.a1 = (2 * (A - 1 - (A + 1) * cos)) / a0
    this.a2 = (A + 1 - (A - 1) * cos - twoSqrtAAlpha) / a0
  }

  process(x) {
    const y =
      this.b0 * x +
      this.b1 * this.x1 +
      this.b2 * this.x2 -
      this.a1 * this.y1 -
      this.a2 * this.y2
    this.x2 = this.x1
    this.x1 = x
    this.y2 = this.y1
    this.y1 = y
    return y
  }
}

const GAINS = {
  white: 0.22,
  pink: 0.28,
  brown: 0.45,
  green: 0.55,
  gray: 0.24,
  blue: 0.18,
  violet: 0.12,
}

class NoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
    this.color = "pink"
    this.b0 = 0
    this.b1 = 0
    this.b2 = 0
    this.b3 = 0
    this.b4 = 0
    this.b5 = 0
    this.b6 = 0
    this.brown = 0
    this.prevWhite = 0
    this.prevBlue = 0

    this.green = new Biquad()
    this.green.setBandpass(500, 0.7, sampleRate)

    this.grayLow = new Biquad()
    this.grayPeak = new Biquad()
    this.grayHigh = new Biquad()
    this.grayLow.setLowShelf(250, 6, sampleRate)
    this.grayPeak.setPeaking(2800, 0.8, -8, sampleRate)
    this.grayHigh.setHighShelf(7000, 5, sampleRate)

    this.port.onmessage = (event) => {
      const next = event.data?.color
      if (typeof next === "string" && next in GAINS) {
        this.color = next
      }
    }
  }

  pink(white) {
    this.b0 = 0.99886 * this.b0 + white * 0.0555179
    this.b1 = 0.99332 * this.b1 + white * 0.0750759
    this.b2 = 0.969 * this.b2 + white * 0.153852
    this.b3 = 0.8665 * this.b3 + white * 0.3104856
    this.b4 = 0.55 * this.b4 + white * 0.5329522
    this.b5 = -0.7616 * this.b5 - white * 0.016898
    const pink =
      this.b0 +
      this.b1 +
      this.b2 +
      this.b3 +
      this.b4 +
      this.b5 +
      this.b6 +
      white * 0.5362
    this.b6 = white * 0.115926
    return pink * 0.11
  }

  process(_inputs, outputs) {
    const channel = outputs[0]?.[0]
    if (!channel) return true

    const gain = GAINS[this.color] ?? 0.22
    const color = this.color

    for (let i = 0; i < channel.length; i++) {
      const white = Math.random() * 2 - 1
      let sample = white

      switch (color) {
        case "pink":
          sample = this.pink(white)
          break
        case "brown":
          this.brown = (this.brown + white * 0.02) * 0.996
          sample = this.brown
          break
        case "blue":
          sample = white - this.prevWhite
          break
        case "violet": {
          const blue = white - this.prevWhite
          sample = blue - this.prevBlue
          this.prevBlue = blue
          break
        }
        case "green":
          sample = this.green.process(white)
          break
        case "gray":
          sample = this.grayHigh.process(
            this.grayPeak.process(this.grayLow.process(white)),
          )
          break
        default:
          sample = white
      }

      this.prevWhite = white
      channel[i] = Math.max(-1, Math.min(1, sample * gain))
    }

    return true
  }
}

registerProcessor("noise-processor", NoiseProcessor)
