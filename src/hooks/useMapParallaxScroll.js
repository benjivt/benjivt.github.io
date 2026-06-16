import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function useMapParallaxScroll(viewportRef, surfaceRef) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const viewport = viewportRef.current;
    const surface = surfaceRef.current;

    if (!viewport || !surface || shouldReduceMotion) {
      return undefined;
    }

    const update = () => {
      surface.style.setProperty('--map-scroll-x', String(viewport.scrollLeft));
      surface.style.setProperty('--map-scroll-y', String(viewport.scrollTop));
    };

    update();
    viewport.addEventListener('scroll', update, { passive: true });

    return () => viewport.removeEventListener('scroll', update);
  }, [viewportRef, surfaceRef, shouldReduceMotion]);
}
