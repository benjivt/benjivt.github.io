import { projectDetailContentBySlug } from './projectDetailContent';
import { projectSummaries } from './projectSummaries';

function validateProjectDetailData() {
  const summarySlugs = new Set(projectSummaries.map((project) => project.slug));

  for (const slug of summarySlugs) {
    if (!projectDetailContentBySlug[slug]) {
      throw new Error(`Missing project detail content for slug "${slug}".`);
    }
  }

  for (const slug of Object.keys(projectDetailContentBySlug)) {
    if (!summarySlugs.has(slug)) {
      throw new Error(`Project detail content defined for unknown slug "${slug}".`);
    }
  }
}

validateProjectDetailData();

export const projects = projectSummaries.map((project) => ({
  ...project,
  challenge: projectDetailContentBySlug[project.slug].challenge,
  outcome: projectDetailContentBySlug[project.slug].outcome,
  detailSections: projectDetailContentBySlug[project.slug].detailSections ?? [],
}));

const projectMap = new Map(projects.map((project) => [project.slug, project]));

export function getProjectBySlug(slug) {
  return projectMap.get(slug);
}

export function getRelatedProjects(slug, limit = 2) {
  return projectSummaries.filter((project) => project.slug !== slug).slice(0, limit);
}
