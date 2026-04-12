import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2 className="section-title">Premium framing first, content second.</h2>
      </div>
      <div className="glass-panel prose-panel">
        <p className="section-copy">
          The site is intentionally designed as a system before it becomes a resume.
          Each section is ready for refined content, while the visual language already
          communicates clarity, ambition, and technical polish.
        </p>
        <p className="section-copy">
          The result is a framework you can keep evolving: a cinematic landing
          experience, interactive project cards, and dedicated case study routes that
          make future additions feel native rather than bolted on.
        </p>
      </div>
    </section>
  );
}
