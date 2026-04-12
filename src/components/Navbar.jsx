import { useLocation, useNavigate } from 'react-router-dom';
import { navSections } from '../data/sections';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => {
    if (location.pathname === '/') {
      const target = document.getElementById(sectionId);
      target?.scrollIntoView({
        behavior: 'smooth',
        block: sectionId === 'contact' ? 'end' : 'start',
      });
      window.history.replaceState(null, '', `/#${sectionId}`);
      return;
    }

    navigate(`/#${sectionId}`);
  };

  return (
    <header className="site-header">
      <nav className="glass-panel nav-shell">
        <div className="nav-links" aria-label="Primary">
          {navSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="nav-link"
              onClick={() => handleSectionClick(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
