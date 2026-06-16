/**
 * Regional color fields for the experience map terrain.
 * Large, overlapping zones — not per-pin blobs. Coordinates are viewBox 0–100.
 */
export const terrainRegions = [
  {
    id: 'origin-basin',
    cx: 14,
    cy: 16,
    rx: 32,
    ry: 26,
    rgb: '134, 31, 65',
    opacity: 0.11,
  },
  {
    id: 'research-range',
    cx: 32,
    cy: 32,
    rx: 28,
    ry: 24,
    rgb: '140, 110, 210',
    opacity: 0.09,
  },
  {
    id: 'industry-corridor',
    cx: 52,
    cy: 28,
    rx: 26,
    ry: 20,
    rgb: '255, 150, 90',
    opacity: 0.07,
  },
  {
    id: 'pacific-northwest',
    cx: 74,
    cy: 48,
    rx: 34,
    ry: 30,
    rgb: '84, 214, 255',
    opacity: 0.1,
  },
  {
    id: 'destination-basin',
    cx: 86,
    cy: 82,
    rx: 28,
    ry: 24,
    rgb: '178, 141, 255',
    opacity: 0.1,
  },
];

/** Static topographic guides — low contrast, no animation. */
export const terrainContours = [
  'M -6 32 C 14 26, 34 38, 54 30 S 94 34, 106 28',
  'M -6 58 C 18 52, 42 64, 64 56 S 92 62, 106 54',
  'M -6 78 C 22 72, 48 84, 72 76 S 98 82, 106 76',
];
