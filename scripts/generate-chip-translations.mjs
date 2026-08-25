import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_LANGUAGES, PHRASES } from "../src/data/translationConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function main() {
  const chipFile = await readFile(CHIP_PATH, "utf-8");
  const chipTranslations = JSON.parse(chipFile);

  const result = {};

  for (const phrase of PHRASES) {
    result[phrase] = {};
    for (const lang of ALL_LANGUAGES) {
      result[phrase][lang.code] = normalizeEntry(chipTranslations?.[phrase]?.[lang.code]);
    }
  }

  console.log(`Validated ${Object.keys(result).length} phrases in ${CHIP_PATH}`);
}

main().catch((error) => {
  console.error("Failed to build unified translations:", error);
  process.exitCode = 1;
});
