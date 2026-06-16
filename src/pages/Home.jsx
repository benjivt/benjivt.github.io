import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import About from '../components/About';
import ExperienceMap from '../components/ExperienceMap';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Interests from '../components/Interests';
import ProjectGrid from '../components/ProjectGrid';
import SectionNavigator from '../components/SectionNavigator';
import { homeSections } from '../data/sections';
import useActiveSection, { publishActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scrollToSection';

export const homeSectionComponents = {
  hero: Hero,
  about: About,
  projects: ProjectGrid,
  experience: ExperienceMap,
  interests: Interests,
  contact: Footer,
};

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();
  const [showSectionNavigator, setShowSectionNavigator] = useState(false);

  const sectionIds = useMemo(() => homeSections.map((section) => section.id), []);

  useEffect(() => {
    let isCancelled = false;

    const attemptSectionScroll = (sectionId, options = {}, attemptsRemaining = 20) => {
      window.setTimeout(() => {
        if (isCancelled) {
          return;
        }

        const didScroll = scrollToSection(sectionId, options);

        if (!didScroll && attemptsRemaining > 1) {
          attemptSectionScroll(sectionId, options, attemptsRemaining - 1);
        }
      }, 120);
    };

    if (typeof location.state?.scrollY === 'number') {
      window.scrollTo({ top: location.state.scrollY, behavior: 'auto' });
      navigate(location.pathname + location.hash, { replace: true, state: null });
      return () => {
        isCancelled = true;
      };
    }

    if (location.state?.fromSection === 'projects') {
      attemptSectionScroll('projects', { behavior: 'auto' });
      navigate(location.pathname + '#projects', { replace: true, state: null });
      return () => {
        isCancelled = true;
      };
    }

    if (location.hash) {
      attemptSectionScroll(location.hash.replace('#', ''), {
        behavior: 'auto',
        updateHash: false,
      });
      return () => {
        isCancelled = true;
      };
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => {
      isCancelled = true;
    };
  }, [location.hash, location.pathname, location.state, navigate]);

  // Deterministic active-section tracking: the section whose top is the
  // last one above the viewport midline wins, so short sections (Contact,
  // About) activate just as reliably as tall ones (Projects).
  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;

      const elements = sectionIds
        .map((sectionId) => document.getElementById(sectionId))
        .filter(Boolean);

      if (!elements.length) {
        return;
      }

      const scrollY = window.scrollY;
      const midline = scrollY + window.innerHeight * 0.42;
      const documentHeight = document.documentElement.scrollHeight;
      const atBottom = scrollY + window.innerHeight >= documentHeight - 8;

      let nextActive = elements[0].id;

      if (atBottom) {
        nextActive = elements[elements.length - 1].id;
      } else {
        for (const element of elements) {
          const top = element.getBoundingClientRect().top + scrollY;

          if (top <= midline) {
            nextActive = element.id;
          } else {
            break;
          }
        }
      }

      publishActiveSection(nextActive);

      const hero = document.getElementById('hero');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom + scrollY;
        setShowSectionNavigator(midline > heroBottom);
      }
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      publishActiveSection('');
    };
  }, [sectionIds]);

  return (
    <main id="main">
      {homeSections.map((section) => {
        const SectionComponent = homeSectionComponents[section.componentKey];

        if (!SectionComponent) {
          return null;
        }

        return <SectionComponent key={section.id} sectionId={section.id} />;
      })}
      <SectionNavigator
        activeSection={activeSection}
        isVisible={showSectionNavigator && activeSection !== 'experience'}
      />
    </main>
  );
}
