"use client"

import { useEffect, useRef } from "react"

import { NOISE_COLOR_MAP, type NoiseColorId } from "@/lib/audio/colors"
import { cn } from "@/lib/utils"

type SpectrogramProps = {
  analyser: AnalyserNode | null
  color: NoiseColorId
  playing: boolean
  tone: number
  className?: string
}

const BAR_COUNT = 36

function parseOklch(css: string): { l: number; c: number; h: number } {
  const match = css.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
  if (!match) return { l: 0.7, c: 0.1, h: 32 }
  return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) }
}

function toneWeight(t: number, tone: number): number {
  const tilt = 0.5 - tone
  return Math.max(0.25, 1 + (0.5 - t) * tilt * 2.2)
}

export function Spectrogram({
  analyser,
  color,
  playing,
  tone,
  className,
}: SpectrogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const binsRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const heightsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0.08))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let frame = 0
    const palette = parseOklch(NOISE_COLOR_MAP[color].css)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const nyquist = analyser?.context.sampleRate
      ? analyser.context.sampleRate / 2
      : 22050
    const logMin = Math.log(40)
    const logMax = Math.log(Math.max(nyquist, 80))

    const draw = (now: number) => {
      frame = window.requestAnimationFrame(draw)
      const { width, height } = canvas
      if (width < 2 || height < 2) return

      ctx.clearRect(0, 0, width, height)

      if (!playing) {
        const mid = height * 0.55
        ctx.beginPath()
        ctx.moveTo(0, mid)
        for (let x = 0; x <= width; x += 2) {
          const n = reduced
            ? Math.sin(x * 0.014 + palette.h) * 14
            : Math.sin(x * 0.012 + palette.h + now * 0.00045) * 16 +
              Math.sin(x * 0.035 + palette.c * 40) * 6
          ctx.lineTo(x, mid + n)
        }
        ctx.strokeStyle = `oklch(${palette.l} ${palette.c} ${palette.h} / 0.55)`
        ctx.lineWidth = Math.max(2, width / 420)
        ctx.stroke()
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        ctx.fillStyle = `oklch(${palette.l} ${palette.c} ${palette.h} / 0.08)`
        ctx.fill()
        return
      }

      const node = analyser
      const heights = heightsRef.current
      const padX = width * 0.08
      const inner = width - padX * 2
      const gap = inner / BAR_COUNT
      const barW = Math.max(3, gap * 0.55)
      const maxH = height * 0.72
      const baseY = height * 0.82

      if (node) {
        const binCount = node.frequencyBinCount
        if (!binsRef.current || binsRef.current.length !== binCount) {
          binsRef.current = new Uint8Array(new ArrayBuffer(binCount))
        }
        const bins = binsRef.current
        node.getByteFrequencyData(bins)

        for (let i = 0; i < BAR_COUNT; i++) {
          const t = i / (BAR_COUNT - 1)
          const hz = Math.exp(logMin + t * (logMax - logMin))
          const index = Math.min(
            binCount - 1,
            Math.floor((hz / nyquist) * binCount),
          )
          const mag = (bins[index] / 255) ** 0.7
          const next = Math.min(1, mag * toneWeight(t, tone))
          heights[i] = reduced ? next : heights[i] * 0.62 + next * 0.38
        }
      }

      for (let i = 0; i < BAR_COUNT; i++) {
        const t = i / (BAR_COUNT - 1)
        const h = Math.max(0.06, heights[i]) * maxH
        const x = padX + i * gap + (gap - barW) / 2
        const y = baseY - h
        const l = 0.42 + heights[i] * 0.35
        const c = palette.c * (0.45 + t * 0.4)
        ctx.fillStyle = `oklch(${l} ${c} ${palette.h} / ${0.45 + heights[i] * 0.5})`
        ctx.beginPath()
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(x, y, barW, h, Math.min(barW / 2, 6))
        } else {
          ctx.rect(x, y, barW, h)
        }
        ctx.fill()
      }
    }

    frame = window.requestAnimationFrame(draw)
    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [analyser, color, playing, tone])

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
      aria-hidden
    />
  )
}
