import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const INTRO_STORAGE_KEY = 'portfolio-intro-seen';

function persistIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
  } catch {
    // sessionStorage unavailable
  }
}

export default function useSessionIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [shouldPlayIntro, setShouldPlayIntro] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const introPendingRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setShouldPlayIntro(false);
      setIsReady(true);

      try {
        if (window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== 'true') {
          persistIntroSeen();
        }
      } catch {
        // sessionStorage unavailable
      }

      return;
    }

    try {
      const hasSeenIntro = window.sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true';
      setShouldPlayIntro(!hasSeenIntro);
      introPendingRef.current = !hasSeenIntro;
    } catch {
      setShouldPlayIntro(false);
    }

    setIsReady(true);
  }, [shouldReduceMotion]);

  const markIntroSeen = useCallback(() => {
    if (!introPendingRef.current) {
      return;
    }

    persistIntroSeen();
    introPendingRef.current = false;
  }, []);

  return { shouldPlayIntro, isReady, markIntroSeen };
}
