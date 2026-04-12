import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import About from '../components/About';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';
import SectionNavigator from '../components/SectionNavigator';
import { homeSections } from '../data/sections';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(location.hash.replace('#', '') || '');
  const [showSectionNavigator, setShowSectionNavigator] = useState(Boolean(location.hash));

  const sectionIds = useMemo(() => homeSections.map((section) => section.id), []);

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

  useEffect(() => {
    const elements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);

        if (!visibleEntries.length) {
          return;
        }

        const nextSection = visibleEntries[0].target.id;
        setActiveSection(nextSection);
        setShowSectionNavigator(true);
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.65],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setShowSectionNavigator(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <ProjectGrid />
      <ExperienceTimeline />
      <SectionNavigator activeSection={activeSection} isVisible={showSectionNavigator} />
    </main>
  );
}
