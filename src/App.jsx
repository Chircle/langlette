import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Square, Check, RotateCcw, X, History, Loader2, Sun, Moon } from "lucide-react";
import { ALL_LANGUAGES, PHRASES } from "./data/translationConfig";
import chipTranslations from "./data/chipTranslations.json";

const STORAGE_KEY = "used-languages";
const THEME_KEY = "theme-preference";
const SPIN_INTERVAL_MS = 65;

export default function App() {
  const [theme, setTheme] = useState("dark");

  const [pool, setPool] = useState(ALL_LANGUAGES);
  const [usedCodes, setUsedCodes] = useState([]);
  const [storageReady, setStorageReady] = useState(false);

  const [phase, setPhase] = useState("idle"); // idle | spinning | confirm | active
  const [displayLang, setDisplayLang] = useState(null);
  const [activeLang, setActiveLang] = useState(null);
  const [landed, setLanded] = useState(false);

  const [translations, setTranslations] = useState({}); // key: phrase -> {translation, transliteration, loading, error}
  const [copyNotice, setCopyNotice] = useState(null); // {type: "success"|"error", text: string}
  const [customText, setCustomText] = useState("");
  const [customResult, setCustomResult] = useState(null);
  const [customLoading, setCustomLoading] = useState(false);

  const intervalRef = useRef(null);
  const noticeTimeoutRef = useRef(null);

  const safeStorageGet = useCallback(async (key) => {
    if (!window.storage?.get) return null;
    try {
      return await window.storage.get(key, false);
    } catch {
      return null;
    }
  }, []);

  const safeStorageSet = useCallback((key, value) => {
    if (!window.storage?.set) return;
    try {
      const maybePromise = window.storage.set(key, value, false);
      if (maybePromise && typeof maybePromise.catch === "function") {
        maybePromise.catch(() => {});
      }
    } catch {
      /* ignore storage write errors */
    }
  }, []);

  const safeStorageDelete = useCallback(async (key) => {
    if (!window.storage?.delete) return;
    try {
      await window.storage.delete(key, false);
    } catch {
      /* ignore storage delete errors */
    }
  }, []);

  /* ---------- Storage laden ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await safeStorageGet(STORAGE_KEY);
        const codes = res ? JSON.parse(res.value) : [];
        setUsedCodes(codes);
        setPool(ALL_LANGUAGES.filter((l) => !codes.includes(l.code)));
      } catch {
        setUsedCodes([]);
        setPool(ALL_LANGUAGES);
      } finally {
        setStorageReady(true);
      }
    })();

    (async () => {
      try {
        const res = await safeStorageGet(THEME_KEY);
        if (res && (res.value === "light" || res.value === "dark")) {
          setTheme(res.value);
          return;
        }
      } catch {
        /* keine gespeicherte Präferenz — Systemeinstellung als Fallback */
      }
      try {
        const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
        setTheme(prefersLight ? "light" : "dark");
      } catch {
        /* Standard bleibt dark */
      }
    })();

    return () => clearInterval(intervalRef.current);
  }, [safeStorageGet]);

  useEffect(() => {
    return () => clearTimeout(noticeTimeoutRef.current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      safeStorageSet(THEME_KEY, next);
      return next;
    });
  }, [safeStorageSet]);

  /* ---------- Roulette-Logik ---------- */
  const startSpin = useCallback(() => {
    if (pool.length === 0) return;
    setLanded(false);
    setPhase("spinning");
    intervalRef.current = setInterval(() => {
      const next = pool[Math.floor(Math.random() * pool.length)];
      setDisplayLang(next);
    }, SPIN_INTERVAL_MS);
  }, [pool]);

  const stopSpin = useCallback(() => {
    clearInterval(intervalRef.current);
    setLanded(true);
    setPhase("confirm");
  }, []);

  const confirmLanguage = useCallback(() => {
    if (!displayLang) return;
    const newUsed = [...usedCodes, displayLang.code];
    setUsedCodes(newUsed);
    setPool(ALL_LANGUAGES.filter((l) => !newUsed.includes(l.code)));
    safeStorageSet(STORAGE_KEY, JSON.stringify(newUsed));
    setActiveLang(displayLang);
    setTranslations({});
    setCustomResult(null);
    setCustomText("");
    setPhase("active");
  }, [displayLang, safeStorageSet, usedCodes]);

  const rejectLanguage = useCallback(() => {
    setDisplayLang(null);
    setPhase("idle");
  }, []);

  const resetHistory = useCallback(async () => {
    await safeStorageDelete(STORAGE_KEY);
    setUsedCodes([]);
    setPool(ALL_LANGUAGES);
    setActiveLang(null);
    setDisplayLang(null);
    setPhase("idle");
  }, [safeStorageDelete]);

  const chooseNewLanguage = useCallback(() => {
    setActiveLang(null);
    setDisplayLang(null);
    setPhase("idle");
  }, []);

  const showCopyNotice = useCallback((type, text) => {
    setCopyNotice({ type, text });
    clearTimeout(noticeTimeoutRef.current);
    noticeTimeoutRef.current = setTimeout(() => {
      setCopyNotice(null);
    }, 2200);
  }, []);

  const copyToClipboard = useCallback(async (text) => {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (!ok) {
      throw new Error("Clipboard copy failed");
    }
  }, []);

  const translateCustomText = useCallback(
    async (text, setLoadingFn, setResultFn) => {
      if (!activeLang) return;
      setLoadingFn(true);
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=de|${activeLang.code}`;
        const response = await fetch(url);
        const data = await response.json();
        const translatedText = data?.responseData?.translatedText;
        const isOk = response.ok && Number(data?.responseStatus) === 200 && translatedText;

        if (!isOk) {
          throw new Error("Translation request failed");
        }

        setResultFn({
          translation: translatedText,
          transliteration: null,
          error: false,
        });
      } catch {
        setResultFn({ translation: null, transliteration: null, error: true });
      } finally {
        setLoadingFn(false);
      }
    },
    [activeLang]
  );

  const handleChipClick = async (phrase) => {
    const chipResult = chipTranslations?.[phrase]?.[activeLang?.code];
    if (!chipResult?.translation) {
      setTranslations((prev) => ({
        ...prev,
        [phrase]: { translation: null, transliteration: null, loading: false, error: true },
      }));
      showCopyNotice("error", "Keine Übersetzung zum Kopieren verfügbar.");
      return;
    }

    setTranslations((prev) => ({
      ...prev,
      [phrase]: {
        translation: chipResult.translation,
        transliteration: chipResult.transliteration || null,
        loading: false,
        error: false,
      },
    }));

    const copyText = chipResult.transliteration
      ? `${chipResult.translation} (${chipResult.transliteration})`
      : chipResult.translation;

    try {
      await copyToClipboard(copyText);
      showCopyNotice("success", `Kopiert: ${copyText}`);
    } catch {
      showCopyNotice("error", "Kopieren fehlgeschlagen.");
    }
  };

  const handleCustomTranslate = () => {
    if (!customText.trim()) return;
    translateCustomText(customText.trim(), setCustomLoading, setCustomResult);
  };

  const usedLangObjects = ALL_LANGUAGES.filter((l) => usedCodes.includes(l.code));

  /* ============================= UI ============================= */
  return (
    <div className="sr-root" data-theme={theme}>
      <style>{CSS}</style>

      <div className="sr-shell">
        <div className="sr-header">
          <div className="sr-eyebrow">LANGUAGE · ROULETTE</div>
          <button
            className="sr-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Zu Lightmode wechseln" : "Zu Darkmode wechseln"}
            title={theme === "dark" ? "Lightmode" : "Darkmode"}
          >
            {theme === "dark" ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>
        </div>

        {copyNotice && (
          <div
            className={"sr-toast" + (copyNotice.type === "error" ? " sr-toast-error" : "")}
            role="status"
            aria-live="polite"
          >
            {copyNotice.text}
          </div>
        )}

        {/* Split-flap Anzeige */}
        <div className="sr-board-wrap">
          <div className="sr-board">
            <div key={displayLang ? displayLang.code + (landed ? "-landed" : "") : "empty"}
                 className={"sr-board-inner" + (landed ? " sr-landed" : "")}>
              {displayLang ? (
                <>
                  <div className="sr-native">{displayLang.native}</div>
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

        {/* Steuerung */}
        <div className="sr-controls">
          {phase === "idle" && pool.length > 0 && (
            <button className="sr-btn sr-btn-primary" onClick={startSpin}>
              <Play size={16} strokeWidth={2.25} /> Start
            </button>
          )}

          {phase === "idle" && pool.length === 0 && (
            <div className="sr-empty-pool">
              Alle {ALL_LANGUAGES.length} Sprachen wurden bereits gewählt.
              <button className="sr-btn sr-btn-ghost" onClick={resetHistory}>
                <RotateCcw size={14} /> Verlauf zurücksetzen
              </button>
            </div>
          )}

          {phase === "spinning" && (
            <button className="sr-btn sr-btn-primary" onClick={stopSpin}>
              <Square size={15} strokeWidth={2.25} /> Stopp
            </button>
          )}

          {phase === "confirm" && (
            <div className="sr-confirm-row">
              <button className="sr-btn sr-btn-primary" onClick={confirmLanguage}>
                <Check size={16} strokeWidth={2.25} /> Bestätigen
              </button>
              <button className="sr-btn sr-btn-ghost" onClick={rejectLanguage}>
                <X size={16} strokeWidth={2.25} /> Nochmal
              </button>
            </div>
          )}

          {phase === "active" && activeLang && (
            <button className="sr-btn sr-btn-ghost" onClick={chooseNewLanguage}>
              <RotateCcw size={14} /> Neue Sprache wählen
            </button>
          )}
        </div>

        {/* Verlauf */}
        {storageReady && usedLangObjects.length > 0 && (
          <div className="sr-history">
            <div className="sr-history-head">
              <span><History size={13} strokeWidth={2} /> Verlauf · {usedLangObjects.length} gewählt</span>
              <button className="sr-link" onClick={resetHistory}>zurücksetzen</button>
            </div>
            <div className="sr-history-tags">
              {usedLangObjects.map((l) => (
                <span className="sr-tag" key={l.code} title={`${l.de} · ${l.regions}`}>{l.native}</span>
              ))}
            </div>
          </div>
        )}

        {/* Übersetzer */}
        {phase === "active" && activeLang && (
          <div className="sr-translator">
            <div className="sr-translator-head">
              Übersetzen nach <strong>{activeLang.de}</strong> · {activeLang.native}
            </div>
            <div className="sr-translator-sub">Gesprochen in: {activeLang.regions}</div>

            <div className="sr-chips">
              {PHRASES.map((phrase) => {
                const t = translations[phrase];
                return (
                  <button
                    key={phrase}
                    className="sr-chip"
                    onClick={() => handleChipClick(phrase)}
                    disabled={t?.loading}
                  >
                    <span className="sr-chip-de">{phrase}</span>
                    {t?.loading && <Loader2 className="sr-spin" size={13} />}
                    {t && !t.loading && !t.error && (
                      <span className="sr-chip-result">
                        {t.translation}
                        {t.transliteration ? ` · ${t.transliteration}` : ""}
                      </span>
                    )}
                    {t && !t.loading && t.error && (
                      <span className="sr-chip-error">Fehler bei der Übersetzung</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="sr-custom">
              <input
                className="sr-input"
                type="text"
                placeholder="Eigenen Text eingeben …"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomTranslate()}
              />
              <button
                className="sr-btn sr-btn-primary sr-btn-small"
                onClick={handleCustomTranslate}
                disabled={customLoading || !customText.trim()}
              >
                {customLoading ? <Loader2 className="sr-spin" size={14} /> : "Übersetzen"}
              </button>
            </div>

            {customResult && (
              <div className={"sr-result" + (customResult.error ? " sr-result-error" : "")}>
                {customResult.error ? (
                  "Übersetzung fehlgeschlagen — bitte erneut versuchen."
                ) : (
                  <>
                    <div className="sr-result-main">{customResult.translation}</div>
                    {customResult.transliteration && (
                      <div className="sr-result-sub">{customResult.transliteration}</div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Styles — bewusst reduzierte Palette: kühles Beinahe-Schwarz,
   ein einziger Mint-Akzent, Mono-Font für die Klappanzeige.
--------------------------------------------------------- */
const CSS = `
  .sr-root[data-theme="dark"] {
    --sr-bg: #0d0f14;
    --sr-board-grad-1: #171b22;
    --sr-board-grad-2: #12151b;
    --sr-board-border: #262b35;
    --sr-board-shadow-1: rgba(255,255,255,0.03);
    --sr-board-shadow-2: rgba(0,0,0,0.7);
    --sr-panel: #12151b;
    --sr-panel-2: #151920;
    --sr-border: #232833;
    --sr-border-hover: #3a4250;
    --sr-text: #eef0f3;
    --sr-text-soft: #c3c8d1;
    --sr-muted: #7b8290;
    --sr-muted-2: #6a7280;
    --sr-muted-3: #575d68;
    --sr-placeholder-text: #3a4050;
    --sr-tag-text: #a6acb6;
    --sr-accent: #6fd3c7;
    --sr-accent-hover: #86dcd2;
    --sr-accent-contrast: #0d0f14;
    --sr-error: #d97878;
    --sr-error-soft: #d0a3a3;
    --sr-hr: #1c2027;
  }
  .sr-root[data-theme="light"] {
    --sr-bg: #f4f5f3;
    --sr-board-grad-1: #ffffff;
    --sr-board-grad-2: #eef1ef;
    --sr-board-border: #dadfdc;
    --sr-board-shadow-1: rgba(255,255,255,0.6);
    --sr-board-shadow-2: rgba(30,40,38,0.10);
    --sr-panel: #ffffff;
    --sr-panel-2: #f0f2f0;
    --sr-border: #dde1de;
    --sr-border-hover: #b7bdb9;
    --sr-text: #171a19;
    --sr-text-soft: #383e3c;
    --sr-muted: #666f6b;
    --sr-muted-2: #767f7b;
    --sr-muted-3: #93998f;
    --sr-placeholder-text: #c3c9c4;
    --sr-tag-text: #4c5450;
    --sr-accent: #128a7a;
    --sr-accent-hover: #0e6d61;
    --sr-accent-contrast: #ffffff;
    --sr-error: #b8443f;
    --sr-error-soft: #8f3733;
    --sr-hr: #e2e5e2;
  }

  .sr-root {
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 48px 20px;
    background: var(--sr-bg);
    color: var(--sr-text);
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .sr-shell { width: 100%; max-width: 460px; display: flex; flex-direction: column; align-items: center; gap: 22px; }

  .sr-header { width: 100%; display: flex; align-items: center; justify-content: center; position: relative; }
  .sr-eyebrow {
    font-size: 11px; letter-spacing: 0.22em; font-weight: 600;
    color: var(--sr-muted-2); text-transform: uppercase;
  }
  .sr-theme-toggle {
    position: absolute; right: 0; top: 50%; transform: translateY(-50%);
    display: flex; align-items: center; justify-content: center;
    width: 30px; height: 30px; border-radius: 999px;
    background: var(--sr-panel); border: 1px solid var(--sr-border);
    color: var(--sr-muted); cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
  }
  .sr-theme-toggle:hover { border-color: var(--sr-border-hover); color: var(--sr-text); }

  .sr-board-wrap { position: relative; width: 100%; }
  .sr-board {
    width: 100%; min-height: 148px;
    background: linear-gradient(180deg, var(--sr-board-grad-1) 0%, var(--sr-board-grad-2) 100%);
    border: 1px solid var(--sr-board-border);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    perspective: 500px;
    overflow: hidden;
    box-shadow: inset 0 1px 0 var(--sr-board-shadow-1), 0 12px 30px -18px var(--sr-board-shadow-2);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .sr-board-inner { text-align: center; padding: 18px 16px; transform-origin: top center; }
  .sr-board-inner.sr-landed { animation: srFlip 0.42s cubic-bezier(.2,.8,.2,1); }
  @media (prefers-reduced-motion: reduce) {
    .sr-board-inner.sr-landed { animation: none; }
  }
  @keyframes srFlip {
    0%   { transform: rotateX(85deg); opacity: 0.2; }
    55%  { transform: rotateX(-8deg); opacity: 1; }
    100% { transform: rotateX(0deg); }
  }
  .sr-native {
    font-family: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 34px; font-weight: 600; letter-spacing: 0.01em;
    color: var(--sr-text); line-height: 1.15; word-break: break-word;
  }
  .sr-de { margin-top: 6px; font-size: 13px; color: var(--sr-muted); letter-spacing: 0.03em; }
  .sr-region { margin-top: 8px; font-size: 11.5px; color: var(--sr-muted-2); line-height: 1.35; }
  .sr-placeholder {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 30px; color: var(--sr-placeholder-text); letter-spacing: 0.3em;
  }
  .sr-scanline {
    position: absolute; left: 0; right: 0; top: 50%; height: 1px;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--sr-accent) 35%, transparent), transparent);
    pointer-events: none;
  }

  .sr-controls { display: flex; justify-content: center; }
  .sr-confirm-row { display: flex; gap: 10px; }

  .sr-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 600; letter-spacing: 0.01em;
    padding: 10px 20px; border-radius: 999px; border: 1px solid transparent;
    cursor: pointer; transition: transform 0.12s ease, background 0.15s ease, border-color 0.15s ease;
    font-family: inherit;
  }
  .sr-btn:active { transform: scale(0.97); }
  .sr-btn:disabled { opacity: 0.5; cursor: default; }
  .sr-btn-primary { background: var(--sr-accent); color: var(--sr-accent-contrast); }
  .sr-btn-primary:hover:not(:disabled) { background: var(--sr-accent-hover); }
  .sr-btn-ghost { background: transparent; color: var(--sr-text-soft); border-color: var(--sr-border); }
  .sr-btn-ghost:hover { border-color: var(--sr-border-hover); color: var(--sr-text); }
  .sr-btn-small { padding: 9px 16px; font-size: 13px; }

  .sr-empty-pool {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    font-size: 13px; color: var(--sr-muted); text-align: center;
  }

  .sr-history { width: 100%; border-top: 1px solid var(--sr-hr); padding-top: 14px; }
  .sr-history-head {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 11.5px; color: var(--sr-muted-2); letter-spacing: 0.02em; margin-bottom: 10px;
  }
  .sr-history-head span { display: inline-flex; align-items: center; gap: 6px; }
  .sr-link { background: none; border: none; color: var(--sr-accent); font-size: 11.5px; cursor: pointer; font-family: inherit; padding: 0; }
  .sr-link:hover { text-decoration: underline; }
  .sr-history-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .sr-tag {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px; padding: 4px 9px; border-radius: 6px;
    background: var(--sr-panel-2); border: 1px solid var(--sr-border); color: var(--sr-tag-text);
  }

  .sr-translator { width: 100%; display: flex; flex-direction: column; gap: 14px; }
  .sr-translator-head { font-size: 13px; color: var(--sr-muted-2); text-align: center; }
  .sr-translator-head strong { color: var(--sr-text); }
  .sr-translator-sub { font-size: 12px; color: var(--sr-muted); text-align: center; margin-top: -6px; }
  .sr-toast {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 60;
    max-width: min(340px, calc(100vw - 24px));
    border: 1px solid color-mix(in srgb, var(--sr-accent) 45%, transparent);
    background: color-mix(in srgb, var(--sr-accent) 11%, var(--sr-panel));
    color: var(--sr-text);
    border-radius: 10px;
    padding: 9px 12px;
    font-size: 12.5px;
    line-height: 1.35;
    box-shadow: 0 12px 28px -16px rgba(0, 0, 0, 0.55);
    animation: srToastIn 0.18s ease-out;
    pointer-events: none;
    word-break: break-word;
  }
  .sr-toast-error {
    border-color: color-mix(in srgb, var(--sr-error) 60%, transparent);
    background: color-mix(in srgb, var(--sr-error) 12%, var(--sr-panel));
    color: var(--sr-error-soft);
  }
  @keyframes srToastIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @media (max-width: 640px) {
    .sr-toast {
      top: 10px;
      left: 12px;
      right: 12px;
      max-width: none;
      font-size: 12px;
    }
  }

  .sr-chips { display: flex; flex-direction: column; gap: 8px; }
  .sr-chip {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    width: 100%; text-align: left;
    background: var(--sr-panel); border: 1px solid var(--sr-border); border-radius: 8px;
    padding: 10px 14px; cursor: pointer; font-family: inherit;
    transition: border-color 0.15s ease;
  }
  .sr-chip:hover:not(:disabled) { border-color: var(--sr-border-hover); }
  .sr-chip:disabled { cursor: default; }
  .sr-chip-de { font-size: 13.5px; color: var(--sr-text-soft); flex-shrink: 0; }
  .sr-chip-result {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px; color: var(--sr-accent); text-align: right;
  }
  .sr-chip-error { font-size: 12px; color: var(--sr-error); }
  .sr-spin { animation: srSpin 0.8s linear infinite; color: var(--sr-accent); }
  @keyframes srSpin { to { transform: rotate(360deg); } }

  .sr-custom { display: flex; gap: 8px; }
  .sr-input {
    flex: 1; background: var(--sr-panel); border: 1px solid var(--sr-border); border-radius: 8px;
    color: var(--sr-text); padding: 10px 12px; font-size: 13.5px; font-family: inherit;
    outline: none; transition: border-color 0.15s ease;
  }
  .sr-input:focus { border-color: var(--sr-accent); }
  .sr-input::placeholder { color: var(--sr-muted-3); }

  .sr-result {
    background: var(--sr-panel); border: 1px solid var(--sr-border); border-left: 2px solid var(--sr-accent);
    border-radius: 8px; padding: 12px 14px;
  }
  .sr-result-error { border-left-color: var(--sr-error); color: var(--sr-error-soft); font-size: 13px; }
  .sr-result-main { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 15px; color: var(--sr-text); }
  .sr-result-sub { margin-top: 4px; font-size: 12.5px; color: var(--sr-muted); }
`;
