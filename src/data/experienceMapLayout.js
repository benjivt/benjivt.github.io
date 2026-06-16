import vtLogo from '../../info/about/vt-logo.webp';

const DEFAULT_ACCENT =
  'linear-gradient(135deg, rgba(178, 141, 255, 0.82), rgba(214, 187, 255, 0.54))';

const companyAccents = {
  'hume-center': 'linear-gradient(135deg, rgba(178, 141, 255, 0.82), rgba(120, 90, 200, 0.58))',
  microsoft: 'linear-gradient(135deg, rgba(84, 214, 255, 0.68), rgba(178, 141, 255, 0.42))',
  'virginia-tech-national-security-institute':
    'linear-gradient(135deg, rgba(198, 171, 255, 0.72), rgba(244, 114, 182, 0.4))',
  'collins-aerospace': 'linear-gradient(135deg, rgba(255, 159, 67, 0.72), rgba(255, 94, 98, 0.56))',
  'automation-creations':
    'linear-gradient(135deg, rgba(255, 209, 102, 0.7), rgba(255, 122, 162, 0.42))',
};

export const experienceMapOrigin = {
  id: 'origin',
  label: 'Virginia Tech',
  sublabel: 'Where it started',
  logo: vtLogo,
  logoScale: 1.05,
  accent: 'linear-gradient(135deg, rgba(134, 31, 65, 0.72), rgba(178, 141, 255, 0.48))',
  summary:
    'Double Hokie — B.S. and M.Eng. at Virginia Tech. Most roles trace back to research and engineering work that started here.',
};

const desktopStops = [
  { experienceId: 'hume-center-undergraduate-research-assistant', x: 24, y: 15 },
  { experienceId: 'collins-aerospace-sepp-mission-systems', x: 52, y: 22 },
  { experienceId: 'virginia-tech-national-security-institute-project-manager', x: 34, y: 33 },
  { experienceId: 'microsoft-software-for-hardware-2024', x: 72, y: 41 },
  { experienceId: 'microsoft-software-for-hardware-2025', x: 58, y: 51 },
  { experienceId: 'automation-creations-ui-design', x: 38, y: 61 },
  { experienceId: 'hume-center-graduate-research-assistant', x: 76, y: 70 },
  { experienceId: 'microsoft-software-for-hardware-full-time', x: 90, y: 82 },
];

const mobileStops = [
  { experienceId: 'hume-center-undergraduate-research-assistant', x: 22, y: 13 },
  { experienceId: 'collins-aerospace-sepp-mission-systems', x: 48, y: 21 },
  { experienceId: 'virginia-tech-national-security-institute-project-manager', x: 30, y: 31 },
  { experienceId: 'microsoft-software-for-hardware-2024', x: 68, y: 40 },
  { experienceId: 'microsoft-software-for-hardware-2025', x: 54, y: 50 },
  { experienceId: 'automation-creations-ui-design', x: 36, y: 60 },
  { experienceId: 'hume-center-graduate-research-assistant', x: 74, y: 71 },
  { experienceId: 'microsoft-software-for-hardware-full-time', x: 88, y: 86 },
];

export const experienceMapSurface = {
  desktop: {
    width: '62rem',
    height: '42rem',
  },
  mobile: {
    width: '42rem',
    height: '48rem',
  },
};

export function getExperienceMapSurface(isMobile) {
  return isMobile ? experienceMapSurface.mobile : experienceMapSurface.desktop;
}

export const experienceMapLayouts = {
  desktop: {
    origin: { x: 8, y: 8 },
    stops: desktopStops,
  },
  mobile: {
    origin: { x: 8, y: 6 },
    stops: mobileStops,
  },
};

export function getExperienceMapLayout(isMobile) {
  return isMobile ? experienceMapLayouts.mobile : experienceMapLayouts.desktop;
}

export function getExperienceAccent(companyId) {
  return companyAccents[companyId] ?? DEFAULT_ACCENT;
}

export function getExperienceMapStops(experienceItems, isMobile = false) {
  const layout = getExperienceMapLayout(isMobile);
  const byId = new Map(experienceItems.map((item) => [item.id, item]));

  const stops = layout.stops.map((stop, index) => {
    const record = byId.get(stop.experienceId);
    if (!record) {
      throw new Error(`Missing experience record for map stop "${stop.experienceId}".`);
    }

    const yearMatch = record.range.match(/\b(20\d{2})\b/g);
    const shortLabel = yearMatch?.[yearMatch.length - 1] ?? record.company.split(' ')[0];

    return {
      id: record.id,
      experienceId: stop.experienceId,
      x: stop.x,
      y: stop.y,
      order: index,
      isCurrent: index === layout.stops.length - 1,
      shortLabel,
      accent: getExperienceAccent(record.companyId),
      ...record,
    };
  });

  return {
    origin: {
      ...experienceMapOrigin,
      ...layout.origin,
    },
    stops,
  };
}

export function getMapPathPoints(origin, stops) {
  return [{ x: origin.x, y: origin.y }, ...stops.map((stop) => ({ x: stop.x, y: stop.y }))];
}
