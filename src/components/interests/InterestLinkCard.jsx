import { InterestIcon } from './InterestIcons';

export default function InterestLinkCard({ interest }) {
  return (
    <a
      href={interest.href}
      target="_blank"
      rel="noreferrer"
      className="interest-link-card glass-panel glass-tier-2"
      style={{ '--interest-accent': interest.accent }}
      aria-label={`${interest.title}: ${interest.blurb}`}
    >
      <div className="interest-link-thumb">
        <img src={interest.thumbnail} alt="" loading="lazy" />
        <span className="interest-link-thumb-shade" aria-hidden="true" />
      </div>
      <div className="interest-link-body">
        <span className="interest-link-icon">
          <InterestIcon id={interest.id} />
        </span>
        <div className="interest-link-copy">
          <h3>{interest.title}</h3>
          <p>{interest.blurb}</p>
        </div>
        <span className="interest-link-cta">
          Read more
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
