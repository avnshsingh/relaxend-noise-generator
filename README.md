<div align="center">

# RelaxEnd Noise Generator

**Open-source procedural Web Audio synthesizer for focus, deep sleep, ADHD, and sound masking.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/avnshsingh/relaxend-noise-generator/pulls)

<a href="https://relaxend.com/noise-generator" target="_blank" rel="noopener noreferrer">Live App</a> • <a href="https://relaxend.com" target="_blank" rel="noopener noreferrer">Official Website</a> • <a href="https://github.com/avnshsingh/relaxend-noise-generator/issues" target="_blank" rel="noopener noreferrer">Report an Issue</a> • <a href="https://github.com/avnshsingh/relaxend-noise-generator/issues/new" target="_blank" rel="noopener noreferrer">Request Feature</a>

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
| <a href="https://relaxend.com/brown-noise" target="_blank" rel="noopener noreferrer"><strong>Brown Noise</strong></a> | -6 dB / octave (1/f²) | Deep waterfall, distant thunder, jet cabin | Deep sleep, insomnia relief & ADHD calm |
| <a href="https://relaxend.com/pink-noise" target="_blank" rel="noopener noreferrer"><strong>Pink Noise</strong></a> | -3 dB / octave (1/f) | Gentle rainfall, rustling leaves, river | Deep focus, study blocks & memory |
| <a href="https://relaxend.com/white-noise" target="_blank" rel="noopener noreferrer"><strong>White Noise</strong></a> | 0 dB / octave (Flat) | Television static, tuned radio hiss | Speech masking & office privacy |
| <a href="https://relaxend.com/green-noise" target="_blank" rel="noopener noreferrer"><strong>Green Noise</strong></a> | ~500 Hz band-pass | Wind through pines, forest canopy | Meditation, breathwork & nature calm |
| <a href="https://relaxend.com/grey-noise" target="_blank" rel="noopener noreferrer"><strong>Grey Noise</strong></a> | Inverted A-weighting | Psychoacoustically balanced static | Equal perceived loudness & zero ear fatigue |
| <a href="https://relaxend.com/blue-noise" target="_blank" rel="noopener noreferrer"><strong>Blue Noise</strong></a> | +3 dB / octave (+f) | Sharp waterfall spray, crisp steam hiss | High-frequency noise suppression & dithering |
| <a href="https://relaxend.com/violet-noise" target="_blank" rel="noopener noreferrer"><strong>Violet Noise</strong></a> | +6 dB / octave (+f²) | Ultra-thin sizzling air, high treble | Tinnitus frequency habituation |

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

- **Issue Tracker:** <a href="https://github.com/avnshsingh/relaxend-noise-generator/issues" target="_blank" rel="noopener noreferrer">Open an issue on GitHub</a>
- **Feature Requests:** <a href="https://github.com/avnshsingh/relaxend-noise-generator/issues/new" target="_blank" rel="noopener noreferrer">Submit a feature proposal</a>
- **Discussions:** <a href="https://github.com/avnshsingh/relaxend-noise-generator/discussions" target="_blank" rel="noopener noreferrer">Join the community discussions</a>

When filing a bug report, please include:
- Your operating system and browser version (e.g. macOS Sonoma, Chrome 124 / iOS 17.4 Safari).
- Audio output device (headphones, built-in speakers, Bluetooth).
- Steps to reproduce the unexpected behavior.

---

## Multilingual Support

The live version on <a href="https://relaxend.com" target="_blank" rel="noopener noreferrer">RelaxEnd.com</a> is available in 11 languages:

- 🇺🇸 <a href="https://relaxend.com" target="_blank" rel="noopener noreferrer">English</a>
- 🇪🇸 <a href="https://relaxend.com/es" target="_blank" rel="noopener noreferrer">Español (Spanish)</a>
- 🇧🇷 <a href="https://relaxend.com/pt" target="_blank" rel="noopener noreferrer">Português (Portuguese)</a>
- 🇮🇹 <a href="https://relaxend.com/it" target="_blank" rel="noopener noreferrer">Italiano (Italian)</a>
- 🇩🇪 <a href="https://relaxend.com/de" target="_blank" rel="noopener noreferrer">Deutsch (German)</a>
- 🇫🇷 <a href="https://relaxend.com/fr" target="_blank" rel="noopener noreferrer">Français (French)</a>
- 🇮🇳 <a href="https://relaxend.com/hi" target="_blank" rel="noopener noreferrer">हिन्दी (Hindi)</a>
- 🇮🇩 <a href="https://relaxend.com/id" target="_blank" rel="noopener noreferrer">Bahasa Indonesia</a>
- 🇵🇱 <a href="https://relaxend.com/pl" target="_blank" rel="noopener noreferrer">Polski (Polish)</a>
- 🇯🇵 <a href="https://relaxend.com/ja" target="_blank" rel="noopener noreferrer">日本語 (Japanese)</a>
- 🇳🇱 <a href="https://relaxend.com/nl" target="_blank" rel="noopener noreferrer">Nederlands (Dutch)</a>

---

## Community & Socials

Stay connected with the RelaxEnd ecosystem:

- **Official Website:** <a href="https://relaxend.com" target="_blank" rel="noopener noreferrer">relaxend.com</a>
- **Noise Generator:** <a href="https://relaxend.com/noise-generator" target="_blank" rel="noopener noreferrer">relaxend.com/noise-generator</a>
- **Sound Library:** <a href="https://relaxend.com/sounds" target="_blank" rel="noopener noreferrer">relaxend.com/sounds</a>
- **YouTube:** <a href="https://www.youtube.com/@relaxendapp" target="_blank" rel="noopener noreferrer">@relaxendapp</a>
- **X (Twitter):** <a href="https://x.com/relaxendapp" target="_blank" rel="noopener noreferrer">@relaxendapp</a>
- **Instagram:** <a href="https://www.instagram.com/relaxendapp" target="_blank" rel="noopener noreferrer">@relaxendapp</a>
- **LinkedIn:** <a href="https://www.linkedin.com/company/relaxend" target="_blank" rel="noopener noreferrer">RelaxEnd</a>

---

## License

This project is open-source software licensed under the **[MIT License](LICENSE)**.

Built with care for sound lovers, deep sleepers, and focused thinkers worldwide by the <a href="https://relaxend.com" target="_blank" rel="noopener noreferrer">RelaxEnd</a> team.
