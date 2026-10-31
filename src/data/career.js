import automationCreationsLogo from '../../info/logos/automation creations logo.webp';
import collinsLogo from '../../info/logos/collins aerospace logo.webp';
import humeLogo from '../../info/logos/hume logo.png';
import microsoftLogo from '../../info/logos/microsoft logo.webp';
import vtLogo from '../../info/about/vt-logo.webp';
import abilashPhoto from '../../info/about/abilash-sanam.png';

// The roadmap on the laptop: each stop, oldest first.
export const stops = [
  {
    id: 'vt-undergrad',
    label: '2021',
    tag: 'Undergrad',
    team: 'Virginia Tech',
    role: 'B.S. Computer Engineering',
    logo: vtLogo,
    range: 'Aug 2021',
    recap:
      'Showed up in Blacksburg for Computer Engineering without a specialty yet, just a thing for building stuff that actually works. Joined NSBE my first year.',
    highlights: [
      'Picked Computer Engineering for the mix of embedded, software, and hardware',
      'Joined the National Society of Black Engineers (NSBE) chapter',
    ],
    stat: null,
  },
  {
    id: 'hume-undergrad',
    label: '2022',
    tag: 'Research',
    team: 'Hume Center',
    role: 'Undergraduate Research Assistant',
    logo: humeLogo,
    range: 'Dec 2022 – May 2023',
    recap: 'First research gig: bench-testing Bluetooth Low Energy IoT hardware for Boeing.',
    highlights: [
      'Tested BLE IoT range, battery life, and durability',
      'Parsed sensor logs with Python and wrote up findings for the team',
    ],
    stat: null,
  },
  {
    id: 'collins',
    label: '2023',
    tag: 'Internship',
    team: 'Collins Aerospace',
    role: 'SEPP Mission Systems SWE Intern',
    logo: collinsLogo,
    range: 'Jun – Aug 2023',
    recap:
      'Put drone autonomy software on ground robots so the team could test it without ever leaving the ground.',
    highlights: [
      'Built an operational testing platform for unmanned aerial systems on ground robots',
      'Wrote Python libraries to process GPS and IMU telemetry into motor commands via the Station Keeping Playbook',
    ],
    stat: { value: '-90%', label: 'testing cost' },
  },
  {
    id: 'nsi',
    label: '2023–24',
    tag: 'Leadership',
    team: 'VT National Security Institute',
    role: 'Project Manager',
    logo: vtLogo,
    range: 'Sep 2023 – May 2024',
    recap:
      'First time four people depended on my planning, not just my code. Also Co-Senator for VT NSBE from Jan 2024.',
    highlights: [
      'Led a four-person undergrad team on an autonomous sensor platform',
      'Owned budgets, schedules, and risk reports for government-funded work',
      'NSBE Co-Senator: NSBE50 Atlanta, FRC Philadelphia, NSBE51 Chicago',
    ],
    stat: { value: '4', label: 'person team' },
  },
  {
    id: 'msft-2024',
    label: '2024',
    tag: 'Internship',
    team: 'Microsoft',
    role: 'Software for Hardware Engineer Intern',
    logo: microsoftLogo,
    range: 'May – Aug 2024',
    recap: 'Took messy driver logs and turned them into a model that flags unhealthy hardware.',
    highlights: [
      'Built a pipeline to clean, parse, and transform raw telemetry into model-ready data',
      'Trained an unsupervised anomaly detection model for proactive hardware failure mitigation',
    ],
    stat: { value: '90%+', label: 'precision' },
  },
  {
    id: 'msft-2025',
    label: '2025',
    tag: 'Return internship',
    team: 'Microsoft',
    role: 'Software for Hardware Engineer Intern',
    logo: microsoftLogo,
    range: 'May – Aug 2025',
    recap:
      'Came back to the same org for test automation and reporting. Graduated Magna Cum Laude with my B.S. that May.',
    highlights: [
      'Automated the test execution pipeline with PowerShell',
      'Built a data integration framework monitoring thousands of daily telemetry points',
      'Shipped a Power BI dashboard that sped up cross-team bug resolution',
    ],
    stat: { value: '1000s', label: 'daily telemetry points' },
    quote: {
      text: 'From day one, Benji demonstrated a strong sense of initiative and curiosity… thoughtful, driven, and a joy to work with.',
      author: 'Abilash Sanam',
      role: 'SW/FW Engineer, Microsoft · my mentor',
      photo: abilashPhoto,
    },
  },
  {
    id: 'meng',
    label: '2025–26',
    tag: 'Grad school',
    team: 'VT · Automation Creations · Hume',
    role: 'M.Eng. + Software Engineer + Grad Researcher',
    logo: automationCreationsLogo,
    range: 'Sep 2025 – May 2026',
    recap:
      'Accelerated M.Eng. in Software and Machine Intelligence, Qt/QML product UI at Automation Creations, mixed-reality research at Hume, and leading a Chi Alpha life group.',
    highlights: [
      'Built interactive screens, data tables, and reusable UI components in C++ and Qt/QML',
      'Mixed-reality RF spectrum visualization on a Meta Quest 3 at the Hume Center',
      'M.Eng. finished with a 3.90 GPA',
    ],
    stat: { value: '3.90', label: 'M.Eng. GPA' },
  },
  {
    id: 'msft-full-time',
    label: '2026',
    tag: 'Full-time',
    team: 'Microsoft',
    role: 'Software for Hardware Engineer',
    logo: microsoftLogo,
    range: '2026 – Present',
    recap: 'Back in Redmond full-time on the team I interned with.',
    highlights: ['[What you are working on now]', '[What you are learning or excited about]'],
    stat: null,
    current: true,
  },
];
