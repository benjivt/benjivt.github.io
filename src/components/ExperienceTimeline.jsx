import { experience } from '../data/experience';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ExperienceTimeline({ sectionId = 'experience', items = experience }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={sectionId}
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">Experience building automation, interfaces, and intelligent systems.</h2>
      </div>
      <div className="timeline-shell">
        {items.map((item) => (
          <article key={item.id} className="timeline-item glass-panel">
            <div className="timeline-logo-shell">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={`${item.company} logo`}
                  className="timeline-logo"
                  style={{ transform: `scale(${item.logoScale ?? 1})` }}
                />
              ) : null}
            </div>
            <div className="timeline-copy">
              <h3>{item.title}</h3>
              <div className="timeline-meta">
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-range">{item.range}</p>
              </div>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
