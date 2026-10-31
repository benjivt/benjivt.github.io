// Where each section's content lives in the room (three.js coords: Blender x, z, -y).
// `screen` sections render on a device surface; `card` sections pin a note beside the object;
// `photos` sections look straight at a model's photo faces; `vr` flies into the headset.
// Html `transform` maps 1 CSS px to distanceFactor / 400 world units, hence the factor below.
const df = (worldWidth, cssWidth) => (worldWidth / cssWidth) * 400;

export const HOME_AZIMUTH = -Math.PI / 4;
export const HOME_POLAR = 0.98;

export const placements = {
  career: {
    kind: 'screen',
    device: 'laptop',
    // The laptop's display panel: 0.315 × 0.211 m, lid leaning back 10.3°, nudged 1.5 mm off the glass.
    position: [-4.2, 0.8818, 0.2776],
    rotation: [-0.1791, 0, 0],
    size: [960, 643],
    distanceFactor: df(0.3149, 960),
    // Looking down a little more than square-on keeps the chair back out of the way.
    view: { azimuth: 0, polar: 1.15, world: [0.315, 0.211], fill: 0.66 },
  },
  watching: {
    kind: 'screen',
    device: 'tv',
    // Sized and centred on the TV's glass (1.07 × 0.61 m), not the whole bezel.
    position: [-0.335, 1.1354, 3.3994],
    rotation: [0, -Math.PI / 2, 0],
    size: [1280, 732],
    distanceFactor: df(1.07, 1280),
    view: { azimuth: -Math.PI / 2, polar: 1.42, world: [1.07, 0.612], fill: 0.79 },
  },
  contact: {
    kind: 'screen',
    device: 'phone',
    position: [-4.74, 0.7735, 0.66],
    yaw: 0.349,
    rotation: [-Math.PI / 2, 0, 0],
    size: [340, 700],
    distanceFactor: df(0.068, 340),
    view: { azimuth: 0.349, polar: 0.3, world: [0.068, 0.14], fill: 0.8 },
  },
  music: { kind: 'card', view: { zoom: 2.4 } },
  sports: { kind: 'card', view: { zoom: 2.0 } },
  outdoors: { kind: 'card', view: { zoom: 2.4 } },
  about: { kind: 'card', view: { zoom: 2.6 } },
  gaming: { kind: 'card', view: { zoom: 2.8 } },
  // Photo walls: the camera looks straight at the model's photo faces (found by material name) and the
  // photos from info/film or info/travel are laid onto them. `fill` is how much of the screen they take up.
  film: {
    kind: 'photos',
    slots: ['print_sunset', 'print_teal', 'print_dusk'],
    view: { azimuth: HOME_AZIMUTH, polar: 0.28, fill: 0.6 },
  },
  // The Quest 3 on the desk: the camera flies around to face its lenses and right up to them, then the
  // headset's own UI takes over the screen. `target` is the centre of the lenses (from room.blend),
  // `azimuth` is the way they face, `width` is how much of the lens area fills the screen at the end.
  projects: {
    kind: 'vr',
    view: { target: [-3.5918, 0.7975, 0.8656], azimuth: -Math.PI / 6, polar: 1.5, width: 0.16, distance: 0.07 },
  },
  travel: {
    kind: 'photos',
    slots: ['mat23.005'],
    // The photos sit high in the cluster, with sticky notes hanging below, so frame them a little loose.
    view: { azimuth: 0, polar: 1.45, fill: 0.5 },
  },
  // The printed resume lying on the desk, left of the laptop (a real letter-size sheet).
  // The camera looks straight down at it, page top toward the wall, so it reads like the paper.
  resume: {
    kind: 'paper',
    position: [-4.64, 0.7575, 0.32],
    yaw: 0.14,
    paperSize: [0.216, 0.279],
    view: { azimuth: 0.14, polar: 0.22, world: [0.216, 0.279], fill: 0.86 },
  },
};

// Neon sign on the open wall above the desk.
export const sign = {
  position: [-4.15, 1.95, 0.16],
  size: [800, 220],
  distanceFactor: df(1.55, 800),
};

// Card standing in the gap on the lower bookshelf, leaning on the wall.
export const creditsNote = {
  position: [-0.17, 1.64, 1.34],
  rotation: [0, -Math.PI / 2, 0],
  size: [160, 120],
  distanceFactor: df(0.26, 160),
};
