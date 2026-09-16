/**
 * RelaxEnd Noise Generator — Official Site & Audio Engine Constants
 * https://relaxend.com
 * https://relaxend.com/noise-generator
 * https://github.com/avnshsingh/relaxend-noise-generator
 */

export const SITE_CONFIG = {
  name: "RelaxEnd",
  brandName: "RelaxEnd Noise Lab",
  tagline: "Online Noise Generator — Free White, Pink & Brown Noise for Focus & Sleep",
  shortTagline: "Open-source procedural Web Audio noise generator",
  title: "Online Noise Generator — Free White, Pink & Brown Noise for Focus & Sleep | RelaxEnd",
  description:
    "Synthesize pure white noise, deep brown noise, and soothing pink noise in real time directly in your browser. Features 10-band studio EQ, sleep timer with fade-out chimes, offline support, and zero ads.",
  url: "https://relaxend.com",
  canonicalUrl: "https://relaxend.com/noise-generator",
  generatorUrl: "https://relaxend.com/noise-generator",
  soundsUrl: "https://relaxend.com/sounds",
  githubUrl: "https://github.com/avnshsingh/relaxend-noise-generator",
  issueUrl: "https://github.com/avnshsingh/relaxend-noise-generator/issues",
  discussionsUrl: "https://github.com/avnshsingh/relaxend-noise-generator/discussions",
  author: "RelaxEnd",
  creator: "RelaxEnd",
  publisher: "RelaxEnd",
  twitterHandle: "@relaxendapp",
  themeColor: "#b45309",
} as const

export const SOCIAL_LINKS = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@relaxendapp",
    handle: "@relaxendapp",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/relaxendapp",
    handle: "@relaxendapp",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/relaxend",
    handle: "relaxend",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/relaxendapp",
    handle: "@relaxendapp",
  },
  {
    name: "GitHub",
    url: "https://github.com/avnshsingh/relaxend-noise-generator",
    handle: "avnshsingh/relaxend-noise-generator",
  },
] as const

export type NoiseProfile = {
  id: "brown" | "pink" | "white" | "green" | "gray" | "blue" | "violet"
  name: string
  alternateNames: string[]
  slope: string
  mathematicalDefinition: string
  acousticCharacter: string
  soundsLike: string
  badge: string
  colorHex: string
  gradient: string
  optimalFor: string[]
  formula: string
  scientificBenefit: string
  siteUrl: string
  seoKeywords: string[]
}

export const NOISE_PROFILES: NoiseProfile[] = [
  {
    id: "brown",
    name: "Brown Noise",
    alternateNames: ["Brownian Noise", "Red Noise", "Random Walk Noise"],
    slope: "-6 dB per octave",
    mathematicalDefinition: "1/f² power spectral density falloff (energy quarters each time frequency doubles)",
    acousticCharacter: "Deep, warm low-frequency rumble reminiscent of a heavy waterfall, distant thunder, or airplane cabin.",
    soundsLike: "Deep ocean roar, distant thunder, heavy waterfall, steady jet cabin hum",
    badge: "Most Popular for Sleep & ADHD",
    colorHex: "#b45309",
    gradient: "linear-gradient(135deg, #b45309, #78350f)",
    optimalFor: [
      "Deep sleep & insomnia relief",
      "ADHD hyperfocus & sensory calm",
      "Blocking snoring & sudden street noise spikes",
      "Calming overstimulated nervous systems",
    ],
    formula: "Brown noise with +4 dB sub-bass boost (31-62 Hz) on a 60-minute sleep timer.",
    scientificBenefit:
      "Low-frequency stochastic sound provides a smooth acoustic blanket that cushions sudden midnight volume spikes, preventing the auditory cortex from triggering the startle reflex and prolonging slow-wave sleep.",
    siteUrl: "https://relaxend.com/brown-noise",
    seoKeywords: [
      "brown noise",
      "brown noise for sleep",
      "brown noise adhd",
      "brownian noise generator",
      "deep noise for sleep",
      "brown noise online",
    ],
  },
  {
    id: "pink",
    name: "Pink Noise",
    alternateNames: ["1/f Noise", "Flicker Noise"],
    slope: "-3 dB per octave",
    mathematicalDefinition: "1/f power spectral density (equal energy per octave across the human auditory range)",
    acousticCharacter: "Gentle, balanced cascade resembling steady rainfall, rustling forest leaves, or an ocean surf.",
    soundsLike: "Steady gentle rainfall, rustling leaves, continuous river stream, soft waterfall",
    badge: "Gold Standard for Productivity",
    colorHex: "#e11d48",
    gradient: "linear-gradient(135deg, #e11d48, #9f1239)",
    optimalFor: [
      "Deep work & multi-hour study blocks",
      "Memory consolidation & recall during rest",
      "Gentle background mask for open offices",
      "Infant & toddler nap soothing",
    ],
    formula: "Pink noise with flat EQ at 40% volume through over-ear headphones.",
    scientificBenefit:
      "Because pink noise mirrors the logarithmic frequency perception of human hearing, it provides optimal acoustic stimulation without the ear fatigue caused by harsh higher frequencies.",
    siteUrl: "https://relaxend.com/pink-noise",
    seoKeywords: [
      "pink noise",
      "pink noise for focus",
      "pink noise study",
      "1/f noise generator",
      "pink noise online",
      "relaxing pink noise",
    ],
  },
  {
    id: "white",
    name: "White Noise",
    alternateNames: ["Flat Spectrum Noise", "Johnson-Nyquist Noise"],
    slope: "0 dB per octave",
    mathematicalDefinition: "Completely flat power spectral density (equal energy per hertz across 20 Hz to 20,000 Hz)",
    acousticCharacter: "Crisp, bright hiss similar to television static, tuned FM radio hiss, or rushing air vents.",
    soundsLike: "Crisp TV static, tuned radio hiss, rushing air vent, industrial fan",
    badge: "Maximum Acoustic Privacy",
    colorHex: "#64748b",
    gradient: "linear-gradient(135deg, #64748b, #334155)",
    optimalFor: [
      "Open office privacy & confidential meetings",
      "Masking unpredictable loud human voices",
      "Soundproofing thin apartment walls",
      "Auditory testing & room acoustics calibration",
    ],
    formula: "White noise blended with green noise to mask vowel and consonant frequencies.",
    scientificBenefit:
      "White noise covers every single audible frequency evenly, effectively flattening the signal-to-noise ratio of conversational speech and reducing conversational distraction radius by over 60%.",
    siteUrl: "https://relaxend.com/white-noise",
    seoKeywords: [
      "white noise",
      "white noise generator",
      "online white noise",
      "white noise for focus",
      "white noise machine online",
      "free white noise",
    ],
  },
  {
    id: "green",
    name: "Green Noise",
    alternateNames: ["Nature Bed Noise", "Mid-Frequency Noise"],
    slope: "Centered around ~500 Hz",
    mathematicalDefinition: "Organic band-pass profile emphasizing the warm center of human auditory sensation",
    acousticCharacter: "Soothing natural ambience like wind coursing through pine trees or a distant forest stream.",
    soundsLike: "Wind whistling through pine needles, distant forest canopy, rustling woods",
    badge: "Nature Bed Simulation",
    colorHex: "#16a34a",
    gradient: "linear-gradient(135deg, #16a34a, #14532d)",
    optimalFor: [
      "Mindfulness meditation & breathwork",
      "Stress reduction & nervous system down-regulation",
      "Gentle reading ambience without cognitive distraction",
      "Yoga & restorative relaxation",
    ],
    formula: "Green noise with gentle high-cut filter for serene nature immersion.",
    scientificBenefit:
      "By eliminating harsh high-frequency hisses and heavy low-end thumps, green noise provides a warm acoustic sanctuary that evokes evolutionary bio-safety cues of peaceful natural environments.",
    siteUrl: "https://relaxend.com/green-noise",
    seoKeywords: [
      "green noise",
      "green noise generator",
      "green noise for sleep",
      "nature noise generator",
      "green noise online",
      "calming green noise",
    ],
  },
  {
    id: "gray",
    name: "Grey Noise",
    alternateNames: ["Gray Noise", "Inverted Psychoacoustic Noise"],
    slope: "Inverted A-weighting curve",
    mathematicalDefinition: "Shaped to the equal-loudness contour of human ear sensitivity (Fletcher-Munson curve)",
    acousticCharacter: "Remarkably smooth, balanced static where every frequency band feels equally loud to human ears.",
    soundsLike: "Smooth, balanced static where highs and lows feel equally loud to the ear",
    badge: "Equal Perceived Loudness",
    colorHex: "#52525b",
    gradient: "linear-gradient(135deg, #52525b, #27272a)",
    optimalFor: [
      "Long all-day work & programming sessions",
      "Audiophile headphone testing & calibration",
      "Preventing listener fatigue during long shifts",
      "Gentle all-day acoustic comfort",
    ],
    formula: "Grey noise at 35% volume for prolonged acoustic masking without fatigue.",
    scientificBenefit:
      "Because human hearing is naturally more sensitive to 2 kHz – 5 kHz (the human vocal band), standard flat noise can feel piercing. Grey noise psychoacoustically compensates so no frequency sticks out.",
    siteUrl: "https://relaxend.com/grey-noise",
    seoKeywords: [
      "grey noise",
      "gray noise",
      "grey noise generator",
      "psychoacoustic noise",
      "equal loudness noise",
      "online grey noise",
    ],
  },
  {
    id: "blue",
    name: "Blue Noise",
    alternateNames: ["Azure Noise"],
    slope: "+3 dB per octave",
    mathematicalDefinition: "Power density increases proportionally with frequency (f energy scaling)",
    acousticCharacter: "Sharp, airy waterfall spray, crisp steam hiss, high-frequency energy focus.",
    soundsLike: "Sharp, airy waterfall spray, crisp steam hiss, fine mist spray",
    badge: "High-Frequency Emphasis",
    colorHex: "#0284c7",
    gradient: "linear-gradient(135deg, #0284c7, #075985)",
    optimalFor: [
      "High-frequency sound masking & electrical whine suppression",
      "Audio dithering and digital signal post-production",
      "Targeted acoustic balance for high-pitched distractions",
      "Specific sound therapy applications",
    ],
    formula: "Blue noise layered lightly over pink noise to balance high room ambience.",
    scientificBenefit:
      "Blue noise concentrates power in the upper octaves without low-end mud, making it ideal for pinpointing and canceling annoying high-frequency electrical hums, whining monitors, or fluorescent ballasts.",
    siteUrl: "https://relaxend.com/blue-noise",
    seoKeywords: [
      "blue noise",
      "azure noise generator",
      "blue noise audio",
      "high frequency noise generator",
      "blue noise online",
    ],
  },
  {
    id: "violet",
    name: "Violet Noise",
    alternateNames: ["Purple Noise"],
    slope: "+6 dB per octave",
    mathematicalDefinition: "Power density increases proportionally to frequency squared (f² scaling)",
    acousticCharacter: "Ultra-thin high hiss, sizzling air, extreme high treble concentration.",
    soundsLike: "Ultra-thin high hiss, sizzling air, intense tea kettle steam",
    badge: "Extreme High Treble",
    colorHex: "#9333ea",
    gradient: "linear-gradient(135deg, #9333ea, #581c87)",
    optimalFor: [
      "Tinnitus frequency matching & auditory habituation",
      "Acoustic laboratory testing & transducer calibration",
      "Specialized sound masking protocols",
      "Masking high-pitched tonal ringing",
    ],
    formula: "Violet noise adjusted with the 8 kHz and 16 kHz sliders to blend out ear ringing.",
    scientificBenefit:
      "For individuals experiencing high-frequency tinnitus ringing, violet noise matches the phantom frequency profile, allowing the auditory cortex to soften contrast and gradually ignore the ringing.",
    siteUrl: "https://relaxend.com/violet-noise",
    seoKeywords: [
      "violet noise",
      "purple noise",
      "tinnitus masking noise",
      "violet noise for tinnitus",
      "high pitch noise generator",
      "online violet noise",
    ],
  },
] as const

export const CORE_FEATURES = [
  {
    title: "Infinite Procedural Web Audio Engine",
    subtitle: "Zero looping gaps or audio clips",
    description:
      "Audio is synthesized mathematically in real time directly on your device's audio hardware using 32-bit floating point Web Audio algorithms. Unlike YouTube or Spotify MP3 streams, there are never audible clicks, stuttering pauses, or repeating audio loops.",
    badge: "Pure Synthesis",
    icon: "cpu",
  },
  {
    title: "Studio 10-Band Graphic Equalizer",
    subtitle: "Precision shaping from 31 Hz to 16 kHz",
    description:
      "Fine-tune every slice of the frequency spectrum with ±12 dB precision sliders across 10 octave bands (31Hz, 62Hz, 125Hz, 250Hz, 500Hz, 1kHz, 2kHz, 4kHz, 8kHz, 16kHz). Compensate for bass-heavy headphones, eliminate room resonance, or target specific tinnitus frequencies.",
    badge: "10-Band EQ",
    icon: "sliders",
  },
  {
    title: "Circadian Sleep Timer & Soft Fade-Out",
    subtitle: "15 minutes to 24 hours with Tibetan singing bowl chime",
    description:
      "Fall asleep peacefully without sudden jarring silence waking you up in the middle of the night. Features an exponential volume taper that gently lowers audio levels over your chosen fade duration, with an optional soothing Tibetan singing bowl chime.",
    badge: "Sleep Friendly",
    icon: "clock",
  },
  {
    title: "100% Client-Side & Offline Ready",
    subtitle: "Works seamlessly on airplanes and during Wi-Fi drops",
    description:
      "Because the noise generator runs entirely inside your browser tab using JavaScript and Web Audio, zero audio data is streamed from servers. Once loaded, it works in airplane mode without using mobile data or draining your battery.",
    badge: "Offline First",
    icon: "shield-check",
  },
  {
    title: "Zero Audio Ads & No Mid-Roll Interruptions",
    subtitle: "100% free, forever, with no accounts required",
    description:
      "Nothing ruins deep focus or wakes a sleeping baby faster than a loud commercial blast. RelaxEnd is committed to an ad-free, distraction-free audio sanctuary with zero trackers, zero subscriptions, and zero paywalls.",
    badge: "No Ads",
    icon: "zap",
  },
  {
    title: "Open-Source Web Audio Synthesizer",
    subtitle: "Auditable, transparent, community-driven code",
    description:
      "RelaxEnd Noise Generator is 100% open source under the MIT License on GitHub. Inspect the audio synthesis worklets, contribute presets, or fork the repository to build your own custom acoustic tools.",
    badge: "MIT Open Source",
    icon: "github",
  },
] as const

export const CIRCADIAN_PRESETS = [
  {
    name: "Deep Ocean Sleep",
    category: "Sleep",
    duration: "8 Hours",
    baseNoise: "Brown Noise",
    description: "Heavy low-end rumble with rolled-off highs simulating dark midnight ocean surf.",
    url: "https://relaxend.com/brown-noise",
  },
  {
    name: "Focus Flow State",
    category: "ADHD / Work",
    duration: "90 Minutes",
    baseNoise: "Pink Noise",
    description: "Natural 1/f slope providing balanced stimulation for hours of uninterrupted coding.",
    url: "https://relaxend.com/pink-noise",
  },
  {
    name: "Airplane Cabin",
    category: "Travel",
    duration: "Continuous",
    baseNoise: "Brown + Low Cut",
    description: "Even cabin pressure drone that isolates you from chatting passengers and engine whine.",
    url: "https://relaxend.com/brown-noise",
  },
  {
    name: "Tinnitus Softener",
    category: "Relief",
    duration: "45 Minutes",
    baseNoise: "Violet + Grey Noise",
    description: "Specially shaped high-register hiss to gently blend out internal ear ringing.",
    url: "https://relaxend.com/violet-noise",
  },
  {
    name: "Forest Wind",
    category: "Calm",
    duration: "30 Minutes",
    baseNoise: "Green Noise",
    description: "Organic mid-range frequencies reminiscent of wind coursing through pine canopies.",
    url: "https://relaxend.com/green-noise",
  },
  {
    name: "Speech Shield",
    category: "Privacy",
    duration: "2 Hours",
    baseNoise: "White Noise + EQ",
    description: "Calibrated speech-band masking for studying in bustling coffee shops or open offices.",
    url: "https://relaxend.com/white-noise",
  },
] as const

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", localName: "English", path: "/" },
  { code: "es", name: "Spanish", localName: "Español", path: "/es" },
  { code: "pt", name: "Portuguese", localName: "Português", path: "/pt" },
  { code: "it", name: "Italian", localName: "Italiano", path: "/it" },
  { code: "de", name: "German", localName: "Deutsch", path: "/de" },
  { code: "fr", name: "French", localName: "Français", path: "/fr" },
  { code: "hi", name: "Hindi", localName: "हिन्दी", path: "/hi" },
  { code: "id", name: "Indonesian", localName: "Bahasa Indonesia", path: "/id" },
  { code: "pl", name: "Polish", localName: "Polski", path: "/pl" },
  { code: "ja", name: "Japanese", localName: "日本語", path: "/ja" },
  { code: "nl", name: "Dutch", localName: "Nederlands", path: "/nl" },
] as const

export const COMPARISON_TABLE = [
  {
    feature: "Audio Generation Method",
    relaxend: "Real-time 32-bit procedural Web Audio synthesis",
    streaming: "Pre-recorded compressed video/audio stream",
    apps: "Short looped MP3 / AAC files",
    relaxendAdvantage: true,
  },
  {
    feature: "Loop Artifacts & Gaps",
    relaxend: "Never (Infinite continuous calculation)",
    streaming: "Jarring loop breaks or video restarts",
    apps: "Audible click every 5–15 minutes",
    relaxendAdvantage: true,
  },
  {
    feature: "Equalizer & Sound Sculpting",
    relaxend: "Full 10-band studio EQ (31 Hz – 16 kHz)",
    streaming: "None (Fixed pre-baked audio)",
    apps: "Limited or locked behind paywall",
    relaxendAdvantage: true,
  },
  {
    feature: "Data & Battery Consumption",
    relaxend: "Negligible (<1 MB initial load, runs on chip)",
    streaming: "Massive (Gigabytes of HD video data)",
    apps: "High (Heavy background battery drain)",
    relaxendAdvantage: true,
  },
  {
    feature: "Advertisements & Interruptions",
    relaxend: "100% Free & Zero Ads Forever",
    streaming: "Loud midnight ads between tracks",
    apps: "Subscription popups & banner ads",
    relaxendAdvantage: true,
  },
  {
    feature: "Account or Installation Required",
    relaxend: "None (Open browser & press play)",
    streaming: "Account required, user tracking",
    apps: "App Store install + paywalled accounts",
    relaxendAdvantage: true,
  },
  {
    feature: "Source Code & Auditing",
    relaxend: "Open-source Web Audio engine on GitHub",
    streaming: "Closed platform",
    apps: "Closed proprietary source",
    relaxendAdvantage: true,
  },
] as const

export const FAQS = [
  {
    question: "What is an online noise generator?",
    answer:
      "An online noise generator is a web-based audio synthesizer that generates acoustic signals across various frequencies in real time using your browser's Web Audio API. Unlike playing a pre-recorded YouTube video or Spotify track, RelaxEnd calculates random sound samples mathematically on the fly, creating an infinite, non-repeating soundscape without file downloads or streaming bandwidth.",
  },
  {
    question: "What is the difference between white noise, pink noise, and brown noise?",
    answer:
      "The difference lies in how sound energy is distributed across the frequency spectrum. White noise has equal energy per hertz across all audible frequencies, resulting in a crisp, bright hiss (like television static). Pink noise has equal energy per octave, decreasing by 3 decibels per octave as frequency doubles, creating a softer, rain-like sound. Brown noise drops by 6 decibels per octave, giving it a deep, heavy low-frequency rumble reminiscent of a distant waterfall or heavy surf.",
  },
  {
    question: "Why is brown noise so popular for ADHD and focus?",
    answer:
      "According to the Moderate Brain Arousal (MBA) model and stochastic resonance theory, people with ADHD often have lower baseline dopamine levels in the prefrontal cortex. Smooth, low-frequency stochastic sound like brown noise acts as moderate acoustic stimulation that settles hyperactive internal thoughts, satisfies subconscious sensory cravings, and allows executive attention to stay focused on complex tasks.",
  },
  {
    question: "Can a noise generator help with tinnitus?",
    answer:
      "Yes. Tinnitus is often perceived as an internal high-pitch ringing, buzzing, or hiss that becomes most noticeable in quiet environments when the auditory cortex amplifies faint internal signals. By introducing calibrated background sound, such as grey, pink, or custom-equalized violet noise, the contrast between the tinnitus and silence is reduced. This sound masking facilitates habituation, helping your brain push the ringing into the background.",
  },
  {
    question: "Is it safe to listen to noise all night while sleeping?",
    answer:
      "Yes, provided you keep the volume at a safe level. Audiologists recommend keeping ambient sleep noise below 60 to 65 decibels (roughly the volume of a quiet conversation or gentle shower). RelaxEnd includes a circadian sleep timer with an exponential fade-out feature, allowing the sound to gradually taper off after you have fallen asleep so your ears rest throughout the night.",
  },
  {
    question: "Does this noise generator work on mobile phones and tablets?",
    answer:
      "Yes. RelaxEnd is fully responsive and optimized for modern iOS (Safari, Chrome) and Android browsers. The procedural audio engine runs efficiently in the background while your screen is locked or while you switch between other apps.",
  },
  {
    question: "Does it work without an internet connection (offline)?",
    answer:
      "Yes. Because RelaxEnd generates audio directly on your device using JavaScript and the Web Audio API rather than streaming audio files from a server, once the web page is loaded in your browser tab, the audio engine continues running even if you disconnect from Wi-Fi or switch to airplane mode.",
  },
  {
    question: "How does the 10-band equalizer work?",
    answer:
      "RelaxEnd includes a professional 10-band graphic equalizer spanning from 31 Hz (sub-bass rumble) up to 16 kHz (sparkling high treble). You can boost or cut specific frequency bands by up to ±12 dB to compensate for bass-heavy headphones, reduce piercing high frequencies, or target specific tinnitus frequencies.",
  },
  {
    question: "Why is RelaxEnd completely free with zero ads?",
    answer:
      "Procedural sound synthesis requires virtually zero server bandwidth because the audio computation happens directly on your device's processor. This allows us to offer an uncluttered, high-performance tool without forcing annoying audio ads or subscription walls between you and restful sound.",
  },
  {
    question: "Do I need headphones to use the noise generator?",
    answer:
      "No, you can play noise through your laptop, phone, or desktop speakers to mask room noise or soothe a sleeping baby. However, for deep study focus, personal privacy, or binaural beat tone layering, high-quality over-ear headphones or earbuds provide the most immersive and accurate frequency response.",
  },
  {
    question: "Is the RelaxEnd noise engine open source?",
    answer:
      "Yes. The synthesizer that generates the noise runs in the browser with the Web Audio API. The code is open source on GitHub. You are welcome to inspect the code, star the repository, and contribute pull requests.",
  },
  {
    question: "Can I generate any noise color in the browser?",
    answer:
      "Yes. White, pink, brown, green, grey, blue, and violet noise are synthesized mathematically on your device rather than streamed as static audio files. Simply open the generator and choose your preferred noise color.",
  },
] as const

export const SEO_KEYWORDS = [
  "noise generator",
  "online noise generator",
  "white noise generator",
  "brown noise for sleep",
  "pink noise for focus",
  "adhd noise generator",
  "tinnitus sound masking",
  "green noise generator",
  "free sound synthesizer",
  "open source noise generator",
  "web audio synthesizer",
  "sleep timer white noise",
  "relaxend noise lab",
  "grey noise generator",
  "blue noise online",
  "violet noise tinnitus",
  "browser noise generator",
  "10-band equalizer noise",
] as const
