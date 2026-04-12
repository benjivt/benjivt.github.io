import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import About from '../components/About';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';
import SectionNavigator from '../components/SectionNavigator';
import { homeSections } from '../data/sections';
import { scrollToSection } from '../utils/scrollToSection';

const homeSectionComponents = {
  hero: Hero,
  about: About,
  projects: ProjectGrid,
  experience: ExperienceTimeline,
  contact: Footer,
};

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(
    location.hash.replace('#', '') || homeSections[0]?.id || ''
  );
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

  useEffect(() => {
    const elements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const visibleRatios = new Map(elements.map((element) => [element.id, 0]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.intersectionRatio);

          if (entry.target.id === 'hero') {
            setShowSectionNavigator(entry.intersectionRatio < 0.72);
          }
        });

        const activeEntry = [...visibleRatios.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((first, second) => {
            const ratioDifference = second[1] - first[1];

            if (Math.abs(ratioDifference) > 0.01) {
              return ratioDifference;
            }

            return sectionIds.indexOf(first[0]) - sectionIds.indexOf(second[0]);
          })[0];

        if (activeEntry) {
          setActiveSection(activeEntry[0]);
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
        rootMargin: '-12% 0px -12% 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <main>
      {homeSections.map((section) => {
        const SectionComponent = homeSectionComponents[section.componentKey];

        if (!SectionComponent) {
          return null;
        }

        return <SectionComponent key={section.id} sectionId={section.id} />;
      })}
      <SectionNavigator activeSection={activeSection} isVisible={showSectionNavigator} />
    </main>
  );
}
