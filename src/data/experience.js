import { companyAssets } from './companyAssets';
import { experienceContent } from './experienceContent';

function validateExperienceData() {
  const seenIds = new Set();

  for (const item of experienceContent) {
    if (seenIds.has(item.id)) {
      throw new Error(`Duplicate experience id "${item.id}" in experienceContent.`);
    }

    if (!companyAssets[item.companyId]) {
      throw new Error(`Missing company assets for companyId "${item.companyId}".`);
    }

    seenIds.add(item.id);
  }
}

validateExperienceData();

function createExperience(entry) {
  return {
    ...entry,
    ...companyAssets[entry.companyId],
  };
}

export const experience = experienceContent.map(createExperience);
