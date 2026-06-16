import { useEffect, useState } from 'react';

export default function useHoverCapable() {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return canHover;
}
