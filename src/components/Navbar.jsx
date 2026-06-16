import { useLocation, useNavigate } from 'react-router-dom';
import { navSections } from '../data/sections';
import useActiveSection from '../hooks/useActiveSection';
import useNavbarScroll from '../hooks/useNavbarScroll';
import { scrollToSection } from '../utils/scrollToSection';

function isHomeRoute(pathname) {
  return pathname === '/' || !pathname.startsWith('/project');
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();
  const isScrolledPastHero = useNavbarScroll();
  const onHome = isHomeRoute(location.pathname);

  const handleSectionClick = (sectionId) => {
    if (onHome) {
      scrollToSection(sectionId);
      return;
    }

    navigate(`/#${sectionId}`);
  };

  return (
    <header className={`site-header${isScrolledPastHero ? ' is-scrolled' : ''}`}>
      <nav className="glass-panel glass-tier-1 nav-shell">
        <div className="nav-links" aria-label="Primary">
          {navSections.map((section) => {
            const isActive = onHome && activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={`nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSectionClick(section.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
