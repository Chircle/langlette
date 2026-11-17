# langlette

Language Roulette – Langlette is a React + Vite mini app for playful language practice 🎯: spin the roulette 🎡 to pick a random language, reveal common German phrases in that language 💬, hear how they're pronounced 🔊, copy them instantly 📋, and try your own sentences via MyMemory 🌍. Includes history tracking 🕘 and light/dark mode 🌗.

## What the app does

- Randomly selects one of **83 languages** with a split-flap roulette animation.
- Avoids repeats by remembering already drawn languages in `localStorage`.
- Shows 10 everyday German phrases; tap one to reveal and copy the translation, or reveal all at once.
- Shows a **romanization** (pronunciation aid) for every non-Latin script.
- **Speaker button** reads phrases aloud via the browser's Web Speech API. If the device has no voice for a language, the button opens Google Translate instead (marked with a small ↗ icon).
- Free-text translation from German via the MyMemory API (machine translation, clearly labelled as such). Known phrases are answered from the curated phrasebook instead.
- Light/dark theme toggle (stored; falls back to the system preference).

## Tech stack

- React 19, Vite
- lucide-react icons
- Web Speech API (`speechSynthesis`) for pronunciation
- MyMemory Translation API for custom input

## Quick start

```bash
npm install
npm run dev        # dev server
npm run validate   # check the phrasebook
npm run build      # validates, then builds to dist/
npm run preview    # preview the production build
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Phrasebook

All languages and translations live in **one file**: `src/data/phrasebook.js`.

```js
{
  code: "ja",            // ISO 639 code (also used for MyMemory + Google Translate)
  tts: "ja-JP",          // BCP-47 tag used to pick a speech voice
  de: "Japanisch",
  native: "日本語",
  regions: "Japan",
  phrases: [             // same order as PHRASES
    ["おはようございます", "Ohayō gozaimasu"],   // [text, romanization] for non-Latin scripts
    // "Text" for Latin scripts, null if there is no common equivalent
  ],
}
```

`npm run validate` checks that every language has all phrases, codes are unique, non-Latin text has a romanization, and flags typical machine-translation artefacts (broken encoding, subtitle dashes, untranslated "Bon appétit"). The build fails if the check fails.

### Conventions

- *Bitte* = "please" (a request), not "you're welcome".
- *Wie geht es dir?* uses the informal form where a language distinguishes it.
- *Entschuldigung* = the polite "sorry / excuse me".
- *Ich liebe dich* uses the male-speaker form where grammar requires a choice (Hindi, Urdu, Punjabi, Hebrew, Vietnamese).
- Portuguese follows Brazilian usage.

## Notes and limits

- Which voices are available depends on the OS and browser (Safari/iOS and Android ship many; desktop Chrome/Firefox fewer). Smaller languages such as Quechua, Guaraní or Samoan usually fall back to Google Translate.
- MyMemory is free but rate-limited and quality varies by language.
