const KEY_DIRECTIONS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
};

export function keyToDirection(key) {
  return KEY_DIRECTIONS[key] ?? KEY_DIRECTIONS[key?.toLowerCase?.()] ?? null;
}

// Next focus index in a grid of `count` items laid out `columns` wide.
// columns === 1 is a vertical list (wraps); columns >= count is a horizontal strip (wraps).
export function nextIndex(current, direction, count, columns = 1) {
  if (count <= 0) return -1;
  const from = current < 0 ? 0 : Math.min(current, count - 1);
  const cols = Math.max(1, Math.min(columns, count));

  if (cols === 1) {
    if (direction === 'up') return (from - 1 + count) % count;
    if (direction === 'down') return (from + 1) % count;
    return from;
  }

  if (cols === count) {
    if (direction === 'left') return (from - 1 + count) % count;
    if (direction === 'right') return (from + 1) % count;
    return from;
  }

  if (direction === 'left') return Math.max(0, from - 1);
  if (direction === 'right') return Math.min(count - 1, from + 1);
  if (direction === 'up') return from - cols >= 0 ? from - cols : from;
  if (direction === 'down') return from + cols < count ? from + cols : from;
  return from;
}
