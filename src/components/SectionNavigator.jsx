import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { navigatorSections } from '../data/sections';
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
      className={`section-navigator glass-panel ${isVisible ? 'is-visible' : ''}`}
      aria-label="Section navigator"
      style={{
        position: 'fixed',
        top: '50%',
        right: '1.25rem',
        left: 'auto',
        bottom: 'auto',
      }}
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
            >
              <span className="section-dot-label">{section.label}</span>
              <span className="section-dot" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </aside>,
    document.body
  );
}
