import {
  CIRCADIAN_PRESETS,
  COMPARISON_TABLE,
  CORE_FEATURES,
  FAQS,
  NOISE_PROFILES,
  SITE_CONFIG,
  SOCIAL_LINKS,
  SUPPORTED_LANGUAGES,
} from "@/lib/const"

export function RelaxEndSeoContent() {
  return (
    <article
      id="sound-guide"
      className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-foreground/90 font-sans"
    >
      {/* Decorative ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[min(100vw,42rem)] rounded-full bg-linear-to-b from-primary/10 via-amber-500/5 to-transparent blur-3xl -z-10"
      />

      {/* Hero Badge & Section Heading */}
      <header className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary shadow-xs">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>Complete Acoustic Science & Frequency Guide</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Online Noise Generator — Free White, Pink & Brown Noise for{" "}
          <span className="bg-linear-to-r from-primary via-amber-400 to-rose-400 bg-clip-text text-transparent">
            Focus & Sleep
          </span>
        </h1>

        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Welcome to the official open-source distribution of{" "}
          <a
            href={SITE_CONFIG.url}
            className="font-medium text-foreground underline decoration-primary underline-offset-4 hover:text-primary transition-colors"
          >
            RelaxEnd
          </a>
          . Synthesize raw, uncompressed acoustic noise directly inside your
          browser via the Web Audio API. Zero audio ads, zero looping clicks,
          and complete 10-band studio frequency control.
        </p>

        {/* Quick stat highlights */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-4 border-y border-border/50 py-4 text-center">
          <div>
            <p className="font-semibold text-sm sm:text-base text-foreground">
              Real-Time Math
            </p>
            <p className="text-[11px] text-muted-foreground font-mono">
              32-bit Web Audio
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base text-foreground">
              7 Noise Colors
            </p>
            <p className="text-[11px] text-muted-foreground font-mono">
              Brown to Violet
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base text-foreground">
              10-Band EQ
            </p>
            <p className="text-[11px] text-muted-foreground font-mono">
              31 Hz – 16 kHz
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base text-foreground">
              100% Free
            </p>
            <p className="text-[11px] text-muted-foreground font-mono">
              MIT Open Source
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: THE ACOUSTIC SPECTRUM (ALL 7 NOISE COLORS)                     */}
      {/* ========================================================================= */}
      <section id="noise-colors" className="mt-20 scroll-mt-20 space-y-10">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            The Frequency Spectrum
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
            Understanding Noise Colors: Pick the Frequency Profile That Fits You
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            Just like optical light breaks into a rainbow of colors, acoustic
            noise is categorized by how energy is distributed across the
            frequency spectrum. Each noise color has a distinct mathematical
            slope, tonal density, and cognitive benefit.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NOISE_PROFILES.map((noise) => (
            <div
              key={noise.id}
              className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl shadow-inner text-white font-bold text-sm transition-transform group-hover:scale-105"
                    style={{ background: noise.gradient }}
                  >
                    {noise.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-base text-foreground">
                      {noise.name}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {noise.slope}
                    </p>
                  </div>
                </div>

                <div className="inline-block rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-foreground">
                  {noise.badge}
                </div>

                {/* Sounds Like */}
                <div className="rounded-xl bg-secondary/30 p-3 text-xs space-y-1">
                  <span className="font-semibold text-foreground">
                    Sounds like:{" "}
                  </span>
                  <span className="text-muted-foreground">{noise.soundsLike}</span>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {noise.acousticCharacter}
                </p>

                {/* Optimal For */}
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-foreground/80">
                    Optimal Applications:
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {noise.optimalFor.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: noise.colorHex }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action link pointing to relaxend.com */}
              <div className="pt-5 border-t border-border/50 mt-5">
                <a
                  href={noise.siteUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80 group-hover:translate-x-1"
                >
                  <span>Explore {noise.name} on RelaxEnd</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE SCIENCE OF SOUND MASKING, SLEEP & ADHD                     */}
      {/* ========================================================================= */}
      <section id="science" className="mt-24 scroll-mt-20 space-y-10">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            Acoustic Neuroscience
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
            The Science of Sound Masking: Sleep, Focus & Cognitive Calm
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            Why do random sound waves help brains rest and focus? Sound masking
            works through established psychoacoustic mechanisms that alter how
            the auditory cortex processes ambient signals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: ADHD & Stochastic Resonance */}
          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold text-xs">
                01
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                ADHD & Stochastic Resonance
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Neurodivergent brains with ADHD frequently operate at lower
              baseline dopamine levels in the prefrontal cortex, causing an
              unconscious craving for sensory stimulation. Under the{" "}
              <strong>Moderate Brain Arousal (MBA) model</strong>, introducing
              continuous low-frequency stochastic sound (such as brown or pink
              noise) induces <em>stochastic resonance</em>. This moderate acoustic
              noise enhances neural signal transmission, quiets restless internal
              monologues, and allows executive attention to lock onto complex
              tasks like programming, studying, or writing.
            </p>
            <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Recommended Setup: </strong>
              Pink noise at 40% volume through over-ear headphones with a neutral
              equalizer curve for 90-minute deep work blocks.
            </div>
          </div>

          {/* Card 2: Deep Sleep & Startle Reflex */}
          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 font-mono font-bold text-xs">
                02
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Deep Sleep & Startle Reflex Prevention
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              You don&apos;t wake up at night because an ambient noise is loud—you
              wake up because of the sudden contrast between silence and the
              acoustic spike. A barking dog or passing siren triggers the
              amygdala&apos;s evolutionary startle reflex. By generating a deep,
              steady acoustic floor with brown noise, the sound elevates your
              auditory perception threshold, absorbing noise spikes like an
              acoustic sponge and allowing your brain to remain in restorative
              slow-wave REM sleep.
            </p>
            <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Recommended Setup: </strong>
              Brown noise with +4 dB sub-bass boost (31 Hz – 62 Hz) using a
              60-minute sleep timer with exponential fade-out.
            </div>
          </div>

          {/* Card 3: Tinnitus Habituation */}
          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 font-mono font-bold text-xs">
                03
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Tinnitus Relief & Habituation
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              In quiet environments, the brain automatically turns up its
              internal auditory gain to listen for faint signals, magnifying the
              phantom high-pitched ringing of tinnitus. Calibrated white, grey,
              or violet noise provides gentle broadband sensory stimulation
              that cushions the contrast. Over time, sound therapy facilitates{" "}
              <em>habituation</em>, training the auditory cortex to treat the
              ringing as background chatter and push it out of conscious
              awareness.
            </p>
            <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Recommended Setup: </strong>
              Violet or grey noise fine-tuned with the 8 kHz and 16 kHz EQ sliders
              to sit just underneath your perceived tinnitus pitch.
            </div>
          </div>

          {/* Card 4: Conversational Privacy */}
          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs">
                04
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Open Office & Speech Privacy
              </h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Human brains are biologically hardwired to parse nearby spoken
              speech, triggering involuntary context switching whenever
              intelligible words are overheard. White noise and green noise
              blanket the human vocal frequency band (300 Hz to 3.4 kHz),
              significantly lowering speech intelligibility (STI). This creates
              a private acoustic cone in open-plan offices, study halls, and
              bustling coffee shops.
            </p>
            <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Recommended Setup: </strong>
              White noise blended with green noise, with +3 dB in the 1 kHz to 2 kHz
              range to reduce vocal distractions by over 60%.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: ENGINEERING ACOUSTIC PRECISION (ALL CORE FEATURES)            */}
      {/* ========================================================================= */}
      <section id="features" className="mt-24 scroll-mt-20 space-y-10">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            Engineered For Excellence
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
            Why Pure Procedural Audio Beats Looped Audio Streams
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            Traditional noise apps stream compressed MP3 loops that stutter,
            drain phone batteries, and repeat audible clicks every few minutes.
            RelaxEnd synthesizes raw mathematical acoustic waves in real time.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {feature.subtitle}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: COMPARISON TABLE                                               */}
      {/* ========================================================================= */}
      <section id="comparison" className="mt-24 scroll-mt-20 space-y-10">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            Transparent Comparison
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
            RelaxEnd Web Audio vs. YouTube & Mobile Apps
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            See how real-time client-side procedural synthesis compares to
            streamed video files and commercial mobile apps.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card/70 shadow-lg backdrop-blur-md">
          <table className="w-full min-w-160 text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="py-4 px-6 font-semibold text-foreground">
                  Acoustic Feature
                </th>
                <th className="py-4 px-6 font-semibold text-primary bg-primary/5 border-x border-border/40">
                  RelaxEnd Synthesizer
                </th>
                <th className="py-4 px-6 font-semibold text-muted-foreground">
                  YouTube / Spotify Streams
                </th>
                <th className="py-4 px-6 font-semibold text-muted-foreground">
                  Paid Mobile Apps
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {COMPARISON_TABLE.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 1 ? "bg-muted/10" : "bg-transparent"}
                >
                  <td className="py-4 px-6 font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 font-medium text-primary bg-primary/5 border-x border-border/40">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500 font-bold">&#10003;</span>
                      <span>{row.relaxend}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="text-rose-500/70 font-bold">&#10007;</span>
                      <span>{row.streaming}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold">~</span>
                      <span>{row.apps}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: ONE-CLICK CIRCADIAN PRESETS                                    */}
      {/* ========================================================================= */}
      <section id="presets" className="mt-24 scroll-mt-20 space-y-10">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            Instant Soundscapes
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
            Circadian Sound Presets: Calibrated Acoustic Environments
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            Launch instantly into custom-crafted frequency curves designed for
            specific physiological states.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CIRCADIAN_PRESETS.map((preset, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {preset.category}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {preset.duration}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {preset.name}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Base: {preset.baseNoise}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {preset.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 mt-4">
                <a
                  href={preset.url}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  <span>Launch on RelaxEnd</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: MULTI-LANGUAGE AVAILABILITY                                    */}
      {/* ========================================================================= */}
      <section id="languages" className="mt-24 scroll-mt-20 space-y-8">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            Global Reach
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
            Available Worldwide in 11 Languages
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            RelaxEnd is engineered for a global audience. Access the noise
            generator, sound library, and guides in your native language directly
            on{" "}
            <a
              href={SITE_CONFIG.url}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              RelaxEnd.com
            </a>
            .
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <a
              key={lang.code}
              href={`${SITE_CONFIG.url}${lang.path}`}
              hrefLang={lang.code}
              className="group flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:bg-secondary hover:text-foreground hover:scale-105"
            >
              <span className="font-mono text-[10px] uppercase font-bold text-primary">
                {lang.code}
              </span>
              <span className="text-foreground">{lang.name}</span>
              <span className="text-muted-foreground/70 font-normal">
                ({lang.localName})
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQS)                              */}
      {/* ========================================================================= */}
      <section id="faq" className="mt-24 scroll-mt-20 space-y-10">
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            Knowledge Base
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
            Frequently Asked Questions About Noise Generators
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
            Everything you need to know about sound masking, frequency colors,
            hearing safety, and our procedural synthesizer.
          </p>
        </div>

        <dl className="grid gap-6 md:grid-cols-2">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-md transition-all duration-200 hover:border-primary/40 space-y-3"
            >
              <dt className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-mono font-bold text-primary">
                  Q{idx + 1}
                </span>
                <h3 className="text-base font-semibold leading-snug text-foreground">
                  {faq.question}
                </h3>
              </dt>
              <dd className="pl-10 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: OPEN-SOURCE CTA & GITHUB STAR                                  */}
      {/* ========================================================================= */}
      <section className="mt-24 relative overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-b from-card/90 via-card/60 to-primary/5 px-6 py-12 text-center sm:px-12 md:py-16 shadow-xl shadow-primary/5 backdrop-blur-xl space-y-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-72 rounded-full bg-primary/20 blur-2xl"
        />

        <div className="relative z-10 mx-auto max-w-2xl space-y-4">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            MIT Licensed · Free For Everyone
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Proudly Open Source. Built for the Community.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            RelaxEnd Noise Generator is completely free and open source. If you
            find this synthesizer helpful for your sleep, study sessions, or
            coding focus, please star the repository on GitHub and consider
            contributing!
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span>Star on GitHub</span>
              <span className="text-amber-300 font-bold">&#9733;</span>
            </a>

            <a
              href={SITE_CONFIG.issueUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-all duration-200"
            >
              <span>Report Issue / Feature Request</span>
            </a>

            <a
              href={SITE_CONFIG.url}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-all duration-200"
            >
              <span>Visit RelaxEnd.com</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: FOOTER                                                         */}
      {/* ========================================================================= */}
      <footer className="mt-24 border-t border-border/60 pt-12 space-y-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-bold text-xs">
                RE
              </span>
              <span className="font-heading font-bold text-base text-foreground">
                RelaxEnd
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ambient sounds, noise generators, frequencies, and mixes in your
              browser. 100% procedural and ad-free.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <span className="font-mono text-[10px] font-bold">
                    {social.name.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Noise Colors
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <a
                  href="https://relaxend.com/brown-noise"
                  className="hover:text-foreground transition-colors"
                >
                  Brown Noise for Sleep
                </a>
              </li>
              <li>
                <a
                  href="https://relaxend.com/pink-noise"
                  className="hover:text-foreground transition-colors"
                >
                  Pink Noise for Focus
                </a>
              </li>
              <li>
                <a
                  href="https://relaxend.com/white-noise"
                  className="hover:text-foreground transition-colors"
                >
                  White Noise for Privacy
                </a>
              </li>
              <li>
                <a
                  href="https://relaxend.com/green-noise"
                  className="hover:text-foreground transition-colors"
                >
                  Green Noise for Calm
                </a>
              </li>
              <li>
                <a
                  href="https://relaxend.com/violet-noise"
                  className="hover:text-foreground transition-colors"
                >
                  Violet Noise for Tinnitus
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              RelaxEnd Ecosystem
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <a
                  href={SITE_CONFIG.url}
                  className="hover:text-foreground transition-colors"
                >
                  RelaxEnd Homepage
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.generatorUrl}
                  className="hover:text-foreground transition-colors"
                >
                  Online Noise Generator
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.soundsUrl}
                  className="hover:text-foreground transition-colors"
                >
                  Ambient Sounds Library
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.issueUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Open Source
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Licensed under MIT. Synthesized live in your browser using the
              Web Audio API. No cookies, no trackers, no audio advertisements.
            </p>
            <div className="pt-2">
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <span>View source code on GitHub</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/40 pt-6 text-xs text-muted-foreground/70">
          <p>© {new Date().getFullYear()} RelaxEnd. All rights reserved. Open-source under MIT License.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://relaxend.com/about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="https://relaxend.com/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="https://relaxend.com/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href={SITE_CONFIG.githubUrl} className="hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </article>
  )
}
