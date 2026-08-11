# langlette
Language Roulette - Langlette is a React + Vite mini app for playful language practice 🎯: spin the roulette 🎡 to pick a random language, translate common German phrases in one click 💬, copy results instantly 📋, and try custom translations via MyMemory 🌍. Includes history tracking 🕘 and light/dark mode 🌗.

# Language Roulette App

Language Roulette aka Langlette is a small React + Vite language practice app.
It randomly picks a language from a predefined pool, then lets you translate common German phrases into that selected language.

The app is built for quick speaking practice, travel prep, and playful language exploration.

## What the app does

- Randomly selects a language with a roulette-style animation.
- Prevents repeats by tracking already used languages in local storage.
- Lets you confirm or reject the drawn language.
- Shows phrase chips for common German expressions.
- Copies chip translations to clipboard on click.
- Supports custom text translation from German to the active target language.
- Includes light/dark theme toggle with stored preference.

## Tech stack

- React
- Vite
- lucide-react icons
- MyMemory Translation API (for custom input translation and translation generation script)

## Quick start

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Translation data setup

- Clickable chip translations are stored statically in `src/data/chipTranslations.json`.
- Source phrases and language configuration live in `src/data/translationConfig.js`.
- Free custom input translations use the MyMemory API (`https://api.mymemory.translated.net/get`).

## Generate chip translations

Run the generator to rebuild all chip translations for all configured target languages:

```bash
npm run generate:translations
```

This script:

- translates each phrase from German (`de`) to every configured target language,
- retries on temporary API errors,
- writes output to `src/data/chipTranslations.json`.

## Notes and limits

- MyMemory is free to use but translation quality can vary by language.
- Rate limits may apply; the generator includes small delays and retries.
- Transliteration data is not reliably returned by MyMemory and is stored as `null` when unavailable.
