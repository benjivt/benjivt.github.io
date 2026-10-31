import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { groups } from '../data/projects';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';
import { useSurface } from '../components/Surface';

const projects = groups.flatMap((group) => group.projects.map((project) => ({ ...project, group })));
const filters = [{ id: 'all', name: 'All projects' }, ...groups];

// Projects open inside the Quest 3 on the desk; the no-WebGL fallback gets the room-card version.
export default function Projects(props) {
  return useSurface() === 'vr' ? <ProjectsInHeadset {...props} /> : <ProjectsCard {...props} />;
}

// Inside the headset: a Horizon-style app window with a filter rail, the selected build up front,
// and a grid of the rest.
function ProjectsInHeadset({ onBack }) {
  const gridRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [activeId, setActiveId] = useState(projects[0].id);
  useMenuKeys(gridRef, { columns: 'auto', onBack, autoFocus: false });

  const shown = filter === 'all' ? projects : projects.filter((item) => item.group.id === filter);
  const project = shown.find((item) => item.id === activeId) ?? shown[0];

  return (
    <section className="vr-app" aria-label="Projects">
      <ScreenHeader sectionId="projects" onBack={onBack}>
        {projects.length} projects
      </ScreenHeader>

      <div className="vr-app-body">
        <nav className="vr-nav" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className="vr-nav-item"
              aria-pressed={item.id === filter}
              onClick={() => setFilter(item.id)}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="vr-main">
          <AnimatePresence mode="wait">
            <motion.article
              key={project.id}
              className="vr-detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-live="polite"
            >
              <img className="vr-detail-art" src={project.image} alt={`${project.name} preview`} />
              <div className="vr-detail-info">
                <span className="vr-kicker">
                  {project.group.name} · {project.year}
                </span>
                <h2 className="vr-detail-title">{project.name}</h2>
                <p className="vr-detail-text">{project.summary}</p>
                <ul className="vr-notes">
                  {project.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
                <ul className="vr-chips">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="vr-button" href={project.report} target="_blank" rel="noreferrer">
                  Open the report
                </a>
              </div>
            </motion.article>
          </AnimatePresence>

          <ul ref={gridRef} className="vr-grid" aria-label="Projects">
            {shown.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="vr-tile"
                  data-nav-item
                  aria-pressed={item.id === project.id}
                  onFocus={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                >
                  <img src={item.image} alt="" />
                  <span className="vr-tile-name">{item.name}</span>
                  <span className="vr-tile-sub">{item.year}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Fallback (no WebGL): the selected build up close, then every build grouped by area.
function ProjectsCard({ onBack }) {
  const listRef = useRef(null);
  const [activeId, setActiveId] = useState(projects[0].id);
  useMenuKeys(listRef, { onBack, autoFocus: false });

  const project = projects.find((item) => item.id === activeId) ?? projects[0];

  return (
    <section className="ui-screen projects" aria-label="Projects">
      <ScreenHeader sectionId="projects" onBack={onBack}>
        {projects.length} projects
      </ScreenHeader>

      <div className="ui-body">
        <AnimatePresence mode="wait">
          <motion.article
            key={project.id}
            className="project-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-live="polite"
          >
            <span className="ui-frame project-hero">
              <img src={project.image} alt={`${project.name} preview`} />
            </span>
            <span className="ui-tag">
              {project.group.name} · {project.year}
            </span>
            <h2 className="ui-h2">{project.name}</h2>
            <p className="ui-text">{project.summary}</p>
            <h3 className="ui-label">What I built</h3>
            <ul className="ui-bullets">
              {project.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <ul className="ui-chips">
              {project.stack.map((item) => (
                <li key={item} className="ui-chip">
                  {item}
                </li>
              ))}
            </ul>
            <a className="ui-button" href={project.report} target="_blank" rel="noreferrer">
              Read the report (PDF)
            </a>
          </motion.article>
        </AnimatePresence>

        <div ref={listRef} className="project-groups">
          {groups.map((group) => (
            <div key={group.id} className="project-group">
              <h3 className="ui-label">{group.blurb}</h3>
              <ul className="ui-rows">
                {group.projects.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="ui-row"
                      data-nav-item
                      aria-pressed={item.id === project.id}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => setActiveId(item.id)}
                    >
                      <img src={item.image} alt="" className="ui-row-art" />
                      <span className="ui-row-text">
                        <span className="ui-row-title">{item.name}</span>
                        <span className="ui-row-sub">{item.year}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
