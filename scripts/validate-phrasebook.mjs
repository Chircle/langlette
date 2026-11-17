// Checks src/data/phrasebook.js for structural problems and typical machine-translation artefacts.
// Usage: npm run validate
import { LANGUAGES, PHRASES } from "../src/data/phrasebook.js";

const errors = [];
const warnings = [];
const seen = new Set();
const NON_LATIN = /[^\p{Script=Latin}\p{Script=Common}\p{Script=Inherited}]/u;
const MOJIBAKE = /Ã.|à®|à¨|â€/;
const DIALOG_ARTEFACT = /^\s*[-"'♪]|\.\.\.$/;

for (const lang of LANGUAGES) {
  const where = `${lang.code} (${lang.de})`;
  if (seen.has(lang.code)) errors.push(`${where}: duplicate language code`);
  seen.add(lang.code);

  for (const field of ["code", "tts", "de", "native", "regions"]) {
    if (!lang[field]) errors.push(`${where}: missing "${field}"`);
  }

  if (!Array.isArray(lang.phrases) || lang.phrases.length !== PHRASES.length) {
    errors.push(`${where}: expected ${PHRASES.length} phrases, got ${lang.phrases?.length ?? 0}`);
    continue;
  }

  lang.phrases.forEach((entry, i) => {
    const label = `${where} · "${PHRASES[i].de}"`;
    if (entry === null) {
      warnings.push(`${label}: no equivalent (null)`);
      return;
    }
    const [text, roman] = typeof entry === "string" ? [entry, null] : entry;
    if (typeof text !== "string" || !text.trim()) errors.push(`${label}: empty text`);
    if (MOJIBAKE.test(text)) errors.push(`${label}: looks like broken encoding → ${text}`);
    if (DIALOG_ARTEFACT.test(text)) errors.push(`${label}: looks like a subtitle artefact → ${text}`);
    if (/bon app[ée]tit/i.test(text) && !["fr"].includes(lang.code)) {
      errors.push(`${label}: untranslated "Bon appétit"`);
    }
    if (NON_LATIN.test(text) && !roman) errors.push(`${label}: non-Latin script without romanization`);
    if (roman && !NON_LATIN.test(text)) warnings.push(`${label}: romanization on Latin text`);
  });
}

warnings.forEach((w) => console.warn(`warn  ${w}`));
errors.forEach((e) => console.error(`error ${e}`));
console.log(`\n${LANGUAGES.length} languages × ${PHRASES.length} phrases · ${errors.length} errors · ${warnings.length} warnings`);
if (errors.length) process.exitCode = 1;
