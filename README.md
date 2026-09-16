<div align="center">

# RelaxEnd Noise Generator

**Open-source procedural Web Audio synthesizer for focus, deep sleep, ADHD, and sound masking.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/avnshsingh/relaxend-noise-generator/pulls)

[Live App](https://relaxend.com/noise-generator) • [Official Website](https://relaxend.com) • [Report an Issue](https://github.com/avnshsingh/relaxend-noise-generator/issues) • [Request Feature](https://github.com/avnshsingh/relaxend-noise-generator/issues/new)

</div>

---

## Overview

**RelaxEnd Noise Generator** is a lightweight, zero-dependency procedural audio engine built for modern browsers. Unlike traditional noise apps or YouTube / Spotify streams that loop pre-recorded, compressed MP3 files, RelaxEnd calculates raw 32-bit floating point acoustic samples in real time using the **Web Audio API**.

- **Zero audio loops:** You will never hear an audible click, gap, or repetitive pattern.
- **Zero audio advertisements:** No mid-roll ads or loud commercial interruptions while sleeping or working.
- **100% Client-side:** Once loaded, it works completely offline—even in airplane mode.
- **Privacy-first:** No tracking cookies, no accounts, and no data uploaded.

---

## Key Features

### 1. 7 Calibrated Acoustic Noise Colors

| Noise Color | Falloff / Curve | Sounds Like | Primary Benefit |
| :--- | :--- | :--- | :--- |
| [**Brown Noise**](https://relaxend.com/brown-noise) | -6 dB / octave (1/f²) | Deep waterfall, distant thunder, jet cabin | Deep sleep, insomnia relief & ADHD calm |
| [**Pink Noise**](https://relaxend.com/pink-noise) | -3 dB / octave (1/f) | Gentle rainfall, rustling leaves, river | Deep focus, study blocks & memory |
| [**White Noise**](https://relaxend.com/white-noise) | 0 dB / octave (Flat) | Television static, tuned radio hiss | Speech masking & office privacy |
| [**Green Noise**](https://relaxend.com/green-noise) | ~500 Hz band-pass | Wind through pines, forest canopy | Meditation, breathwork & nature calm |
| [**Grey Noise**](https://relaxend.com/grey-noise) | Inverted A-weighting | Psychoacoustically balanced static | Equal perceived loudness & zero ear fatigue |
| [**Blue Noise**](https://relaxend.com/blue-noise) | +3 dB / octave (+f) | Sharp waterfall spray, crisp steam hiss | High-frequency noise suppression & dithering |
| [**Violet Noise**](https://relaxend.com/violet-noise) | +6 dB / octave (+f²) | Ultra-thin sizzling air, high treble | Tinnitus frequency habituation |

### 2. Studio 10-Band Graphic Equalizer
Shape frequencies from **31 Hz to 16 kHz** with ±12 dB precision across 10 octave bands:
`31 Hz` • `62 Hz` • `125 Hz` • `250 Hz` • `500 Hz` • `1 kHz` • `2 kHz` • `4 kHz` • `8 kHz` • `16 kHz`

### 3. Circadian Sleep Timer & Soft Exponential Fade-Out
Set timers from **15 minutes to 24 hours** (or custom intervals). An exponential volume taper prevents abrupt silence from startling you awake, accompanied by an optional Tibetan singing bowl chime.

### 4. Interactive Real-Time Spectrogram
A hardware-accelerated Canvas spectrogram renders live frequency activity and power spectral density as audio is generated.

### 5. Instant Circadian Presets
One-click access to curated acoustic environments:
- **Deep Ocean Sleep** (Brown noise + sub-bass boost)
- **Focus Flow State** (Pink noise neutral slope)
- **Airplane Cabin** (Brown noise + low cut)
- **Tinnitus Softener** (Violet + Grey noise high register)
- **Forest Wind** (Green noise organic band-pass)
- **Speech Shield** (White noise calibrated speech mask)

---

## Tech Stack & Architecture

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI Library:** [React 19](https://react.dev)
- **Audio Engine:** Web Audio API (`AudioContext`, `AudioWorkletNode`, `BiquadFilterNode`, `GainNode`)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com/)
- **Typography:** IBM Plex Sans & IBM Plex Mono via `next/font`
- **Package Manager:** [pnpm](https://pnpm.io) 10

---

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org) 20 or higher
- [pnpm](https://pnpm.io) 10 (pinned via `packageManager` in `package.json`)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/avnshsingh/relaxend-noise-generator.git
   cd relaxend-noise-generator
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the local development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the live app. Changes to `app/page.tsx`, `components/noise-lab.tsx`, or `lib/audio/` will automatically hot-reload.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js development server with Turbopack |
| `pnpm build` | Compiles the production build |
| `pnpm start` | Serves the compiled production build locally |
| `pnpm lint` | Runs ESLint to check for code quality and errors |

---

## Embedding Single Noise Generators

You can import and lock the player to a single noise color in any React component:

```tsx
import { NoiseLab } from "@/components/noise-lab";

// Render full multi-color generator
<NoiseLab color="all" />

// Lock to specific noise color
<NoiseLab color="brown" />
<NoiseLab color="pink" />
<NoiseLab color="white" />
<NoiseLab color="green" />
<NoiseLab color="gray" />
<NoiseLab color="blue" />
<NoiseLab color="violet" />
```

---

## How to Contribute

We welcome contributions from developers, audio engineers, sound designers, and accessibility advocates!

### Contribution Workflow

1. **Fork the repository** on GitHub.
2. **Clone your fork locally:**
   ```bash
   git clone https://github.com/<your-username>/relaxend-noise-generator.git
   cd relaxend-noise-generator
   ```
3. **Create a descriptive feature branch:**
   ```bash
   git checkout -b feat/add-binaural-modulator
   # or
   git checkout -b fix/audio-context-safari-resume
   ```
4. **Make your changes** following our guidelines:
   - Keep components focused, accessible, and clean.
   - Test audio playback across browsers (Chrome, Firefox, Safari).
   - Ensure the spectrogram renders smoothly without frame drops.
5. **Validate your code:**
   ```bash
   pnpm lint
   pnpm build
   ```
6. **Commit your changes** with a clear commit message:
   ```bash
   git commit -m "feat(audio): add binaural beat frequency modulation"
   ```
7. **Push to your fork and open a Pull Request:**
   Submit a PR against the `main` branch with a clear description of the problem solved and test steps.

---

## Reporting Issues & Feedback

Found a bug or have a suggestion for the noise generator? We would love to hear from you!

- **Issue Tracker:** [Open an issue on GitHub](https://github.com/avnshsingh/relaxend-noise-generator/issues)
- **Feature Requests:** [Submit a feature proposal](https://github.com/avnshsingh/relaxend-noise-generator/issues/new)
- **Discussions:** [Join the community discussions](https://github.com/avnshsingh/relaxend-noise-generator/discussions)

When filing a bug report, please include:
- Your operating system and browser version (e.g. macOS Sonoma, Chrome 124 / iOS 17.4 Safari).
- Audio output device (headphones, built-in speakers, Bluetooth).
- Steps to reproduce the unexpected behavior.

---

## Multilingual Support

The live version on [RelaxEnd.com](https://relaxend.com) is available in 11 languages:

- 🇺🇸 [English](https://relaxend.com)
- 🇪🇸 [Español (Spanish)](https://relaxend.com/es)
- 🇧🇷 [Português (Portuguese)](https://relaxend.com/pt)
- 🇮🇹 [Italiano (Italian)](https://relaxend.com/it)
- 🇩🇪 [Deutsch (German)](https://relaxend.com/de)
- 🇫🇷 [Français (French)](https://relaxend.com/fr)
- 🇮🇳 [हिन्दी (Hindi)](https://relaxend.com/hi)
- 🇮🇩 [Bahasa Indonesia](https://relaxend.com/id)
- 🇵🇱 [Polski (Polish)](https://relaxend.com/pl)
- 🇯🇵 [日本語 (Japanese)](https://relaxend.com/ja)
- 🇳🇱 [Nederlands (Dutch)](https://relaxend.com/nl)

---

## Community & Socials

Stay connected with the RelaxEnd ecosystem:

- **Official Website:** [relaxend.com](https://relaxend.com)
- **Noise Generator:** [relaxend.com/noise-generator](https://relaxend.com/noise-generator)
- **Sound Library:** [relaxend.com/sounds](https://relaxend.com/sounds)
- **YouTube:** [@relaxendapp](https://www.youtube.com/@relaxendapp)
- **X (Twitter):** [@relaxendapp](https://x.com/relaxendapp)
- **Instagram:** [@relaxendapp](https://www.instagram.com/relaxendapp)
- **LinkedIn:** [RelaxEnd](https://www.linkedin.com/company/relaxend)

---

## License

This project is open-source software licensed under the **[MIT License](LICENSE)**.

Built with care for sound lovers, deep sleepers, and focused thinkers worldwide by the [RelaxEnd](https://relaxend.com) team.
