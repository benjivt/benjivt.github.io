import { useLocation, useNavigate } from 'react-router-dom';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => {
    if (location.pathname === '/') {
      const target = document.getElementById(sectionId);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/#${sectionId}`);
      return;
    }

    navigate(`/#${sectionId}`);
  };

  return (
    <header className="site-header">
      <nav className="glass-panel nav-shell">
        <button
          type="button"
          className="brand-mark"
          onClick={() => navigate('/')}
          aria-label="Go to homepage"
        >
          BA
        </button>
        <div className="nav-links" aria-label="Primary">
          {sections.map((section) => (
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
