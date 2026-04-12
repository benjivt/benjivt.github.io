import { Link } from 'react-router-dom';
import FlipCard from './interactions/FlipCard';
import PreviewCard from './interactions/PreviewCard';
import SpotlightCard from './interactions/SpotlightCard';
import Tilt3D from './interactions/Tilt3D';

function CardContent({ project }) {
  return (
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
  );
}

function FlipFront({ project }) {
  return <CardContent project={project} />;
}

function FlipBack({ project }) {
  return (
    <article className="project-card-content glass-panel project-card-back" style={{ '--card-accent': project.accent }}>
      <p className="eyebrow">Interaction</p>
      <h3>{project.title}</h3>
      <p>{project.challenge}</p>
      <div className="project-back-copy">
        <span>{project.role}</span>
        <span>Open case study</span>
      </div>
    </article>
  );
}

function ProjectInteraction({ project }) {
  const content = <CardContent project={project} />;

  if (project.interactiveType === 'tilt3d') {
    return <Tilt3D>{content}</Tilt3D>;
  }

  if (project.interactiveType === 'spotlight') {
    return <SpotlightCard>{content}</SpotlightCard>;
  }

  if (project.interactiveType === 'flip') {
    return <FlipCard front={<FlipFront project={project} />} back={<FlipBack project={project} />} />;
  }

  return <PreviewCard>{content}</PreviewCard>;
}

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      state={{ scrollY: window.scrollY, fromSection: 'projects' }}
      className="project-card-link"
      aria-label={`Open ${project.title} project details`}
    >
      <ProjectInteraction project={project} />
    </Link>
  );
}
