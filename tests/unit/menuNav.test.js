import { describe, expect, it } from 'vitest';
import { keyToDirection, nextIndex } from '../../src/utils/menuNav';

describe('keyToDirection', () => {
  it('maps arrows and WASD', () => {
    expect(keyToDirection('ArrowUp')).toBe('up');
    expect(keyToDirection('d')).toBe('right');
    expect(keyToDirection('S')).toBe('down');
    expect(keyToDirection('Enter')).toBeNull();
  });
});

describe('nextIndex', () => {
  it('wraps a vertical list and ignores left/right', () => {
    expect(nextIndex(0, 'up', 5, 1)).toBe(4);
    expect(nextIndex(4, 'down', 5, 1)).toBe(0);
    expect(nextIndex(2, 'left', 5, 1)).toBe(2);
  });

  it('wraps a horizontal strip and ignores up/down', () => {
    expect(nextIndex(7, 'right', 8, 8)).toBe(0);
    expect(nextIndex(0, 'left', 8, 8)).toBe(7);
    expect(nextIndex(3, 'down', 8, 8)).toBe(3);
  });

  it('moves through a grid without leaving it', () => {
    // 11 items, 3 wide: rows [0-2] [3-5] [6-8] [9-10]
    expect(nextIndex(1, 'down', 11, 3)).toBe(4);
    expect(nextIndex(8, 'down', 11, 3)).toBe(8);
    expect(nextIndex(9, 'up', 11, 3)).toBe(6);
    expect(nextIndex(0, 'left', 11, 3)).toBe(0);
    expect(nextIndex(10, 'right', 11, 3)).toBe(10);
  });

  it('starts from the first item when nothing is focused', () => {
    expect(nextIndex(-1, 'down', 5, 1)).toBe(1);
    expect(nextIndex(-1, 'down', 0, 1)).toBe(-1);
  });
});
