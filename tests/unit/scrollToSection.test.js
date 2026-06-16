import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { scrollToSection } from '../../src/utils/scrollToSection';

function mockRect(element, { top, height }) {
  const bottom = top + height;
  element.getBoundingClientRect = () => ({
    top,
    bottom,
    left: 0,
    right: 100,
    width: 100,
    height,
    x: 0,
    y: top,
  });
}

describe('scrollToSection', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header class="site-header"></header>
      <section id="projects"></section>
      <section id="contact"></section>
    `;

    const header = document.querySelector('.site-header');
    mockRect(header, { top: 0, height: 64 });

    window.scrollY = 200;
    window.innerHeight = 900;

    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when the section id is missing', () => {
    expect(scrollToSection('missing-section')).toBe(false);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('scrolls with start block and header offset for standard sections', () => {
    const target = document.getElementById('projects');
    mockRect(target, { top: 400, height: 800 });

    expect(scrollToSection('projects', { updateHash: false })).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 516,
      behavior: 'smooth',
    });
  });

  it('scrolls with end block for contact', () => {
    const target = document.getElementById('contact');
    mockRect(target, { top: 1200, height: 400 });

    expect(scrollToSection('contact', { updateHash: false })).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 920,
      behavior: 'smooth',
    });
  });

  it('updates the hash by default', () => {
    const target = document.getElementById('projects');
    mockRect(target, { top: 100, height: 600 });

    scrollToSection('projects');

    expect(window.history.replaceState).toHaveBeenCalledWith(null, '', '/#projects');
  });

  it('skips hash update when updateHash is false', () => {
    const target = document.getElementById('projects');
    mockRect(target, { top: 100, height: 600 });

    scrollToSection('projects', { updateHash: false });

    expect(window.history.replaceState).not.toHaveBeenCalled();
  });

  it('respects a custom scroll behavior', () => {
    const target = document.getElementById('projects');
    mockRect(target, { top: 100, height: 600 });

    scrollToSection('projects', { behavior: 'auto', updateHash: false });

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'auto' }),
    );
  });
});
