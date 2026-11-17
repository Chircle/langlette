import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check, Copy, Eye, EyeOff, ExternalLink, History, Loader2, Moon, Play,
  RotateCcw, Square, Sun, Volume2, X,
} from "lucide-react";
import { LANGUAGES, PHRASES, getPhrase } from "./data/phrasebook.js";
import { readJSON, writeJSON, remove } from "./lib/storage.js";
import { copyText } from "./lib/clipboard.js";
import { translateFromGerman } from "./lib/translate.js";
import { useSpeech, googleTranslateUrl } from "./lib/useSpeech.js";
import "./App.css";

const STORAGE_KEY = "used-languages";
const THEME_KEY = "theme-preference";
const SPIN_INTERVAL_MS = 65;
const TOAST_MS = 2200;

const LANG_BY_CODE = new Map(LANGUAGES.map((l) => [l.code, l]));
const PHRASE_INDEX_BY_TEXT = new Map(PHRASES.map((p, i) => [p.de.toLowerCase(), i]));

function initialTheme() {
  const stored = readJSON(THEME_KEY, null);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function initialUsedCodes() {
  const codes = readJSON(STORAGE_KEY, []);
  // drop duplicates and codes of languages that no longer exist
  return Array.isArray(codes) ? [...new Set(codes)].filter((c) => LANG_BY_CODE.has(c)) : [];
}

const formatWithRomanization = ({ text, romanization }) =>
  romanization ? `${text} (${romanization})` : text;

/* ------------------------------------------------------------------ */

function SpeakButton({ text, lang, id, speech, size = 15 }) {
  if (!text) return null;
  const canSpeak = speech.hasVoice(lang.tts);
  const isSpeaking = speech.speakingId === id;

  if (!canSpeak) {
    return (
      <a
        className="sr-icon-btn"
        href={googleTranslateUrl(text, lang.code)}
        target="_blank"
        rel="noopener noreferrer"
        title={`Auf diesem Gerät gibt es keine ${lang.de}-Stimme – bei Google Übersetzer anhören`}
        aria-label={`Aussprache bei Google Übersetzer anhören (öffnet neuen Tab)`}
      >
        <Volume2 size={size} strokeWidth={2} />
        <ExternalLink size={9} strokeWidth={2.5} className="sr-icon-badge" />
      </a>
    );
  }

  return (
    <button
      type="button"
      className={"sr-icon-btn" + (isSpeaking ? " sr-icon-btn-active" : "")}
      onClick={() => (isSpeaking ? speech.stop() : speech.speak(text, lang.tts, id))}
      title={isSpeaking ? "Stopp" : "Aussprache anhören"}
      aria-label={isSpeaking ? "Wiedergabe stoppen" : `„${text}“ vorlesen`}
      aria-pressed={isSpeaking}
    >
      {isSpeaking ? <Square size={size - 3} strokeWidth={2.25} /> : <Volume2 size={size} strokeWidth={2} />}
    </button>
  );
}

function PhraseRow({ phrase, entry, lang, revealed, onReveal, speech }) {
  const id = `${lang.code}:${phrase.id}`;
  return (
    <div className="sr-chip">
      <button
        type="button"
        className="sr-chip-main"
        onClick={onReveal}
        disabled={!entry}
        title={entry ? "Anzeigen & kopieren" : undefined}
      >
        <span className="sr-chip-de">
          {phrase.de}
          {phrase.hint && <span className="sr-chip-hint">{phrase.hint}</span>}
        </span>
        {!entry && <span className="sr-chip-none">keine gängige Entsprechung</span>}
        {entry && revealed && (
          <span className="sr-chip-result" lang={lang.code}>
            {entry.text}
            {entry.romanization && <span className="sr-chip-roman">{entry.romanization}</span>}
          </span>
        )}
        {entry && !revealed && <span className="sr-chip-hidden" aria-hidden="true">• • •</span>}
      </button>
      {entry && <SpeakButton text={entry.text} lang={lang} id={id} speech={speech} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [usedCodes, setUsedCodes] = useState(initialUsedCodes);

  const [phase, setPhase] = useState("idle"); // idle | spinning | confirm | active
  const [displayLang, setDisplayLang] = useState(null);
  const [activeLang, setActiveLang] = useState(null);
  const [landed, setLanded] = useState(false);

  const [revealed, setRevealed] = useState(() => new Set());
  const [toast, setToast] = useState(null); // { type: "success" | "error", text }
  const [customText, setCustomText] = useState("");
  const [custom, setCustom] = useState(null); // { loading } | { text, romanization } | { error }

  const intervalRef = useRef(null);
  const toastTimeoutRef = useRef(null);
  const requestRef = useRef(null);
  const speech = useSpeech();

  const pool = useMemo(() => LANGUAGES.filter((l) => !usedCodes.includes(l.code)), [usedCodes]);
  const usedLanguages = useMemo(() => usedCodes.map((c) => LANG_BY_CODE.get(c)), [usedCodes]);

  /* ---------- side effects ---------- */
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(
    () => () => {
      clearInterval(intervalRef.current);
      clearTimeout(toastTimeoutRef.current);
      requestRef.current?.abort();
    },
    []
  );

  /* ---------- helpers ---------- */
  const showToast = useCallback((type, text) => {
    setToast({ type, text });
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  const stopSpinning = () => clearInterval(intervalRef.current);

  const openLanguage = (lang) => {
    stopSpinning();
    speech.stop();
    requestRef.current?.abort();
    setActiveLang(lang);
    setRevealed(new Set());
    setCustom(null);
    setCustomText("");
    setPhase(lang ? "active" : "idle");
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    writeJSON(THEME_KEY, next);
  };

  /* ---------- roulette ---------- */
  const startSpin = () => {
    if (pool.length === 0) return;
    const randomLang = () => pool[Math.floor(Math.random() * pool.length)];
    setLanded(false);
    setDisplayLang(randomLang()); // show something immediately, even on a very quick stop
    setPhase("spinning");
    stopSpinning();
    intervalRef.current = setInterval(() => setDisplayLang(randomLang()), SPIN_INTERVAL_MS);
  };

  const stopSpin = () => {
    stopSpinning();
    setLanded(true);
    setPhase("confirm");
  };

  const confirmLanguage = () => {
    if (!displayLang) return;
    const next = [...new Set([...usedCodes, displayLang.code])];
    setUsedCodes(next);
    writeJSON(STORAGE_KEY, next);
    openLanguage(displayLang);
  };

  const rejectLanguage = () => {
    setDisplayLang(null);
    setPhase("idle");
  };

  const selectUsedLanguage = (lang) => {
    if (activeLang?.code === lang.code) {
      // clicking the active tag closes it again
      setDisplayLang(null);
      openLanguage(null);
      return;
    }
    setDisplayLang(lang);
    setLanded(true);
    openLanguage(lang);
  };

  const resetHistory = () => {
    remove(STORAGE_KEY);
    setUsedCodes([]);
    setDisplayLang(null);
    openLanguage(null);
  };

  const chooseNewLanguage = () => {
    setDisplayLang(null);
    openLanguage(null);
  };

  /* ---------- phrases ---------- */
  const allRevealed = revealed.size === PHRASES.length;

  const toggleRevealAll = () =>
    setRevealed(allRevealed ? new Set() : new Set(PHRASES.map((p) => p.id)));

  const handlePhraseClick = async (phrase, entry) => {
    setRevealed((prev) => new Set(prev).add(phrase.id));
    const text = formatWithRomanization(entry);
    try {
      await copyText(text);
      showToast("success", `Kopiert: ${text}`);
    } catch {
      showToast("error", "Kopieren fehlgeschlagen.");
    }
  };

  const handleCustomTranslate = async () => {
    const text = customText.trim();
    if (!text || !activeLang) return;

    // Known phrase? Use the curated version instead of the API.
    const knownIndex = PHRASE_INDEX_BY_TEXT.get(text.toLowerCase());
    const known = knownIndex != null ? getPhrase(activeLang, knownIndex) : null;
    if (known) {
      setCustom({ ...known, source: "phrasebook" });
      return;
    }

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setCustom({ loading: true });

    try {
      const translated = await translateFromGerman(text, activeLang.code, { signal: controller.signal });
      setCustom({ text: translated, romanization: null, source: "api" });
    } catch (error) {
      if (error.name === "AbortError") return;
      setCustom({ error: error.message || "Übersetzung fehlgeschlagen." });
    }
  };

  const copyCustom = async () => {
    try {
      await copyText(formatWithRomanization(custom));
      showToast("success", "Kopiert.");
    } catch {
      showToast("error", "Kopieren fehlgeschlagen.");
    }
  };

  /* ============================= UI ============================= */
  return (
    <div className="sr-root" data-theme={theme}>
      <div className="sr-shell">
        <header className="sr-header">
          <div className="sr-eyebrow">LANGUAGE · ROULETTE</div>
          <button
            type="button"
            className="sr-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Zum hellen Design wechseln" : "Zum dunklen Design wechseln"}
            title={theme === "dark" ? "Helles Design" : "Dunkles Design"}
          >
            {theme === "dark" ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>
        </header>

        {toast && (
          <div className={"sr-toast" + (toast.type === "error" ? " sr-toast-error" : "")} role="status" aria-live="polite">
            {toast.text}
          </div>
        )}

        {/* Split-flap board */}
        <div className="sr-board-wrap">
          <div className="sr-board">
            <div
              key={displayLang ? displayLang.code + (landed ? "-landed" : "") : "empty"}
              className={"sr-board-inner" + (landed ? " sr-landed" : "")}
            >
              {displayLang ? (
                <>
                  <div className="sr-native" lang={displayLang.code}>{displayLang.native}</div>
                  <div className="sr-de">{displayLang.de}</div>
                  <div className="sr-region">Gesprochen in: {displayLang.regions}</div>
                </>
              ) : (
                <div className="sr-placeholder">? ? ?</div>
              )}
            </div>
          </div>
          <div className="sr-scanline" aria-hidden="true" />
        </div>

        {/* Controls */}
        <div className="sr-controls">
          {phase === "idle" && pool.length > 0 && (
            <button type="button" className="sr-btn sr-btn-primary" onClick={startSpin}>
              <Play size={16} strokeWidth={2.25} /> Start
            </button>
          )}

          {phase === "idle" && pool.length === 0 && (
            <div className="sr-empty-pool">
              Alle {LANGUAGES.length} Sprachen wurden bereits gewählt.
              <button type="button" className="sr-btn sr-btn-ghost" onClick={resetHistory}>
                <RotateCcw size={14} /> Verlauf zurücksetzen
              </button>
            </div>
          )}

          {phase === "spinning" && (
            <button type="button" className="sr-btn sr-btn-primary" onClick={stopSpin}>
              <Square size={15} strokeWidth={2.25} /> Stopp
            </button>
          )}

          {phase === "confirm" && (
            <div className="sr-confirm-row">
              <button type="button" className="sr-btn sr-btn-primary" onClick={confirmLanguage}>
                <Check size={16} strokeWidth={2.25} /> Bestätigen
              </button>
              <button type="button" className="sr-btn sr-btn-ghost" onClick={rejectLanguage}>
                <X size={16} strokeWidth={2.25} /> Nochmal
              </button>
            </div>
          )}

          {phase === "active" && activeLang && (
            <button type="button" className="sr-btn sr-btn-ghost" onClick={chooseNewLanguage}>
              <RotateCcw size={14} /> Neue Sprache wählen
            </button>
          )}
        </div>

        {/* History */}
        {usedLanguages.length > 0 && (
          <section className="sr-history">
            <div className="sr-history-head">
              <span>
                <History size={13} strokeWidth={2} /> Verlauf · {usedLanguages.length} von {LANGUAGES.length}
              </span>
              <button type="button" className="sr-link" onClick={resetHistory}>zurücksetzen</button>
            </div>
            <div className="sr-history-tags">
              {usedLanguages.map((l) => (
                <button
                  type="button"
                  className={"sr-tag" + (activeLang?.code === l.code ? " sr-tag-active" : "")}
                  key={l.code}
                  title={`${l.de} · ${l.regions}`}
                  onClick={() => selectUsedLanguage(l)}
                  lang={l.code}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Translator */}
        {phase === "active" && activeLang && (
          <section className="sr-translator">
            <div className="sr-translator-head">
              Übersetzen nach <strong>{activeLang.de}</strong> · {activeLang.native}
            </div>

            <div className="sr-translator-bar">
              <span>Antippen zum Aufdecken & Kopieren</span>
              <button type="button" className="sr-link" onClick={toggleRevealAll}>
                {allRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                {allRevealed ? " alle verbergen" : " alle aufdecken"}
              </button>
            </div>

            <div className="sr-chips">
              {PHRASES.map((phrase, i) => {
                const entry = getPhrase(activeLang, i);
                return (
                  <PhraseRow
                    key={phrase.id}
                    phrase={phrase}
                    entry={entry}
                    lang={activeLang}
                    revealed={revealed.has(phrase.id)}
                    onReveal={() => entry && handlePhraseClick(phrase, entry)}
                    speech={speech}
                  />
                );
              })}
            </div>

            <form
              className="sr-custom"
              onSubmit={(e) => {
                e.preventDefault();
                handleCustomTranslate();
              }}
            >
              <input
                className="sr-input"
                type="text"
                placeholder="Eigenen deutschen Text eingeben …"
                aria-label="Eigener Text auf Deutsch"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={500}
              />
              <button
                type="submit"
                className="sr-btn sr-btn-primary sr-btn-small"
                disabled={custom?.loading || !customText.trim()}
              >
                {custom?.loading ? <Loader2 className="sr-spin" size={14} /> : "Übersetzen"}
              </button>
            </form>

            {custom && !custom.loading && (
              <div className={"sr-result" + (custom.error ? " sr-result-error" : "")}>
                {custom.error ? (
                  custom.error
                ) : (
                  <>
                    <div className="sr-result-row">
                      <div className="sr-result-main" lang={activeLang.code}>{custom.text}</div>
                      <div className="sr-result-actions">
                        <SpeakButton text={custom.text} lang={activeLang} id="custom" speech={speech} />
                        <button type="button" className="sr-icon-btn" onClick={copyCustom} title="Kopieren" aria-label="Übersetzung kopieren">
                          <Copy size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                    {custom.romanization && <div className="sr-result-sub">{custom.romanization}</div>}
                    <div className="sr-result-source">
                      {custom.source === "api"
                        ? "Maschinelle Übersetzung (MyMemory) – kann ungenau sein."
                        : "Aus dem geprüften Phrasebook."}
                    </div>
                  </>
                )}
              </div>
            )}

            {!speech.supported && (
              <p className="sr-note">
                Dein Browser unterstützt keine Sprachausgabe – der Lautsprecher öffnet stattdessen Google Übersetzer.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
