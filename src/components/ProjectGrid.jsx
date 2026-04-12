import { projects } from '../data/projects';
import useScrollReveal from '../hooks/useScrollReveal';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="projects"
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2 className="section-title">Selected work across mixed reality, machine learning, vision, and embedded systems.</h2>
        <p className="section-copy">
          These projects reflect how I approach applied engineering problems: build a
          strong data pipeline, choose pragmatic tools, and ship something measurable,
          interactive, or useful.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
