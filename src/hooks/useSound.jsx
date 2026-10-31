import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'benji-sound';

// Tiny synthesized UI blips, so there are no audio files to load.
const TONES = {
  move: { freq: 660, to: 720, duration: 0.05, type: 'square', gain: 0.03 },
  select: { freq: 520, to: 1040, duration: 0.12, type: 'square', gain: 0.05 },
  back: { freq: 440, to: 260, duration: 0.1, type: 'square', gain: 0.04 },
  start: { freq: 392, to: 1176, duration: 0.35, type: 'sawtooth', gain: 0.04 },
};

function readStoredPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'on';
  } catch {
    return false;
  }
}

const SoundContext = createContext({ enabled: false, toggle: () => {}, play: () => {} });

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(readStoredPreference);
  const contextRef = useRef(null);

  const play = useCallback(
    (name) => {
      const tone = TONES[name];
      if (!enabled || !tone) return;
      try {
        contextRef.current ??= new (window.AudioContext || window.webkitAudioContext)();
        const ctx = contextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime;
        osc.type = tone.type;
        osc.frequency.setValueAtTime(tone.freq, now);
        osc.frequency.exponentialRampToValueAtTime(tone.to, now + tone.duration);
        gain.gain.setValueAtTime(tone.gain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + tone.duration);
      } catch {
        // Audio is decoration; ignore failures.
      }
    },
    [enabled]
  );

  const toggle = useCallback(() => {
    setEnabled((value) => {
      const next = !value;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        // Preference just won't persist.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  return useContext(SoundContext);
}
