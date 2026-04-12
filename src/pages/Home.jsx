import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import About from '../components/About';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof location.state?.scrollY === 'number') {
      window.scrollTo({ top: location.state.scrollY, behavior: 'auto' });
      navigate(location.pathname + location.hash, { replace: true, state: null });
      return;
    }

    if (location.hash) {
      const target = document.querySelector(location.hash);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.hash, location.pathname, location.state, navigate]);

  return (
    <main>
      <Hero />
      <About />
      <ProjectGrid />
      <ExperienceTimeline />
    </main>
  );
}
