import { describe, expect, it } from 'vitest';
import { clampPopupPosition } from '../../src/components/experience/clampPopupPosition';

function createNode({ left, top, width = 40, height = 40 }) {
  return {
    offsetLeft: left,
    offsetTop: top,
    offsetWidth: width,
    offsetHeight: height,
    closest: () => null,
  };
}

function createAnchor(node) {
  return {
    closest: (selector) => (selector === '.experience-map-node' ? node : null),
  };
}

describe('clampPopupPosition', () => {
  const surface = { clientWidth: 400, clientHeight: 300 };
  const popupWidth = 200;
  const popupHeight = 120;

  it('returns null when anchor or surface is missing', () => {
    expect(
      clampPopupPosition({
        anchorElement: null,
        surfaceElement: surface,
        popupWidth,
        popupHeight,
      }),
    ).toBeNull();

    expect(
      clampPopupPosition({
        anchorElement: createAnchor(createNode({ left: 50, top: 100 })),
        surfaceElement: null,
        popupWidth,
        popupHeight,
      }),
    ).toBeNull();
  });

  it('centers horizontally above the node when space allows', () => {
    const node = createNode({ left: 180, top: 160, width: 40, height: 40 });
    const result = clampPopupPosition({
      anchorElement: createAnchor(node),
      surfaceElement: surface,
      popupWidth,
      popupHeight,
    });

    expect(result).toEqual({
      left: 100,
      top: 28,
      placement: 'above',
    });
  });

  it('clamps left edge inside map padding', () => {
    const node = createNode({ left: 10, top: 160 });
    const result = clampPopupPosition({
      anchorElement: createAnchor(node),
      surfaceElement: surface,
      popupWidth,
      popupHeight,
    });

    expect(result.left).toBe(16);
  });

  it('clamps right edge inside map padding', () => {
    const node = createNode({ left: 360, top: 160 });
    const result = clampPopupPosition({
      anchorElement: createAnchor(node),
      surfaceElement: surface,
      popupWidth,
      popupHeight,
    });

    expect(result.left).toBe(184);
  });

  it('places popup below when there is more space below than above', () => {
    const node = createNode({ left: 180, top: 20 });
    const result = clampPopupPosition({
      anchorElement: createAnchor(node),
      surfaceElement: surface,
      popupWidth,
      popupHeight,
    });

    expect(result.placement).toBe('below');
    expect(result.top).toBeGreaterThan(node.offsetTop);
  });
});
