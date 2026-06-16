import { useEffect, useRef } from 'react';

const DRAG_THRESHOLD_PX = 4;

export default function useMapDragPan(viewportRef) {
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    moved: false,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return undefined;
    }

    const isInteractiveTarget = (target) =>
      target instanceof Element &&
      Boolean(target.closest('.experience-map-node-btn, .experience-map-detail'));

    const handlePointerDown = (event) => {
      if (isInteractiveTarget(event.target)) {
        dragRef.current.moved = false;
        return;
      }

      if (event.button !== 0) {
        return;
      }

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop,
        moved: false,
      };

      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('is-dragging');
    };

    const handlePointerMove = (event) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
        return;
      }

      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;

      if (
        !dragRef.current.moved &&
        (Math.abs(dx) > DRAG_THRESHOLD_PX || Math.abs(dy) > DRAG_THRESHOLD_PX)
      ) {
        dragRef.current.moved = true;
      }

      viewport.scrollLeft = dragRef.current.scrollLeft - dx;
      viewport.scrollTop = dragRef.current.scrollTop - dy;
    };

    const endDrag = (event) => {
      if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
        return;
      }

      dragRef.current.active = false;
      dragRef.current.pointerId = null;
      viewport.releasePointerCapture(event.pointerId);
      viewport.classList.remove('is-dragging');

      window.requestAnimationFrame(() => {
        dragRef.current.moved = false;
      });
    };

    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    return () => {
      viewport.removeEventListener('pointerdown', handlePointerDown);
      viewport.removeEventListener('pointermove', handlePointerMove);
      viewport.removeEventListener('pointerup', endDrag);
      viewport.removeEventListener('pointercancel', endDrag);
      viewport.classList.remove('is-dragging');
    };
  }, [viewportRef]);

  return dragRef;
}
