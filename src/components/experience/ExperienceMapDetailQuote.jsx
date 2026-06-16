import { motion } from 'framer-motion';
import { experienceQuoteVariants } from '../../utils/motionPresets';

function QuoteChevron({ isOpen }) {
  return (
    <svg
      className={`experience-map-detail-quote-chevron${isOpen ? ' is-open' : ''}`}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
      />
    </svg>
  );
}

export default function ExperienceMapDetailQuote({ quote, detailId, expanded, onExpandedChange }) {
  const panelId = `${detailId}-quote-panel`;

  return (
    <motion.div className="experience-map-detail-quote-wrap" variants={experienceQuoteVariants}>
      <button
        type="button"
        className="experience-map-detail-quote-toggle"
        onClick={() => onExpandedChange(!expanded)}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <span className="experience-map-detail-quote-toggle-label">Words from a mentor</span>
        <QuoteChevron isOpen={expanded} />
      </button>

      {expanded ? (
        <figure id={panelId} className="experience-map-detail-quote-panel">
          <blockquote cite="https://www.linkedin.com/in/asanam">
            <p>{quote.text}</p>
          </blockquote>
          <figcaption className="experience-map-detail-quote-attribution">
            <img
              src={quote.image}
              alt={quote.imageAlt ?? quote.author}
              className="experience-map-detail-quote-avatar"
              width={36}
              height={36}
              loading="lazy"
            />
            <span className="experience-map-detail-quote-author">
              <strong>{quote.author}</strong>
              {quote.role ? <span>{quote.role}</span> : null}
            </span>
          </figcaption>
        </figure>
      ) : null}
    </motion.div>
  );
}
