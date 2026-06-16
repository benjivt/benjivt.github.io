import { projectAssets } from './projectAssets';
import { interestsContent } from './interestsContent';

function validateInterestsAssets() {
  for (const interest of interestsContent) {
    if (!projectAssets[interest.projectSlug]) {
      throw new Error(`Missing project assets for interest "${interest.id}" (${interest.projectSlug}).`);
    }
  }
}

validateInterestsAssets();

export const interests = interestsContent.map((interest) => ({
  ...interest,
  thumbnail: projectAssets[interest.projectSlug].thumbnail,
  accent: projectAssets[interest.projectSlug].accent,
}));
