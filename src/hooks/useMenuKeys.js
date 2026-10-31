import { useEffect } from 'react';
import { keyToDirection, nextIndex } from '../utils/menuNav';
import { useSound } from './useSound';

const ITEM_SELECTOR = '[data-nav-item]';

// For responsive grids: items sharing the first item's row = the current column count.
function countColumns(list) {
  if (list.length === 0) return 1;
  const top = list[0].getBoundingClientRect().top;
  return Math.max(1, list.filter((item) => Math.abs(item.getBoundingClientRect().top - top) < 4).length);
}

function isTyping(target) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

// Roving focus for a menu: arrows/WASD move focus between [data-nav-item] buttons inside
// containerRef, Enter/Space activate them natively, Escape/Backspace go back.
export default function useMenuKeys(containerRef, { columns = 1, onBack, autoFocus = true } = {}) {
  const { play } = useSound();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const items = () => Array.from(container.querySelectorAll(ITEM_SELECTOR));

    if (autoFocus && !container.contains(document.activeElement)) {
      const first = container.querySelector('[data-nav-default]') ?? items()[0];
      first?.focus({ preventScroll: true });
    }

    const handleKeyDown = (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || isTyping(event.target)) return;

      if (event.key === 'Escape' || event.key === 'Backspace') {
        if (onBack) {
          event.preventDefault();
          play('back');
          onBack();
        }
        return;
      }

      // Gamepad presses arrive as synthetic events, which don't trigger native button clicks.
      if (!event.isTrusted && (event.key === 'Enter' || event.key === ' ')) {
        if (document.activeElement instanceof HTMLElement && container.contains(document.activeElement)) {
          document.activeElement.click();
        }
        return;
      }

      const direction = keyToDirection(event.key);
      if (!direction) return;

      const list = items();
      const current = list.indexOf(document.activeElement);
      const cols = columns === 'auto' ? countColumns(list) : columns;
      const next = nextIndex(current, direction, list.length, cols);
      if (next < 0) return;
      event.preventDefault();
      if (next !== current) {
        list[next].focus();
        play('move');
      }
    };

    // Only real mouse movement moves focus; content appearing under a resting cursor shouldn't.
    let lastPointer = null;
    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      const previous = lastPointer;
      lastPointer = { x: event.clientX, y: event.clientY };
      if (!previous || (previous.x === event.clientX && previous.y === event.clientY)) return;
      const item = event.target.closest?.(ITEM_SELECTOR);
      if (item && container.contains(item) && document.activeElement !== item) {
        item.focus({ preventScroll: true });
        play('move');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, [containerRef, columns, onBack, autoFocus, play]);
}
