import type { NoiseColorId } from "./colors"

export type IntentId = "sleep" | "focus" | "mask"

export type IntentPreset = {
  id: IntentId
  label: string
  color: NoiseColorId
  /** 0 = darker, 1 = brighter */
  tone: number
}

export const INTENT_PRESETS: IntentPreset[] = [
  { id: "sleep", label: "Sleep", color: "brown", tone: 0.28 },
  { id: "focus", label: "Focus", color: "pink", tone: 0.55 },
  { id: "mask", label: "Mask", color: "white", tone: 0.86 },
]

export const TIMER_OPTIONS = [
  { value: 0, label: "Off" },
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 60, label: "1 h" },
  { value: 120, label: "2 h" },
  { value: 300, label: "5 h" },
  { value: 480, label: "8 h" },
  { value: 600, label: "10 h" },
  { value: 720, label: "12 h" },
  { value: 900, label: "15 h" },
  { value: 1080, label: "18 h" },
  { value: 1440, label: "24 h" },
] as const

export const BELL_OPTIONS = [
  { value: 0, label: "Off" },
  { value: 2, label: "2 min" },
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
] as const

export const FADE_OPTIONS = [
  { value: 0, label: "Off" },
  { value: 3, label: "3 s" },
  { value: 10, label: "10 s" },
  { value: 30, label: "30 s" },
  { value: 60, label: "1 min" },
  { value: 300, label: "5 min" },
  { value: 600, label: "10 min" },
  { value: 900, label: "15 min" },
] as const

export const TONE_OPTIONS = [
  { value: 0.12, label: "Warmest" },
  { value: 0.28, label: "Warm" },
  { value: 0.42, label: "Soft" },
  { value: 0.55, label: "Neutral" },
  { value: 0.72, label: "Bright" },
  { value: 0.86, label: "Airy" },
  { value: 1, label: "Sharp" },
] as const

export const TIMER_VALUES = TIMER_OPTIONS.map((option) => option.value)
export const BELL_VALUES = BELL_OPTIONS.map((option) => option.value)
export const FADE_VALUES = FADE_OPTIONS.map((option) => option.value)
export const TONE_VALUES = TONE_OPTIONS.map((option) => option.value)

export const MIN_CUSTOM_TIMER = 1
export const MAX_CUSTOM_TIMER = 1440

export function formatTimerLabel(minutes: number): string {
  if (minutes <= 0) return "Off"
  if (minutes >= 60 && minutes % 60 === 0) return `${minutes / 60} h`
  return `${minutes} min`
}

export function isBuiltInTimer(minutes: number): boolean {
  return (TIMER_VALUES as readonly number[]).includes(minutes)
}

function nearestIndex(current: number, values: readonly number[]): number {
  let best = 0
  let bestDist = Number.POSITIVE_INFINITY
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    if (value === undefined) continue
    const dist = Math.abs(value - current)
    if (dist < bestDist) {
      best = i
      bestDist = dist
    }
  }
  return best
}

export function nextCycleValue(
  current: number,
  values: readonly number[],
): number {
  if (values.length === 0) return current
  const exact = values.findIndex((value) => Math.abs(value - current) < 1e-6)
  const index = exact >= 0 ? exact : nearestIndex(current, values)
  return values[(index + 1) % values.length] ?? current
}

export function snapTone(value: number): number {
  return TONE_VALUES[nearestIndex(value, TONE_VALUES)] ?? DEFAULT_TONE
}

export function formatToneLabel(tone: number): string {
  return TONE_OPTIONS[nearestIndex(tone, TONE_VALUES)]?.label ?? "Neutral"
}

export const DEFAULT_COLOR: NoiseColorId = "pink"
export const DEFAULT_VOLUME = 0.4
export const DEFAULT_TONE = 0.55
export const DEFAULT_TIMER_MINUTES = 0
export const DEFAULT_BELL_MINUTES = 0
export const DEFAULT_FADE_IN_SECONDS = 0
export const DEFAULT_FADE_OUT_SECONDS = 10
export const CLICK_FADE_SECONDS = 0.05
