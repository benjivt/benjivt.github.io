import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getProjectBySlug, projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!project) {
    return (
      <main className="project-detail-shell section-shell">
        <div className="glass-panel detail-panel missing-panel">
          <p className="eyebrow">Not Found</p>
          <h1 className="section-title">This project slot is waiting to be defined.</h1>
          <button type="button" className="button-secondary" onClick={() => navigate('/')}>
            Return home
          </button>
        </div>
      </main>
    );
  }

  const relatedProjects = projects.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <main className="project-detail-shell section-shell">
      <div className="detail-hero glass-panel" style={{ '--card-accent': project.accent }}>
        <div className="detail-topline">
          <button
            type="button"
            className="button-secondary back-button"
            onClick={() => navigate('/', { state: { scrollY: location.state?.scrollY ?? 0 } })}
          >
            Back to projects
          </button>
          <span className="detail-year">{project.year}</span>
        </div>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="detail-summary">{project.summary}</p>
        <div className="detail-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <section className="detail-grid">
        <article className="glass-panel detail-panel">
          <p className="eyebrow">Challenge</p>
          <h2 className="detail-heading">A placeholder for the problem to solve.</h2>
          <p>{project.challenge}</p>
        </article>
        <article className="glass-panel detail-panel">
          <p className="eyebrow">Outcome</p>
          <h2 className="detail-heading">A flexible slot for proof and impact.</h2>
          <p>{project.outcome}</p>
        </article>
      </section>

      <section className="glass-panel detail-panel detail-layout">
        <div>
          <p className="eyebrow">Case Study Layout</p>
          <h2 className="detail-heading">Ready for visuals, process, and measurable results.</h2>
        </div>
        <div className="detail-columns">
          <div>
            <h3>Recommended sections</h3>
            <ul className="detail-list">
              <li>Context and project goal</li>
              <li>Your role and ownership</li>
              <li>Constraints and tradeoffs</li>
              <li>Execution snapshots or prototypes</li>
              <li>Results, metrics, or outcomes</li>
            </ul>
          </div>
          <div>
            <h3>Media placeholders</h3>
            <div className="detail-media">
              <span className="detail-media-large" />
              <span className="detail-media-small" />
              <span className="detail-media-small" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell related-shell">
        <div className="section-heading">
          <p className="eyebrow">More Projects</p>
          <h2 className="section-title">The framework also supports connected case studies.</h2>
        </div>
        <div className="related-grid">
          {relatedProjects.map((item) => (
            <button
              key={item.slug}
              type="button"
              className="glass-panel related-card"
              onClick={() => navigate(`/project/${item.slug}`, { state: { scrollY: location.state?.scrollY ?? 0 } })}
            >
              <span>{item.category}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
