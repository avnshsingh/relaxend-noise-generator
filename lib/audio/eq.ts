export const EQ_BANDS = [
  { id: "31", label: "31", freq: 31, type: "lowshelf" },
  { id: "63", label: "63", freq: 63, type: "peaking" },
  { id: "125", label: "125", freq: 125, type: "peaking" },
  { id: "250", label: "250", freq: 250, type: "peaking" },
  { id: "500", label: "500", freq: 500, type: "peaking" },
  { id: "1k", label: "1k", freq: 1000, type: "peaking" },
  { id: "2k", label: "2k", freq: 2000, type: "peaking" },
  { id: "4k", label: "4k", freq: 4000, type: "peaking" },
  { id: "8k", label: "8k", freq: 8000, type: "peaking" },
  { id: "16k", label: "16k", freq: 16000, type: "highshelf" },
] as const

export type EqBandId = (typeof EQ_BANDS)[number]["id"]
export type EqGains = Record<EqBandId, number>

export const EQ_GAIN_MIN = -12
export const EQ_GAIN_MAX = 12

export const DEFAULT_EQ_GAINS: EqGains = {
  "31": 0,
  "63": 0,
  "125": 0,
  "250": 0,
  "500": 0,
  "1k": 0,
  "2k": 0,
  "4k": 0,
  "8k": 0,
  "16k": 0,
}

export function parseEqGains(value: unknown): EqGains {
  const next = { ...DEFAULT_EQ_GAINS }
  if (!value || typeof value !== "object") return next
  const record = value as Record<string, unknown>
  for (const band of EQ_BANDS) {
    const db = record[band.id]
    if (typeof db === "number" && db >= EQ_GAIN_MIN && db <= EQ_GAIN_MAX) {
      next[band.id] = db
    }
  }
  return next
}

export function formatEqGain(db: number): string {
  if (Math.abs(db) < 0.05) return "0"
  return `${db > 0 ? "+" : ""}${db.toFixed(0)}`
}
