export const sectionDefinitions = [
  {
    id: 'hero',
    label: 'Home',
    componentKey: 'hero',
    showInNavigator: true,
    showInNavbar: true,
    scrollBlock: 'start',
  },
  {
    id: 'about',
    label: 'About',
    componentKey: 'about',
    showInNavigator: true,
    showInNavbar: true,
    scrollBlock: 'start',
  },
  {
    id: 'projects',
    label: 'Projects',
    componentKey: 'projects',
    showInNavigator: true,
    showInNavbar: true,
    scrollBlock: 'start',
  },
  {
    id: 'experience',
    label: 'Experience',
    componentKey: 'experience',
    showInNavigator: true,
    showInNavbar: true,
    scrollBlock: 'start',
  },
  {
    id: 'contact',
    label: 'Contact',
    componentKey: 'contact',
    showInNavigator: true,
    showInNavbar: true,
    scrollBlock: 'end',
  },
];

const sectionDefinitionMap = Object.fromEntries(
  sectionDefinitions.map((section) => [section.id, section])
);

export const homeSections = sectionDefinitions.filter((section) => section.componentKey);
export const navSections = sectionDefinitions.filter((section) => section.showInNavbar);
export const navigatorSections = sectionDefinitions.filter((section) => section.showInNavigator);

export function getSectionConfig(sectionId) {
  return sectionDefinitionMap[sectionId] ?? null;
}
