const POPUP_GAP = 12;
const MAP_PADDING = 16;

export function clampPopupPosition({
  anchorElement,
  surfaceElement,
  popupWidth,
  popupHeight,
}) {
  if (!anchorElement || !surfaceElement) {
    return null;
  }

  const surfaceWidth = surfaceElement.clientWidth;
  const surfaceHeight = surfaceElement.clientHeight;
  const node = anchorElement.closest('.experience-map-node') ?? anchorElement;

  const centerX = node.offsetLeft + node.offsetWidth / 2;
  const centerY = node.offsetTop + node.offsetHeight / 2;
  const nodeHalf = node.offsetHeight / 2;

  let left = centerX - popupWidth / 2;
  let top = centerY - nodeHalf - popupHeight - POPUP_GAP;

  const spaceAbove = centerY - nodeHalf - MAP_PADDING;
  const spaceBelow = surfaceHeight - (centerY + nodeHalf) - MAP_PADDING;

  if (top < MAP_PADDING && spaceBelow >= spaceAbove) {
    top = centerY + nodeHalf + POPUP_GAP;
  }

  left = Math.min(
    surfaceWidth - popupWidth - MAP_PADDING,
    Math.max(MAP_PADDING, left)
  );
  top = Math.min(
    surfaceHeight - popupHeight - MAP_PADDING,
    Math.max(MAP_PADDING, top)
  );

  return {
    left,
    top,
    placement: top + popupHeight < centerY ? 'above' : 'below',
  };
}

export function ensureVisibleInMap(viewport, elements, padding = 20) {
  if (!viewport) {
    return;
  }

  const vp = viewport.getBoundingClientRect();
  let dx = 0;
  let dy = 0;

  elements.forEach((element) => {
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();

    if (rect.left < vp.left + padding) {
      dx = Math.min(dx, rect.left - vp.left - padding);
    }

    if (rect.right > vp.right - padding) {
      dx = Math.max(dx, rect.right - vp.right + padding);
    }

    if (rect.top < vp.top + padding) {
      dy = Math.min(dy, rect.top - vp.top - padding);
    }

    if (rect.bottom > vp.bottom - padding) {
      dy = Math.max(dy, rect.bottom - vp.bottom + padding);
    }
  });

  if (dx || dy) {
    viewport.scrollBy({ left: dx, top: dy, behavior: 'smooth' });
  }
}
