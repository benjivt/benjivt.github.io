import { describe, expect, it } from 'vitest';
import {
  getSectionConfig,
  homeSections,
  navSections,
  navigatorSections,
  sectionDefinitions,
} from '../../src/data/sections';
import { homeSectionComponents } from '../../src/pages/Home.jsx';

describe('sections registry', () => {
  it('uses unique section ids', () => {
    const ids = sectionDefinitions.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps contact as the only end-aligned scroll target', () => {
    const endSections = sectionDefinitions.filter((section) => section.scrollBlock === 'end');
    const startSections = sectionDefinitions.filter((section) => section.scrollBlock === 'start');

    expect(endSections).toHaveLength(1);
    expect(endSections[0].id).toBe('contact');
    expect(startSections).toHaveLength(sectionDefinitions.length - 1);
  });

  it('maps every home section component key to a React component', () => {
    const componentKeys = homeSections.map((section) => section.componentKey);

    for (const key of componentKeys) {
      expect(homeSectionComponents[key]).toBeTruthy();
    }

    expect(Object.keys(homeSectionComponents).sort()).toEqual([...new Set(componentKeys)].sort());
  });

  it('exposes navbar and navigator entries for every section', () => {
    expect(navSections.map((section) => section.id)).toEqual(
      sectionDefinitions.map((section) => section.id),
    );
    expect(navigatorSections.map((section) => section.id)).toEqual(
      sectionDefinitions.map((section) => section.id),
    );
  });

  it('returns null for unknown section ids', () => {
    expect(getSectionConfig('not-a-section')).toBeNull();
  });
});
