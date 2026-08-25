import chipTranslations from "./chipTranslations.json" with { type: "json" };
import { ALL_LANGUAGES, PHRASES } from "./translationConfig.js";
import { PRELOADED_CORE_TRANSLATIONS } from "./preloadedCoreTranslations.js";
import { CURATED_TRANSLATION_OVERRIDES } from "./curatedTranslationOverrides.js";

function normalizeEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return {
      translation: null,
      transliteration: null,
      error: true,
      message: "missing translation",
    };
  }

  const translation = typeof entry.translation === "string" && entry.translation.trim()
    ? entry.translation
    : null;

  return {
    translation,
    transliteration: entry.transliteration ?? null,
    error: Boolean(entry.error),
    message: entry.message ?? null,
  };
}

function resolveEntry(phrase, languageCode) {
  const curated = CURATED_TRANSLATION_OVERRIDES?.[phrase]?.[languageCode];
  if (curated) {
    return normalizeEntry({ translation: curated });
  }

  const preloaded = PRELOADED_CORE_TRANSLATIONS?.[phrase]?.[languageCode];
  if (preloaded?.translation && !preloaded.error) {
    return normalizeEntry(preloaded);
  }

  const chip = chipTranslations?.[phrase]?.[languageCode];
  if (chip?.translation && !chip.error) {
    return normalizeEntry(chip);
  }

  return normalizeEntry(preloaded ?? chip ?? null);
}

export const TRANSLATIONS = Object.fromEntries(
  PHRASES.map((phrase) => [
    phrase,
    Object.fromEntries(
      ALL_LANGUAGES.map((language) => [language.code, resolveEntry(phrase, language.code)])
    ),
  ])
);