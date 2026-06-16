const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function InterestIcon({ id }) {
  switch (id) {
    case 'computer-vision':
      return (
        <svg {...iconProps}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'machine-learning':
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8.2 7.8 10.8 16M15.8 7.8 13.2 16M8.5 6h7" />
        </svg>
      );
    case 'embedded-systems':
      return (
        <svg {...iconProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9zM2 9v6M22 9v6M9 2h6M9 22h6" />
        </svg>
      );
    case 'robotics':
      return (
        <svg {...iconProps}>
          <rect x="5" y="8" width="14" height="10" rx="2" />
          <path d="M9 8V5h6v3M12 18v3M8 13h.01M16 13h.01M8 21h8" />
        </svg>
      );
    case 'mixed-reality':
      return (
        <svg {...iconProps}>
          <path d="M4 10a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1.5l-1.2 2.4a1 1 0 0 1-.9.6H9.6a1 1 0 0 1-.9-.6L7.5 16H6a2 2 0 0 1-2-2v-4Z" />
          <path d="M8 14h8" />
        </svg>
      );
    case 'game-design':
      return (
        <svg {...iconProps}>
          <path d="M6 11h4v4H6zM14 10h.01M17 13h.01M8.5 13h.5" />
          <path d="M2 12a10 10 0 0 1 20 0 4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path d="M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
        </svg>
      );
  }
}

export function HobbyIcon({ id }) {
  switch (id) {
    case 'eskating':
      return (
        <svg {...iconProps}>
          <path d="M4 17h16M7 17l2-8h6l2 8M9 9l1.5-3h3L15 9" />
          <circle cx="8" cy="17" r="2" />
          <circle cx="16" cy="17" r="2" />
        </svg>
      );
    case 'hiking':
      return (
        <svg {...iconProps}>
          <path d="m8 21 4-9 4 9M6 14h12M12 3v2M9 6l3-3 3 3" />
        </svg>
      );
    case 'kayaking':
      return (
        <svg {...iconProps}>
          <path d="M3 15c3-2 6-2 9 0s6 2 9 0M6 12l6-7 6 7M12 5v14" />
        </svg>
      );
    case 'fitness':
      return (
        <svg {...iconProps}>
          <path d="M6 7v10M18 7v10M6 12h12M4 9h4M16 9h4M4 15h4M16 15h4" />
        </svg>
      );
    case 'ping-pong':
      return (
        <svg {...iconProps}>
          <circle cx="8" cy="8" r="4" />
          <path d="M11 11 20 20M16 16l2 2" />
        </svg>
      );
    case 'basketball':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M5.5 5.5c3 3 10 3 13 0M5.5 18.5c3-3 10-3 13 0M12 3v18M3 12h18" />
        </svg>
      );
    case 'soccer':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3 8.5 8.5 12 12l3.5-3.5L12 3ZM8.5 15.5 12 21l3.5-5.5-3.5-3.5-3.5 3.5Z" />
        </svg>
      );
    case 'karting':
      return (
        <svg {...iconProps}>
          <path d="M3 15h18M5 15l2-5h10l2 5M7 10h10" />
          <circle cx="7" cy="15" r="2" />
          <circle cx="17" cy="15" r="2" />
        </svg>
      );
    case 'running':
      return (
        <svg {...iconProps}>
          <circle cx="14" cy="5" r="2" />
          <path d="M11 22 9 14l-3 2 1-3 5-2 2 5 4-1-1 7" />
        </svg>
      );
    case 'music':
      return (
        <svg {...iconProps}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'anime':
      return (
        <svg {...iconProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 19h10M9 9h6M9 13h4" />
          <path d="M16 8l2-1v6l-2-1" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path d="M12 3v18M3 12h18" />
        </svg>
      );
  }
}
