import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_LANGUAGES, PHRASES } from "../src/data/translationConfig.js";
import { PRELOADED_CORE_TRANSLATIONS } from "../src/data/preloadedCoreTranslations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_PATH = path.resolve(__dirname, "../src/data/unifiedTranslations.js");
const CHIP_PATH = path.resolve(__dirname, "../src/data/chipTranslations.json");

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

function resolveEntry(phrase, langCode, chipTranslations) {
  const preloaded = PRELOADED_CORE_TRANSLATIONS?.[phrase]?.[langCode];
  if (preloaded?.translation && !preloaded.error) {
    return normalizeEntry(preloaded);
  }

  const chip = chipTranslations?.[phrase]?.[langCode];
  if (chip?.translation && !chip.error) {
    return normalizeEntry(chip);
  }

  return normalizeEntry(preloaded ?? chip ?? null);
}

async function main() {
  const chipFile = await readFile(CHIP_PATH, "utf-8");
  const chipTranslations = JSON.parse(chipFile);

  const result = {};

  for (const phrase of PHRASES) {
    result[phrase] = {};
    for (const lang of ALL_LANGUAGES) {
      result[phrase][lang.code] = resolveEntry(phrase, lang.code, chipTranslations);
    }
  }

  const content = `export const UNIFIED_TRANSLATIONS = ${JSON.stringify(result, null, 2)};\n`;
  await writeFile(OUT_PATH, content, "utf-8");
  console.log(`Saved unified translations to ${OUT_PATH}`);
}

main().catch((error) => {
  console.error("Failed to build unified translations:", error);
  process.exitCode = 1;
});
