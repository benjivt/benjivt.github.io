import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      state={{ scrollY: window.scrollY, fromSection: 'projects' }}
      className="project-card-link"
      aria-label={`Open ${project.title} project details`}
    >
      <article className="project-card-content glass-panel" style={{ '--card-accent': project.accent }}>
        <div className="project-card-top">
          <p className="project-meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </p>
          <div className="project-display">
            <div className="display-window">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={`${project.title} thumbnail`}
                  className="project-thumbnail"
                />
              ) : (
                <>
                  <div className="display-toolbar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="display-bars">
                    <span />
                    <span />
                    <span />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="project-card-bottom">
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="project-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
