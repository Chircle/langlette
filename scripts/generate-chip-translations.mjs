import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_LANGUAGES, PHRASES } from "../src/data/translationConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_PATH = path.resolve(__dirname, "../src/data/chipTranslations.json");
const BASE_URL = "https://api.mymemory.translated.net/get";
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 500;
const REQUEST_DELAY_MS = 180;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translatePhrase(text, targetCode) {
  const url = `${BASE_URL}?q=${encodeURIComponent(text)}&langpair=de|${targetCode}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url);
      const payload = await response.json();
      const translatedText = payload?.responseData?.translatedText;
      const status = Number(payload?.responseStatus);

      if (response.ok && status === 200 && translatedText) {
        return {
          translation: translatedText,
          transliteration: null,
          error: false,
        };
      }

      const shouldRetry = response.status === 429 || response.status >= 500;
      if (!shouldRetry || attempt === MAX_RETRIES) {
        return {
          translation: null,
          transliteration: null,
          error: true,
          message: payload?.responseDetails || `HTTP ${response.status}`,
        };
      }
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        return {
          translation: null,
          transliteration: null,
          error: true,
          message: error instanceof Error ? error.message : "Unknown fetch error",
        };
      }
    }

    await sleep(RETRY_BASE_DELAY_MS * attempt);
  }

  return {
    translation: null,
    transliteration: null,
    error: true,
    message: "Unexpected translation failure",
  };
}

async function main() {
  const result = {
    _meta: {
      provider: "MyMemory",
      sourceLanguage: "de",
      generatedAt: new Date().toISOString(),
      phraseCount: PHRASES.length,
      languageCount: ALL_LANGUAGES.length,
    },
  };

  for (const phrase of PHRASES) {
    console.log(`Generating phrase: ${phrase}`);
    result[phrase] = {};
    for (const lang of ALL_LANGUAGES) {
      const translated = await translatePhrase(phrase, lang.code);
      result[phrase][lang.code] = translated;
      await sleep(REQUEST_DELAY_MS);
    }
  }

  await writeFile(OUT_PATH, `${JSON.stringify(result, null, 2)}\n`, "utf-8");
  console.log(`Saved translations to ${OUT_PATH}`);
}

main().catch((error) => {
  console.error("Failed to generate translations:", error);
  process.exitCode = 1;
});
