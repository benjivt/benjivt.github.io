import { getSectionConfig } from '../data/sections';
import { publishActiveSection } from '../hooks/useActiveSection';

function getSectionScrollGap() {
  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.paddingTop = 'var(--section-scroll-gap)';
  document.documentElement.appendChild(probe);
  const gap = parseFloat(getComputedStyle(probe).paddingTop) || 20;
  probe.remove();
  return gap;
}

export function scrollToSection(sectionId, options = {}) {
  const { behavior = 'smooth', updateHash = true } = options;
  const target = document.getElementById(sectionId);
  const sectionConfig = getSectionConfig(sectionId);
  const headerHeight =
    document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
  const sectionScrollGap = getSectionScrollGap();

  if (!target) {
    return false;
  }

  publishActiveSection(sectionId);

  const rect = target.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const absoluteBottom = rect.bottom + window.scrollY;
  const scrollTop =
    sectionConfig?.scrollBlock === 'end'
      ? Math.max(absoluteBottom - window.innerHeight + sectionScrollGap, 0)
      : Math.max(absoluteTop - headerHeight - sectionScrollGap, 0);

  window.scrollTo({
    top: scrollTop,
    behavior,
  });

  if (updateHash) {
    window.history.replaceState(null, '', `/#${sectionId}`);
  }

  return true;
}
