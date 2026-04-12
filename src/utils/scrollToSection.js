import { getSectionConfig } from '../data/sections';

export function scrollToSection(sectionId, options = {}) {
  const { behavior = 'smooth', updateHash = true } = options;
  const target = document.getElementById(sectionId);
  const sectionConfig = getSectionConfig(sectionId);
  const headerHeight =
    document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
  const viewportPadding = 24;

  if (!target) {
    return false;
  }

  const rect = target.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const absoluteBottom = rect.bottom + window.scrollY;
  const scrollTop =
    sectionConfig?.scrollBlock === 'end'
      ? Math.max(absoluteBottom - window.innerHeight + viewportPadding, 0)
      : Math.max(absoluteTop - headerHeight - viewportPadding, 0);

  window.scrollTo({
    top: scrollTop,
    behavior,
  });

  if (updateHash) {
    window.history.replaceState(null, '', `/#${sectionId}`);
  }

  return true;
}
