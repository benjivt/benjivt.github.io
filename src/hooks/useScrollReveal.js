import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const threshold = options?.threshold ?? 0.18;
  const rootMargin = options?.rootMargin ?? '0px 0px -10% 0px';

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, isVisible };
}
