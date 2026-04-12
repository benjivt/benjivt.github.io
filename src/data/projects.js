export const projects = [
  {
    slug: 'signal-os',
    title: 'Signal OS',
    category: 'Product Design System',
    year: '2026',
    summary:
      'A concept platform for orchestrating dashboards, services, and automation from a single elegant interface.',
    role: 'Framework placeholder',
    interactiveType: 'tilt3d',
    accent: 'linear-gradient(135deg, rgba(41, 151, 255, 0.82), rgba(129, 90, 255, 0.52))',
    stack: ['React', 'APIs', 'Design Systems'],
    challenge:
      'How do you make a dense technical product feel premium, fast, and effortless?',
    outcome:
      'The future content slot is structured for hero media, problem framing, and measurable outcomes.',
  },
  {
    slug: 'glass-grid',
    title: 'Glass Grid',
    category: 'Interactive Portfolio Module',
    year: '2026',
    summary:
      'A modular project showcase built around motion, depth, and fluid transitions between list and detail views.',
    role: 'Framework placeholder',
    interactiveType: 'spotlight',
    accent: 'linear-gradient(135deg, rgba(92, 201, 255, 0.7), rgba(244, 114, 182, 0.48))',
    stack: ['Motion', 'UI Engineering', 'Routing'],
    challenge:
      'How do project cards feel alive before real case study content is available?',
    outcome:
      'This scaffold supports rich previews, hover behavior, and reusable project detail templates.',
  },
  {
    slug: 'altitude',
    title: 'Altitude',
    category: 'Operations Experience',
    year: '2025',
    summary:
      'A concept workspace for tracking team health, launches, and delivery signals in one streamlined view.',
    role: 'Framework placeholder',
    interactiveType: 'flip',
    accent: 'linear-gradient(135deg, rgba(255, 159, 67, 0.72), rgba(255, 94, 98, 0.56))',
    stack: ['Strategy', 'Dashboards', 'Workflow'],
    challenge:
      'How do you communicate complex operations work with clean storytelling and low cognitive load?',
    outcome:
      'The structure allows narrative sections for context, approach, systems thinking, and results.',
  },
  {
    slug: 'lumen-lab',
    title: 'Lumen Lab',
    category: 'Creative Technology',
    year: '2025',
    summary:
      'A motion-forward concept brand where each interaction hints at a playable demo, video, or prototype.',
    role: 'Framework placeholder',
    interactiveType: 'preview',
    accent: 'linear-gradient(135deg, rgba(255, 255, 255, 0.55), rgba(41, 151, 255, 0.42))',
    stack: ['Brand Systems', 'Prototyping', 'Animation'],
    challenge:
      'How can an early-stage project feel tactile and exploratory with only placeholder assets?',
    outcome:
      'The project template is ready for future media embeds, motion previews, and external links.',
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
