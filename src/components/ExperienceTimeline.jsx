import { experience } from '../data/experience';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ExperienceTimeline() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="experience"
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">Experience building automation, interfaces, and intelligent systems.</h2>
      </div>
      <div className="timeline-shell">
        {experience.map((item) => (
          <article key={`${item.range}-${item.title}`} className="timeline-item glass-panel">
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
              <p className="timeline-range">{item.range}</p>
              <h3>{item.title}</h3>
              <p className="timeline-company">{item.company}</p>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
