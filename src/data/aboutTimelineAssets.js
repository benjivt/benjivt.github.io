import vtLogo from '../../info/about/vt-logo.webp';
import chiAlphaLogo from '../../info/about/chi-alpha-logo.jpg';
import nsbeLogo from '../../info/about/nsbe-logo.webp';
import humeLogo from '../../info/logos/hume logo.png';
import microsoftLogo from '../../info/logos/microsoft logo.webp';
import aciLogo from '../../info/logos/automation creations logo.webp';
import vtBurrussHallScene from '../../info/about/scenes/vt-burruss-hall.webp';
import seattleSpaceNeedleScene from '../../info/about/scenes/seattle-space-needle.webp';
import nsbeAtlantaScene from '../../info/about/scenes/nsbe-atlanta.webp';
import nsbePhiladelphiaScene from '../../info/about/scenes/nsbe-philadelphia.webp';
import nsbeChicagoScene from '../../info/about/scenes/nsbe-chicago.webp';

const vtCampus = {
  sceneImage: vtBurrussHallScene,
  sceneAlt: 'Burruss Hall on the Virginia Tech Drillfield, Blacksburg',
};

const seattleScene = {
  sceneImage: seattleSpaceNeedleScene,
  sceneAlt: 'Space Needle and Seattle skyline',
};

const nsbeConferenceScenes = {
  sceneImages: [
    { image: nsbeAtlantaScene, alt: 'Atlanta skyline from Jackson Street Bridge, NSBE50' },
    { image: nsbePhiladelphiaScene, alt: 'Liberty Bell, Philadelphia, Fall Regional Conference' },
    { image: nsbeChicagoScene, alt: 'Cloud Gate in Millennium Park, Chicago, NSBE51' },
  ],
};

export const aboutTimelineAssets = {
  'vt-origin': {
    image: vtLogo,
    alt: 'Virginia Tech logo',
    variant: 'logo',
    scale: 1.05,
    ...vtCampus,
  },
  'bs-graduation': {
    image: vtLogo,
    alt: 'Virginia Tech logo',
    variant: 'logo',
    scale: 1.05,
    ...vtCampus,
  },
  'meng-graduation': {
    image: vtLogo,
    alt: 'Virginia Tech logo',
    variant: 'logo',
    scale: 1.05,
    ...vtCampus,
  },
  'early-work': {
    image: humeLogo,
    alt: 'Hume Center for National Security and Technology logo',
    variant: 'logo',
    scale: 1.08,
  },
  'leadership-chapter': {
    image: vtLogo,
    alt: 'Virginia Tech National Security Institute logo',
    variant: 'logo',
    scale: 1.08,
  },
  'nsbe-chapter': {
    image: nsbeLogo,
    alt: 'National Society of Black Engineers logo',
    variant: 'logo',
    scale: 1.12,
    ...nsbeConferenceScenes,
  },
  'microsoft-chapter': {
    image: microsoftLogo,
    alt: 'Microsoft logo',
    variant: 'logo',
    scale: 1.08,
    ...seattleScene,
  },
  'grad-and-build': {
    image: aciLogo,
    alt: 'Automation Creations logo',
    variant: 'logo',
    scale: 1.08,
  },
  'vxta-chapter': {
    image: chiAlphaLogo,
    alt: 'Chi Alpha Campus Ministries logo',
    variant: 'logo',
    scale: 1.05,
  },
  'whats-next': {
    image: microsoftLogo,
    alt: 'Microsoft logo',
    variant: 'logo',
    scale: 1.08,
    ...seattleScene,
  },
};
