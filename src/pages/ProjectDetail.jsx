import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getProjectBySlug, projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = getProjectBySlug(slug);
  const returnState = {
    scrollY: location.state?.scrollY,
    fromSection: location.state?.fromSection ?? 'projects',
  };

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
  const overviewCards = [
    project.challenge
      ? {
          eyebrow: 'Challenge',
          title: 'What needed to be solved.',
          body: project.challenge,
        }
      : null,
    project.outcome
      ? {
          eyebrow: 'Outcome',
          title: 'What shipped, improved, or was learned.',
          body: project.outcome,
        }
      : null,
  ].filter(Boolean);
  const detailSections = project.detailSections ?? [];

  return (
    <main className="project-detail-shell section-shell">
      <div className="detail-hero glass-panel" style={{ '--card-accent': project.accent }}>
        <div className="detail-topline">
          <button
            type="button"
            className="button-secondary back-button"
            onClick={() =>
              navigate('/#projects', {
                state: returnState,
              })
            }
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
        {project.thumbnail ? (
          <div className="detail-preview">
            <img
              src={project.thumbnail}
              alt={`${project.title} project preview`}
              className="detail-preview-image"
            />
          </div>
        ) : null}
      </div>

      {overviewCards.length > 0 && (
        <section className="detail-grid">
          {overviewCards.map((card) => (
            <article key={card.eyebrow} className="glass-panel detail-panel">
              <p className="eyebrow">{card.eyebrow}</p>
              <h2 className="detail-heading">{card.title}</h2>
              <p>{card.body}</p>
            </article>
          ))}
        </section>
      )}

      {detailSections.length > 0 && (
        <section className="detail-grid detail-section-grid">
          {detailSections.map((section) => (
            <article key={section.title} className="glass-panel detail-panel">
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              <h2 className="detail-heading">{section.title}</h2>
              {section.body ? <p>{section.body}</p> : null}
              {section.bullets?.length ? (
                <ul className="detail-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>
      )}

      <section className="section-shell related-shell">
        <div className="section-heading">
          <p className="eyebrow">More Projects</p>
          <h2 className="section-title">Explore more of my work.</h2>
        </div>
        <div className="related-grid">
          {relatedProjects.map((item) => (
            <button
              key={item.slug}
              type="button"
              className="glass-panel related-card"
              onClick={() =>
                navigate(`/project/${item.slug}`, {
                  state: returnState,
                })
              }
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
