// Each section of the portfolio, and the objects in the 3D room that open it.
// `objects` are node names in public/models/room.glb.
export const sections = [
  {
    id: 'career',
    label: 'Career',
    hint: 'My roadmap, stop by stop',
    accent: '#ffb347',
    objects: ['prop_laptop'],
  },
  {
    id: 'projects',
    label: 'Projects',
    hint: "Things I've built",
    accent: '#9be564',
    // The Quest 3, Raspberry Pi and Arduino on the right of the desk.
    objects: ['prop_quest', 'prop_rpi', 'prop_arduino'],
  },
  {
    id: 'watching',
    label: 'Watching',
    hint: 'Movies, shows and anime',
    accent: '#5ec8ff',
    objects: ['prop_tv'],
  },
  {
    id: 'gaming',
    label: 'Gaming',
    hint: 'What I play',
    accent: '#5fd35f',
    objects: ['prop_controller'],
  },
  {
    id: 'music',
    label: 'Music',
    hint: 'What is spinning lately',
    accent: '#ff7eb6',
    objects: ['prop_turntable', 'prop_record_table', 'prop_vinyl_stack', 'prop_vinyl', 'prop_guitar'],
  },
  {
    id: 'film',
    label: 'Film',
    hint: 'Shots from my film camera',
    accent: '#ffd166',
    objects: ['prop_instant_camera', 'prop_polaroids'],
  },
  {
    id: 'travel',
    label: 'Travel',
    hint: "Places I've been",
    accent: '#6ec6ff',
    objects: ['prop_travel_wall'],
  },
  {
    id: 'sports',
    label: 'Sports',
    hint: 'Hoops, soccer, ping-pong, lifting',
    accent: '#ff8a3d',
    objects: ['prop_basketball', 'prop_soccer', 'prop_pingpong_table', 'prop_dumbbell_a', 'prop_dumbbell_b'],
  },
  {
    id: 'outdoors',
    label: 'Outdoors',
    hint: 'E-skating, karting, trails, water',
    accent: '#7ee081',
    objects: ['prop_skateboard'],
  },
  {
    id: 'about',
    label: 'About me',
    hint: 'Who I am and how I work',
    accent: '#c9a7ff',
    // prop_frame_2 (bookshelf) is left unassigned for now.
    objects: ['prop_frame_1'],
  },
  {
    id: 'contact',
    label: 'Contact',
    hint: 'Email, LinkedIn, resume',
    accent: '#ffe066',
    objects: ['prop_phone'],
  },
  {
    id: 'resume',
    label: 'Resume',
    hint: 'The one-page version',
    accent: '#ff9f6b',
    // Not a model in room.glb: the printed page on the desk is HTML (see placements.resume).
    objects: [],
  },
];

export const sectionById = Object.fromEntries(sections.map((section) => [section.id, section]));

export const sectionByObject = Object.fromEntries(
  sections.flatMap((section) => section.objects.map((name) => [name, section]))
);
