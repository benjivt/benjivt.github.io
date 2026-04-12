import useScrollReveal from '../hooks/useScrollReveal';

const interestAreas = [
  'CV',
  'Machine Learning',
  'Embedded Software Systems',
  'Robotics',
  'Mixed Reality',
];

const hobbies = ['E-skating', 'Hiking', 'Kayaking', 'Fitness', 'Ping-Pong', 'Basketball', 'Soccer'];

export default function Interests({ sectionId = 'interests' }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={sectionId}
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">Interests &amp; Hobbies</p>
        <h2 className="section-title">What keeps me curious outside of classes, internships, and projects.</h2>
        <p className="section-copy">
          The resumes consistently point back to a few recurring themes: building intelligent
          systems, staying close to embedded and robotics work, and keeping a strong mix of
          technical curiosity and active hobbies.
        </p>
      </div>
      <div className="interest-grid">
        <article className="glass-panel interest-card">
          <p className="eyebrow">Interests</p>
          <div className="interest-tags">
            {interestAreas.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
        <article className="glass-panel interest-card">
          <p className="eyebrow">Hobbies</p>
          <div className="interest-tags">
            {hobbies.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
