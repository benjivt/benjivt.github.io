const STOP_WORDS = new Set(['a', 'an', 'at', 'for', 'in', 'of', 'the', 'to', 'and', 'is']);

export function getTimelineInitials(title) {
  const words = title
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean);

  const significant = words.filter((word) => !STOP_WORDS.has(word.toLowerCase()));
  const source = significant.length >= 2 ? significant : words;

  if (source.length === 0) {
    return '??';
  }

  if (source.length === 1) {
    return source[0].slice(0, 2).toUpperCase();
  }

  return `${source[0][0]}${source[source.length - 1][0]}`.toUpperCase();
}

export default function AboutTimelineThumb({ image, imageAlt, title, variant, scale = 1 }) {
  if (image) {
    const isLogo = variant === 'logo';
    const isPhoto = variant === 'photo';

    return (
      <img
        src={image}
        alt={imageAlt || title}
        className={`about-history-thumb-image${isLogo ? ' is-logo' : ''}${isPhoto ? ' is-photo' : ''}`}
        style={isLogo && scale !== 1 ? { transform: `scale(${scale})` } : undefined}
        loading="lazy"
      />
    );
  }

  return (
    <span className="about-history-thumb-placeholder" aria-hidden="true">
      <span className="about-history-thumb-initials">{getTimelineInitials(title)}</span>
    </span>
  );
}
