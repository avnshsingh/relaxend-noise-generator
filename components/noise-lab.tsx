"use client"

import { type CSSProperties, useState } from "react"
import { Pause, Play, Plus, X } from "lucide-react"

import { Spectrogram } from "@/components/spectrogram"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { NOISE_COLORS, isLockedNoiseColor, type NoiseColorId, type NoiseLabColor } from "@/lib/audio/colors"
import {
  EQ_BANDS,
  EQ_GAIN_MAX,
  EQ_GAIN_MIN,
  formatEqGain,
} from "@/lib/audio/eq"
import {
  BELL_OPTIONS,
  BELL_VALUES,
  FADE_OPTIONS,
  FADE_VALUES,
  INTENT_PRESETS,
  MAX_CUSTOM_TIMER,
  MIN_CUSTOM_TIMER,
  TIMER_OPTIONS,
  TONE_OPTIONS,
  formatTimerLabel,
  nextCycleValue,
  snapTone,
} from "@/lib/audio/presets"
import { useNoiseEngine } from "@/hooks/use-noise-engine"
import { cn } from "@/lib/utils"

const chipClass = cn(
  "h-9 rounded-lg border border-transparent px-3",
  "data-[state=on]:border-(--noise) data-[state=on]:bg-[color-mix(in_oklch,var(--noise)_18%,transparent)]",
  "data-[state=on]:text-foreground",
)

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function ChipRow({
  label,
  hint,
  value,
  options,
  onChange,
  ariaLabel,
}: {
  label: string
  hint?: string
  value: number
  options: readonly { value: number; label: string }[]
  onChange: (value: number) => void
  ariaLabel: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <ToggleGroup
        type="single"
        value={String(value)}
        onValueChange={(next) => {
          if (next) onChange(Number(next))
        }}
        spacing={1}
        className="flex w-full flex-wrap"
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={String(option.value)}
            className={chipClass}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export function NoiseLab({ color: colorProp = "all" }: { color?: NoiseLabColor }) {
  const locked = isLockedNoiseColor(colorProp)
  const {
    analyser,
    playing,
    color,
    volume,
    tone,
    eq,
    timerMinutes,
    customTimers,
    bellMinutes,
    fadeInSeconds,
    fadeOutSeconds,
    remainingMs,
    error,
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
  } = useNoiseEngine({ color: colorProp })

  const [customizeOpen, setCustomizeOpen] = useState(false)
  const [eqOpen, setEqOpen] = useState(false)
  const [addingTimer, setAddingTimer] = useState(false)
  const [customMinutesDraft, setCustomMinutesDraft] = useState("")

  const active = NOISE_COLORS.find((item) => item.id === color) ?? NOISE_COLORS[1]
  const timerCycleValues = [
    ...TIMER_OPTIONS.map((option) => option.value),
    ...customTimers,
  ]
  const timerLabel = formatTimerLabel(timerMinutes)
  const bellLabel =
    BELL_OPTIONS.find((option) => option.value === bellMinutes)?.label ?? "Off"
  const fadeOutLabel =
    FADE_OPTIONS.find((option) => option.value === fadeOutSeconds)?.label ?? "Off"

  function saveCustomTimer() {
    const minutes = Number.parseInt(customMinutesDraft, 10)
    if (Number.isNaN(minutes)) return
    if (addCustomTimer(minutes)) {
      setCustomMinutesDraft("")
      setAddingTimer(false)
    }
  }

  return (
    <div
      className="relative flex min-h-dvh flex-col text-foreground"
      style={
        {
          "--noise": active.css,
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,color-mix(in_oklch,var(--noise)_22%,transparent),transparent_70%)]"
      />

      <header className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <a
            href="https://relaxend.com"
            className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
            aria-label="RelaxEnd Home"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-bold text-xs shadow-xs">
              RE
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                RelaxEnd
              </span>
              <span className="hidden -mt-1 text-[11px] font-mono text-muted-foreground sm:block">
                Noise Lab · Procedural Synth
              </span>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          {playing && remainingMs !== null ? (
            <p
              className="font-mono text-sm tabular-nums text-(--noise)"
              aria-live="polite"
            >
              {formatRemaining(remainingMs)}
            </p>
          ) : null}

          <a
            href="https://github.com/avnshsingh/relaxend-noise-generator"
            target="_blank"
            rel="noreferrer"
            aria-label="Star RelaxEnd Noise Generator on GitHub"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 shadow-xs select-none"
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>Star</span>
            <span className="text-amber-400 font-bold">★</span>
          </a>

          <a
            href="#sound-guide"
            className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
          >
            Sound Guide
          </a>
        </div>
      </header>

      <div className="relative mx-5 min-h-52 flex-1 overflow-hidden rounded-xl sm:mx-8">
        <Spectrogram
          analyser={analyser}
          color={color}
          playing={playing}
          tone={tone}
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_12%,transparent_82%,color-mix(in_oklch,var(--background)_70%,transparent)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-1.5 px-4">
          <p className="rounded-full bg-background/70 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-foreground uppercase">
            {active.label}
          </p>
        </div>
      </div>

      <footer className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex items-center gap-5">
          <Button
            type="button"
            size="icon-lg"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Stop noise" : "Play noise"}
            className={cn(
              "size-16 rounded-full border-0 shadow-none transition-colors",
              "bg-(--noise) text-background hover:bg-(--noise)/85",
              "focus-visible:ring-(--noise)/40",
            )}
          >
            {playing ? (
              <Pause className="size-6 fill-current" />
            ) : (
              <Play className="size-6 fill-current" />
            )}
          </Button>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor="volume" id="volume-label" className="text-sm text-muted-foreground">
                Volume
              </label>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {Math.round(volume * 100)}
              </span>
            </div>
            <Slider
              id="volume"
              min={0}
              max={100}
              step={1}
              value={[Math.round(volume * 100)]}
              onValueChange={([value]) => setVolume((value ?? 0) / 100)}
              aria-labelledby="volume-label"
              aria-label="Volume"
              className="**:data-[slot=slider-range]:bg-(--noise) **:data-[slot=slider-thumb]:border-(--noise)"
            />
            <p className="text-xs text-muted-foreground">
              Space to play or stop
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setTimerMinutes(nextCycleValue(timerMinutes, timerCycleValues))
            }
            aria-label={`Sleep timer, ${timerLabel}. Click to cycle.`}
            className="h-auto flex-col items-start gap-0 rounded-lg border-border/80 bg-background/30 px-3 py-1.5"
          >
            <span className="text-[11px] text-muted-foreground">Sleep timer</span>
            <span className="text-sm text-foreground">{timerLabel}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setBellMinutes(nextCycleValue(bellMinutes, BELL_VALUES))
            }
            aria-label={`Meditation bell, ${bellLabel}. Click to cycle.`}
            className="h-auto flex-col items-start gap-0 rounded-lg border-border/80 bg-background/30 px-3 py-1.5"
          >
            <span className="text-[11px] text-muted-foreground">
              Meditation bell
            </span>
            <span className="text-sm text-foreground">{bellLabel}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setFadeOutSeconds(nextCycleValue(fadeOutSeconds, FADE_VALUES))
            }
            aria-label={`Fade out, ${fadeOutLabel}. Click to cycle.`}
            className="h-auto flex-col items-start gap-0 rounded-lg border-border/80 bg-background/30 px-3 py-1.5"
          >
            <span className="text-[11px] text-muted-foreground">Fade out</span>
            <span className="text-sm text-foreground">{fadeOutLabel}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-expanded={customizeOpen}
            aria-controls="customize-card"
            onClick={() => {
              setCustomizeOpen((open) => !open)
              if (customizeOpen) {
                setAddingTimer(false)
                setCustomMinutesDraft("")
              }
            }}
            className="h-auto flex-col items-start gap-0 rounded-lg border-border/80 bg-background/30 px-3 py-1.5"
          >
            <span className="text-[11px] text-muted-foreground">Customize</span>
            <span className="text-sm text-foreground">
              {customizeOpen ? "Hide" : "Show"}
            </span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-expanded={eqOpen}
            aria-controls="equalizer-card"
            onClick={() => setEqOpen((open) => !open)}
            className="h-auto flex-col items-start gap-0 rounded-lg border-border/80 bg-background/30 px-3 py-1.5"
          >
            <span className="text-[11px] text-muted-foreground">Equalizer</span>
            <span className="text-sm text-foreground">
              {eqOpen ? "Hide" : "Show"}
            </span>
          </Button>
        </div>

        {customizeOpen ? (
          <div
            id="customize-card"
            className="flex flex-col gap-5 rounded-xl border border-border/70 bg-background/40 p-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">Sleep timer</p>
              <div className="flex flex-wrap items-center gap-1">
                <ToggleGroup
                  type="single"
                  value={String(timerMinutes)}
                  onValueChange={(next) => {
                    if (next) setTimerMinutes(Number(next))
                  }}
                  spacing={1}
                  className="flex flex-wrap"
                  aria-label="Sleep timer"
                >
                  {TIMER_OPTIONS.map((option) => (
                    <ToggleGroupItem
                      key={option.value}
                      value={String(option.value)}
                      className={chipClass}
                    >
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                  {customTimers.map((minutes) => (
                    <span
                      key={minutes}
                      className="inline-flex items-center"
                    >
                      <ToggleGroupItem
                        value={String(minutes)}
                        className={chipClass}
                      >
                        {formatTimerLabel(minutes)}
                      </ToggleGroupItem>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        aria-label={`Remove ${formatTimerLabel(minutes)} timer`}
                        onClick={(event) => {
                          event.stopPropagation()
                          removeCustomTimer(minutes)
                        }}
                        className="text-muted-foreground"
                      >
                        <X className="size-3" />
                      </Button>
                    </span>
                  ))}
                </ToggleGroup>
                {addingTimer ? (
                  <form
                    className="flex items-center gap-1"
                    onSubmit={(event) => {
                      event.preventDefault()
                      saveCustomTimer()
                    }}
                  >
                    <input
                      type="number"
                      min={MIN_CUSTOM_TIMER}
                      max={MAX_CUSTOM_TIMER}
                      step={1}
                      inputMode="numeric"
                      value={customMinutesDraft}
                      onChange={(event) => setCustomMinutesDraft(event.target.value)}
                      placeholder="min"
                      aria-label="Custom sleep minutes"
                      autoFocus
                      className="h-8 w-16 rounded-lg border border-border/70 bg-background/40 px-2 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                    <Button type="submit" size="sm" variant="outline">
                      Save
                    </Button>
                  </form>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label="Add custom sleep timer"
                    onClick={() => setAddingTimer(true)}
                    className="border-border/70 bg-background/40"
                  >
                    <Plus className="size-3.5" />
                  </Button>
                )}
              </div>
            </div>

            <ChipRow
              label="Meditation bell"
              hint="rings once when you pick one"
              value={bellMinutes}
              options={BELL_OPTIONS}
              onChange={setBellMinutes}
              ariaLabel="Meditation bell"
            />
            <ChipRow
              label="Fade in"
              hint="softens the start"
              value={fadeInSeconds}
              options={FADE_OPTIONS}
              onChange={setFadeInSeconds}
              ariaLabel="Fade in"
            />
            <ChipRow
              label="Fade out"
              value={fadeOutSeconds}
              options={FADE_OPTIONS}
              onChange={setFadeOutSeconds}
              ariaLabel="Fade out"
            />
          </div>
        ) : null}

        {eqOpen ? (
          <div
            id="equalizer-card"
            className="flex flex-col gap-4 rounded-xl border border-border/70 bg-background/40 p-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm text-muted-foreground">Equalizer</p>
              <p className="text-xs text-muted-foreground">
                31 Hz — 16 kHz
              </p>
            </div>
            <div className="flex items-end justify-between gap-1 sm:gap-2">
              {EQ_BANDS.map((band) => (
                <div
                  key={band.id}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground sm:text-xs">
                    {formatEqGain(eq[band.id])}
                  </span>
                  <Slider
                    orientation="vertical"
                    min={EQ_GAIN_MIN}
                    max={EQ_GAIN_MAX}
                    step={1}
                    value={[eq[band.id]]}
                    onValueChange={([value]) =>
                      setEqBand(band.id, value ?? 0)
                    }
                    aria-label={`${band.label} Hz equalizer, ${formatEqGain(eq[band.id])} dB`}
                    className="h-32 **:data-[slot=slider-range]:bg-(--noise) **:data-[slot=slider-thumb]:border-(--noise)"
                  />
                  <span className="text-[10px] text-muted-foreground sm:text-xs">
                    {band.label}
                  </span>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetEq}
              className="w-fit border-border/70 bg-background/30"
            >
              Flat
            </Button>
          </div>
        ) : null}

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2">
          {locked ? null : (
            <>
              <p className="text-sm text-muted-foreground">Color</p>
              <ToggleGroup
                type="single"
                value={color}
                onValueChange={(value) => {
                  if (value) setColor(value as NoiseColorId)
                }}
                spacing={1}
                className="flex w-full flex-wrap"
                aria-label="Noise color"
              >
                {NOISE_COLORS.map((item) => (
                  <ToggleGroupItem
                    key={item.id}
                    value={item.id}
                    aria-label={item.label}
                    className={cn(chipClass, "grow basis-24")}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: item.css }}
                      aria-hidden
                    />
                    {item.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </>
          )}
          <p aria-live="polite" className="text-sm text-foreground/80">
            {active.hint}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <label htmlFor="tone" id="tone-label" className="text-sm text-muted-foreground">
              Tone
            </label>
            <span className="text-xs text-muted-foreground">
              darker — brighter
            </span>
          </div>
          <Slider
            id="tone"
            min={0}
            max={100}
            step={1}
            value={[Math.round(tone * 100)]}
            onValueChange={([value]) => setTone((value ?? 0) / 100)}
            aria-labelledby="tone-label"
            aria-label="Tone, darker to brighter"
            className="**:data-[slot=slider-range]:bg-(--noise) **:data-[slot=slider-thumb]:border-(--noise)"
          />
          <ToggleGroup
            type="single"
            value={String(snapTone(tone))}
            onValueChange={(value) => {
              if (value) setTone(Number(value))
            }}
            spacing={1}
            className="flex w-full flex-wrap"
            aria-label="Tone presets"
          >
            {TONE_OPTIONS.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={String(option.value)}
                className={chipClass}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {locked ? null : (
          <>
            <Separator className="bg-border/70" />

            <div className="flex flex-wrap gap-2">
              {INTENT_PRESETS.map((preset) => (
                <Button
                  key={preset.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyIntent(preset.id)}
                  className="rounded-full border-border/80 bg-background/30"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </footer>
    </div>
  )
}
