import { projectSummaries } from '../data/projectSummaries';
import useScrollReveal from '../hooks/useScrollReveal';
import ProjectOrbit from './ProjectOrbit';

export default function ProjectGrid({ sectionId = 'projects', projects = projectSummaries }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={sectionId}
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2 className="section-title">Selected work.</h2>
      </div>
      <ProjectOrbit projects={projects} />
    </section>
  );
}
