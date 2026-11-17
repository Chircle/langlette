// Free-text translation via the MyMemory API (no key, rate-limited, quality varies).
const ENDPOINT = "https://api.mymemory.translated.net/get";

export async function translateFromGerman(text, targetCode, { signal } = {}) {
  const url = `${ENDPOINT}?q=${encodeURIComponent(text)}&langpair=de|${encodeURIComponent(targetCode)}`;
  const response = await fetch(url, { signal });
  const data = await response.json().catch(() => null);
  const translated = data?.responseData?.translatedText;
  const status = Number(data?.responseStatus);

  if (!response.ok || status !== 200 || !translated) {
    const detail = String(data?.responseDetails || "");
    if (status === 429 || /QUOTA|LIMIT/i.test(detail)) {
      throw new Error("Tageslimit des Übersetzungsdienstes erreicht – bitte später erneut versuchen.");
    }
    if (/LANGUAGE PAIR|INVALID/i.test(detail)) {
      throw new Error("Diese Sprache wird vom Übersetzungsdienst nicht unterstützt.");
    }
    throw new Error("Übersetzung fehlgeschlagen – bitte erneut versuchen.");
  }

  // MyMemory sometimes returns quota warnings as a "translation".
  if (/MYMEMORY WARNING/i.test(translated)) {
    throw new Error("Tageslimit des Übersetzungsdienstes erreicht – bitte später erneut versuchen.");
  }

  return translated;
}
