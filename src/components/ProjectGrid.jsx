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
        <h2 className="section-title">Interactable cards ready for case studies.</h2>
        <p className="section-copy">
          Each placeholder card demonstrates a different micro-interaction, so the
          portfolio already feels productized before final content is added.
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
