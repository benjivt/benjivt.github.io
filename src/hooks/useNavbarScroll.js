import { useEffect, useState } from 'react';

export default function useNavbarScroll() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const hero = document.getElementById('hero');

      if (!hero) {
        setIsScrolledPastHero(window.scrollY > 80);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setIsScrolledPastHero(heroBottom <= 96);
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return isScrolledPastHero;
}
