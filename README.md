# Hum

A browser noise generator for sleep, focus, and masking. Built with [Next.js](https://nextjs.org) **16** and React 19.

## Requirements

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io) 10 (this repo pins `pnpm@10.33.0` via `packageManager`)

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
```

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `app/page.tsx` or `components/noise-lab.tsx` — the page reloads as you save.

Pass a color to lock the player to one noise:

```tsx
<NoiseLab />                 // all colors
<NoiseLab color="all" />     // same
<NoiseLab color="brown" />   // brown only
```

Audio is synthesized in the tab with the Web Audio API. Nothing is streamed from the server.

## Scripts

| Command        | What it does              |
| -------------- | ------------------------- |
| `pnpm dev`     | Development server        |
| `pnpm build`   | Production build          |
| `pnpm start`   | Serve the production build |
| `pnpm lint`    | ESLint                    |

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- pnpm

## Learn more

- [Next.js 16 docs](https://nextjs.org/docs)
- [pnpm docs](https://pnpm.io/motivation)
