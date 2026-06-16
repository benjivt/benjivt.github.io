import { projectAssets } from './projectAssets';
import { projectSummaryContent } from './projectSummaryContent';

const projectBySlug = new Map(projectSummaryContent.map((project) => [project.slug, project]));

export function getAboutTimelineProjectAsset(slug) {
  const project = projectBySlug.get(slug);
  const assets = projectAssets[slug];

  if (!project || !assets) {
    return null;
  }

  return {
    image: assets.thumbnail,
    alt: `${project.title} project thumbnail`,
    variant: 'photo',
    scale: 1,
    accent: assets.accent,
  };
}
