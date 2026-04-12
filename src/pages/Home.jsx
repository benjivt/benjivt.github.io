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
  const [showSectionNavigator, setShowSectionNavigator] = useState(false);

  const sectionIds = useMemo(() => homeSections.map((section) => section.id), []);

  useEffect(() => {
    if (typeof location.state?.scrollY === 'number') {
      window.scrollTo({ top: location.state.scrollY, behavior: 'auto' });
      navigate(location.pathname + location.hash, { replace: true, state: null });
      return;
    }

    if (location.state?.fromSection === 'projects') {
      const target = document.getElementById('projects');
      target?.scrollIntoView({ behavior: 'auto', block: 'start' });
      navigate(location.pathname + '#projects', { replace: true, state: null });
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
    const hero = document.getElementById('hero');
    if (!hero) {
      return undefined;
    }

    const updateNavigatorVisibility = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      setShowSectionNavigator(heroBottom < window.innerHeight * 0.72);
    };

    updateNavigatorVisibility();
    window.addEventListener('scroll', updateNavigatorVisibility, { passive: true });
    window.addEventListener('resize', updateNavigatorVisibility);

    return () => {
      window.removeEventListener('scroll', updateNavigatorVisibility);
      window.removeEventListener('resize', updateNavigatorVisibility);
    };
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 32;

      if (isNearBottom) {
        setActiveSection('contact');
        return;
      }

      const viewportMidpoint = window.innerHeight * 0.5;

      const containingSection = elements.find((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= viewportMidpoint && rect.bottom >= viewportMidpoint;
      });

      if (containingSection) {
        setActiveSection(containingSection.id);
        return;
      }

      const passedSections = elements.filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= viewportMidpoint;
      });

      if (passedSections.length) {
        setActiveSection(passedSections[passedSections.length - 1].id);
        return;
      }

      setActiveSection(elements[0].id);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIds]);

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
