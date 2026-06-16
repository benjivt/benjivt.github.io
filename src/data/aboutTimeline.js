import { aboutTimelineAssets } from './aboutTimelineAssets';
import { getAboutTimelineProjectAsset } from './aboutTimelineProjects';

const aboutTimelineContent = [
  {
    id: 'vt-origin',
    kind: 'chapter',
    sortKey: '2021-01',
    date: '2021',
    title: 'Arrived at Virginia Tech',
    summary: 'B.S. in Computer Engineering',
    reflection:
      'Showed up at VT in 2021 for Computer Engineering without a clear specialty yet, just a preference for building things that actually work.',
    details:
      'The major mixes embedded systems, software, and hardware. That mix still shows up in how I pick projects.',
  },
  {
    id: 'project-autonomous-tractor',
    kind: 'project',
    sortKey: '2023-01',
    date: '2023',
    title: 'Built an autonomous tractor',
    summary: 'Embedded Systems / Robotics',
    reflection:
      'First project where I owned everything from sensors to the Bluetooth link to the drive UI.',
    details: 'Small robot tractor: straight driving, turns, and emergency stops on real sensor input.',
    projectSlug: 'autonomous-tractor',
  },
  {
    id: 'early-work',
    kind: 'chapter',
    sortKey: '2023-02',
    date: '2022 - 2023',
    title: 'Research and first internship',
    summary: 'Hume Center and Collins Aerospace',
    reflection:
      'I found out I like turning raw sensor data into something a team can actually use.',
    details:
      'BLE IoT characterization for Boeing at the Hume Center, then a Collins internship building UAS testing tools on ground robots.',
  },
  {
    id: 'leadership-chapter',
    kind: 'chapter',
    sortKey: '2023-03',
    date: '2023 - 2024',
    title: 'Led my first research team',
    summary: 'Project Manager, VT National Security Institute',
    reflection:
      'First role where four other people depended on my planning, not just my code.',
    details:
      'Managed an undergrad team on an autonomous sensor platform for government-funded research. Built budgets, schedules, and risk reports.',
  },
  {
    id: 'nsbe-chapter',
    kind: 'chapter',
    sortKey: '2023-04',
    date: '2023 - 2025',
    title: 'Co-Senator, NSBE at Virginia Tech',
    summary: 'National Society of Black Engineers',
    reflection:
      'As Co-Senator I helped run chapter programs, not just attend them. NSBE50 in Atlanta, FRC in Philadelphia, and NSBE51 in Chicago with the VT chapter were the trips I remember most.',
    details:
      'Member since 2021. Undergraduate Council for 2023-24 with Nissi Otoo, Joshua Essandoh, Vaughn Knight, and Nicolas Turner. Co-Senator (Jan 2024 - May 2025). Traveled with VT NSBE to NSBE50 in Atlanta (March 2024), Fall Regional Conference in Philadelphia (Nov 2024), and NSBE51 in Chicago (March 2025).',
  },
  {
    id: 'project-facial-attributes',
    kind: 'project',
    sortKey: '2024-01',
    date: '2024',
    title: 'Facial attribute detection',
    summary: 'Computer Vision',
    reflection:
      'Live video to twenty updating attributes made computer vision click for me.',
    details: 'CNN face detection and multi-network feature extraction on live video and benchmark datasets.',
    projectSlug: 'facial-attribute-detection',
  },
  {
    id: 'microsoft-chapter',
    kind: 'chapter',
    sortKey: '2024-02',
    date: '2024 - 2025',
    title: 'Two summers at Microsoft',
    summary: 'Software for Hardware Engineering',
    reflection:
      'Two summers on Microsoft Software for Hardware: messy driver logs one year, release tooling and Power BI the next.',
    details:
      'Summer 2024: unsupervised anomaly detection on driver logs. Summer 2025: PowerShell test automation and a telemetry-to-Power BI pipeline for GL status reporting.',
  },
  {
    id: 'project-milk-fingerprints',
    kind: 'project',
    sortKey: '2025-01',
    date: '2025',
    title: 'ML milk fingerprint classification',
    summary: 'Machine Learning / Biosensing',
    reflection:
      'Grad project that put Raman, EIS, and ML in the same pipeline with a GUI I could demo.',
    details: 'Dual-modal biosensing for early detection of abnormal milk samples.',
    projectSlug: 'milk-classification-electrochemical-fingerprints',
  },
  {
    id: 'bs-graduation',
    kind: 'chapter',
    sortKey: '2025-015',
    date: 'May 2025',
    title: 'Graduated from Virginia Tech',
    summary: 'B.S. Computer Engineering, Magna Cum Laude',
    reflection:
      'Four years at VT wrapped up with a B.S. in Computer Engineering and a machine learning focus. Stayed in Blacksburg for the UGG accelerated M.Eng. and another Microsoft internship that summer.',
    details:
      'Graduated Magna Cum Laude. Machine learning emphasis within Computer Engineering. Started the M.Eng. in Software and Machine Intelligence the following fall.',
  },
  {
    id: 'grad-and-build',
    kind: 'chapter',
    sortKey: '2025-02',
    date: '2025 - 2026',
    title: 'M.Eng. and shipping product UI',
    summary: 'Virginia Tech M.Eng. and Automation Creations',
    reflection:
      'Accelerated M.Eng. while working part time at Automation Creations: Qt/QML screens by day, coursework and Hume research at night.',
    details:
      'UGG M.Eng. in Software and Machine Intelligence at VT. Built reusable UI components for Automation Creations through Apr 2026.',
  },
  {
    id: 'vxta-chapter',
    kind: 'chapter',
    sortKey: '2025-03',
    date: '2025 - 2026',
    title: 'Life Group Leader, VTXA',
    summary: 'Virginia Tech Chi Alpha',
    reflection:
      'Leading a Chi Alpha life group meant showing up weekly for the same small group of people, not just running a meeting.',
    details:
      'Life group leader at VTXA (Virginia Tech Chi Alpha). Weekly meetings, discussion, and campus ministry.',
  },
  {
    id: 'project-mixed-reality',
    kind: 'project',
    sortKey: '2026-01',
    date: '2026',
    title: 'Mixed reality radio visualization',
    summary: 'Mixed Reality / Data Visualization',
    reflection:
      'RF hardware, Unity, and a Quest 3 headset in one build. Most of my interests in a single capstone.',
    details: 'Live spectrum analysis overlaid on the physical world through a Meta Quest 3.',
    projectSlug: 'mixed-reality-radio-visualization',
  },
  {
    id: 'meng-graduation',
    kind: 'chapter',
    sortKey: '2026-02',
    date: 'May 2026',
    title: 'Finished my M.Eng. at Virginia Tech',
    summary: 'M.Eng. Computer Engineering, Summa Cum Laude',
    reflection:
      'One year accelerated M.Eng. done. Summa Cum Laude in Software and Machine Intelligence, with mixed-reality research and product UI work along the way.',
    details:
      'UGG accelerated M.Eng. in Software and Machine Intelligence. Graduated Summa Cum Laude. Capstone mixed-reality RF visualization at the Hume Center.',
  },
  {
    id: 'whats-next',
    kind: 'chapter',
    sortKey: '2026-03',
    date: '2026',
    title: 'Starting at Microsoft',
    summary: 'Software Engineer, full-time',
    reflection:
      'M.Eng. wrapped in May. Heading to Microsoft full time after two Software for Hardware internships.',
    details:
      'Software engineer on hardware-adjacent teams. Five years at VT, two summers at Microsoft, now joining full time.',
  },
];

function resolveTimelineAssets(entry) {
  if (entry.kind === 'project' && entry.projectSlug) {
    return getAboutTimelineProjectAsset(entry.projectSlug) ?? {};
  }

  return aboutTimelineAssets[entry.id] ?? {};
}

export const aboutTimeline = aboutTimelineContent
  .slice()
  .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  .map((entry) => {
    const assets = resolveTimelineAssets(entry);

    return {
      ...entry,
      image: assets.image ?? null,
      imageAlt: assets.alt ?? '',
      imageVariant: assets.variant ?? null,
      imageScale: assets.scale ?? 1,
      accent: assets.accent ?? null,
      sceneImage: assets.sceneImage ?? null,
      sceneAlt: assets.sceneAlt ?? '',
      sceneImages: assets.sceneImages ?? null,
    };
  });
