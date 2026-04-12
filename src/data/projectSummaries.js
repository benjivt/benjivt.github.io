import { projectAssets } from './projectAssets';
import { projectSummaryContent } from './projectSummaryContent';

function validateProjectSummaryData() {
  const seenSlugs = new Set();

  for (const project of projectSummaryContent) {
    if (seenSlugs.has(project.slug)) {
      throw new Error(`Duplicate project slug "${project.slug}" in projectSummaryContent.`);
    }

    if (!projectAssets[project.slug]) {
      throw new Error(`Missing project assets for slug "${project.slug}".`);
    }

    seenSlugs.add(project.slug);
  }

  for (const slug of Object.keys(projectAssets)) {
    if (!seenSlugs.has(slug)) {
      throw new Error(`Project assets defined for unknown slug "${slug}".`);
    }
  }
}

validateProjectSummaryData();

function createProjectSummary(project) {
  return {
    interactiveType: 'none',
    ...project,
    ...projectAssets[project.slug],
  };
}

export const projectSummaries = projectSummaryContent.map(createProjectSummary);
