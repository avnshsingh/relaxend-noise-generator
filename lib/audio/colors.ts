export const NOISE_COLOR_IDS = [
  "white",
  "pink",
  "brown",
  "green",
  "gray",
  "blue",
  "violet",
] as const

export type NoiseColorId = (typeof NOISE_COLOR_IDS)[number]

export type NoiseLabColor = "all" | NoiseColorId

export type NoiseColor = {
  id: NoiseColorId
  label: string
  hint: string
  /** CSS color used by UI + spectrogram */
  css: string
}

export const NOISE_COLORS: NoiseColor[] = [
  {
    id: "white",
    label: "White noise",
    hint: "Bright, even static. Masks voices and sudden sounds.",
    css: "oklch(0.90 0.012 95)",
  },
  {
    id: "pink",
    label: "Pink noise",
    hint: "Softer, like steady rain. Easy for long focus sessions.",
    css: "oklch(0.74 0.14 358)",
  },
  {
    id: "brown",
    label: "Brown noise",
    hint: "Deep rumble. The usual pick for sleep and traffic.",
    css: "oklch(0.62 0.13 52)",
  },
  {
    id: "green",
    label: "Green noise",
    hint: "Mid-focused, like a distant forest. Natural and even.",
    css: "oklch(0.70 0.13 145)",
  },
  {
    id: "gray",
    label: "Gray noise",
    hint: "Tuned to human hearing so every band feels equally loud.",
    css: "oklch(0.72 0.018 250)",
  },
  {
    id: "blue",
    label: "Blue noise",
    hint: "Bright airy hiss. Helps cover high-frequency noise.",
    css: "oklch(0.68 0.14 250)",
  },
  {
    id: "violet",
    label: "Violet noise",
    hint: "Thin treble fizz. For high ringing or sharp hiss.",
    css: "oklch(0.66 0.18 308)",
  },
]

export const NOISE_COLOR_MAP: Record<NoiseColorId, NoiseColor> =
  Object.fromEntries(NOISE_COLORS.map((color) => [color.id, color])) as Record<
    NoiseColorId,
    NoiseColor
  >

export function isNoiseColorId(value: string): value is NoiseColorId {
  return (NOISE_COLOR_IDS as readonly string[]).includes(value)
}

export function isLockedNoiseColor(
  color: NoiseLabColor | undefined,
): color is NoiseColorId {
  return color !== undefined && color !== "all"
}
