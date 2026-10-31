import { sections } from '../data/sections';
import { useSound } from '../hooks/useSound';

// Plain-button route to every section: for keyboards, screen readers, and anyone who'd rather not hunt.
export default function SectionDock({ activeId, hoveredId, onHover, onSelect, expanded = false }) {
  const { play } = useSound();

  return (
    <nav className={`dock${expanded ? ' dock--expanded' : ''}`} aria-label="Sections">
      <ul className="dock-list">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={`dock-item${section.id === activeId ? ' is-active' : ''}${section.id === hoveredId ? ' is-hovered' : ''}`}
              style={{ '--accent': section.accent }}
              aria-current={section.id === activeId ? 'true' : undefined}
              onPointerEnter={() => onHover(section.id)}
              onPointerLeave={() => onHover(null)}
              onFocus={() => onHover(section.id)}
              onBlur={() => onHover(null)}
              onClick={() => {
                play('select');
                onSelect(section.id);
              }}
            >
              <span className="dock-item-label">{section.label}</span>
              {expanded && <span className="dock-item-hint">{section.hint}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
