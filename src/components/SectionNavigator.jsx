import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { navigatorSections } from '../data/sections';
import { navDotTransition } from '../utils/motionPresets';
import { scrollToSection } from '../utils/scrollToSection';

export default function SectionNavigator({ activeSection, isVisible }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
      return;
    }

    navigate(`/#${sectionId}`);
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <aside
      className={`section-navigator glass-panel glass-tier-1 ${isVisible ? 'is-visible' : ''}`}
      aria-label="Section navigator"
    >
      <div className="section-dot-list">
        {navigatorSections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              className={`section-dot-button ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSectionClick(section.id)}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="section-dot-label">{section.label}</span>
              <span className="section-dot" aria-hidden="true">
                {isActive ? (
                  <motion.span
                    layoutId="section-active-dot"
                    className="section-dot-active"
                    transition={navDotTransition}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </aside>,
    document.body
  );
}
