import { useCallback, useEffect, useState } from "react";

// Browsers report some languages under legacy or alternative codes.
const LANG_ALIASES = {
  nb: ["nb", "no", "nn"],
  fil: ["fil", "tl"],
  he: ["he", "iw"],
  id: ["id", "in"],
};

const normalise = (tag) => (tag || "").toLowerCase().replace(/_/g, "-");

function pickVoice(voices, tag) {
  const wanted = normalise(tag);
  const primary = wanted.split("-")[0];
  const accepted = LANG_ALIASES[primary] ?? [primary];

  const exact = voices.find((v) => normalise(v.lang) === wanted);
  if (exact) return exact;

  const candidates = voices.filter((v) => accepted.includes(normalise(v.lang).split("-")[0]));
  // Prefer the browser's default voice, then on-device voices (work offline, start faster).
  return (
    candidates.find((v) => v.default) ??
    candidates.find((v) => v.localService) ??
    candidates[0] ??
    null
  );
}

/**
 * Web Speech API wrapper.
 * Voice availability depends on the OS/browser — `hasVoice(tag)` tells the UI
 * whether to speak locally or offer an external fallback.
 */
export function useSpeech() {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [voices, setVoices] = useState([]);
  const [speakingId, setSpeakingId] = useState(null);

  useEffect(() => {
    if (!supported) return undefined;
    const synth = window.speechSynthesis;
    const load = () => setVoices(synth.getVoices());
    load();
    synth.addEventListener?.("voiceschanged", load);
    return () => {
      synth.removeEventListener?.("voiceschanged", load);
      synth.cancel();
    };
  }, [supported]);

  const hasVoice = useCallback((tag) => supported && Boolean(pickVoice(voices, tag)), [supported, voices]);

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, [supported]);

  const speak = useCallback(
    (text, tag, id, { rate = 0.9 } = {}) => {
      if (!supported || !text) return false;
      const voice = pickVoice(voices, tag);
      if (!voice) return false;

      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = rate;
      utterance.onend = () => setSpeakingId((cur) => (cur === id ? null : cur));
      utterance.onerror = utterance.onend;
      setSpeakingId(id);
      synth.speak(utterance);
      return true;
    },
    [supported, voices]
  );

  return { supported, hasVoice, speak, stop, speakingId };
}

/** External fallback when the device has no voice for a language. */
export function googleTranslateUrl(text, code) {
  return `https://translate.google.com/?sl=${encodeURIComponent(code)}&tl=de&text=${encodeURIComponent(text)}&op=translate`;
}
