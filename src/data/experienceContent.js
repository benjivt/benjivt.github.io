import abilashSanamPhoto from '../../info/about/abilash-sanam.png';

export const experienceContent = [
  {
    id: 'microsoft-software-for-hardware-full-time',
    companyId: 'microsoft',
    range: '2026 - Present',
    title: 'Software for Hardware Engineer (Full-time)',
    company: 'Microsoft',
    location: 'Redmond, WA',
    summary:
      'Full-time Software for Hardware Engineer on the team I interned with — continuing release automation, telemetry, and hardware health tooling.',
    details:
      'Returning full-time to the SW-for-HW org after two internships, building on the release-testing and Power BI telemetry work from prior summers.',
  },
  {
    id: 'hume-center-graduate-research-assistant',
    companyId: 'hume-center',
    range: 'Jan 2026 - Present',
    title: 'Graduate Research Assistant',
    company: 'Hume Center for National Security and Technology',
    location: 'Blacksburg, VA',
    summary:
      'Graduate research on mixed-reality RF visualization at the Hume Center through the M.Eng. program at Virginia Tech.',
    details:
      'Building mixed-reality tooling that overlays live RF spectrum data in-headset — bridging hardware telemetry and 3D UI on Quest 3.',
  },
  {
    id: 'automation-creations-ui-design',
    companyId: 'automation-creations',
    range: 'Sep 2025 - Apr 2026',
    title: 'Software Engineer',
    company: 'Automation Creations, Inc.',
    location: 'Blacksburg, VA',
    summary:
      'Built Qt/QML screens, data tables, and reusable UI components for a product customization app. Cleared Agile backlog items for front-end features and fixes.',
    details:
      'Shipped customer-facing configuration flows in Qt/QML while keeping component libraries reusable across product lines.',
  },
  {
    id: 'microsoft-software-for-hardware-2025',
    companyId: 'microsoft',
    range: 'May 2025 - Aug 2025',
    title: 'Software for Hardware Engineer Intern',
    company: 'Microsoft',
    location: 'Redmond, WA',
    summary:
      'Automated release testing with PowerShell and built a telemetry pipeline into Power BI for GL status reporting across programs.',
    details:
      'Automated release validation scripts and wired telemetry into Power BI so program leads could see GL status without manual spreadsheet wrangling.',
    quote: {
      text:
        'I had the pleasure of mentoring Benji Adjepong during his internship as a SW for HW Engineer, and I can confidently say he made a lasting impact. From day one, Benji demonstrated a strong sense of initiative and curiosity. His intern project tackled a longstanding challenge in our release process—visualizing GL status across programs. Benji not only automated key testing steps but also built a Power BI dashboard that streamlined reporting and decision-making. Benji’s technical skills were matched by his collaborative mindset. Whether it was organizing scripts in our GIT Repo, consolidating artifact tables for the dashboard, or creating the wiki, Benji consistently ensured that his work was accessible and impactful. He was proactive in preparing presentations, coordinating dry runs, and tailoring content to the audience’s familiarity with topics of his intern project. His ability to communicate complex ideas clearly and adapt quickly made him a standout contributor. Benji is thoughtful, driven, and a joy to work with. I’m excited to see where his career takes him next.',
      author: 'Abilash Sanam',
      role: 'SW/FW Engineer, Microsoft',
      image: abilashSanamPhoto,
      imageAlt: 'Abilash Sanam',
    },
  },
  {
    id: 'microsoft-software-for-hardware-2024',
    companyId: 'microsoft',
    range: 'May 2024 - Aug 2024',
    title: 'Software for Hardware Engineer Intern',
    company: 'Microsoft',
    location: 'Redmond, WA',
    summary:
      'Cleaned and structured hardware driver logs, then trained an unsupervised ML model to flag anomalies for hardware health review.',
    details:
      'Parsed noisy driver telemetry into structured tables, then applied unsupervised ML to surface anomalies hardware teams could review faster.',
  },
  {
    id: 'virginia-tech-national-security-institute-project-manager',
    companyId: 'virginia-tech-national-security-institute',
    range: 'Sep 2023 - May 2024',
    title: 'Project Manager',
    company: 'Virginia Tech National Security Institute',
    location: 'Blacksburg, VA',
    summary:
      'Led a four-person undergrad team on an autonomous sensor platform. Owned budgets, schedules, and risk reports for government-funded work.',
    details:
      'Ran weekly syncs, tracked deliverables, and kept a four-person team aligned on an autonomous sensor platform for government sponsors.',
  },
  {
    id: 'collins-aerospace-sepp-mission-systems',
    companyId: 'collins-aerospace',
    range: 'Jun 2023 - Aug 2023',
    title: 'SEPP Mission Systems Software Engineer Intern',
    company: 'Collins Aerospace',
    location: 'Cedar Rapids, IA',
    summary:
      'Built a ground-robot UAS testing platform that cut testing costs ~90%. Parsed GPS and IMU telemetry to drive Station Keeping Playbook motion commands.',
    details:
      'Replaced expensive flight tests with a ground-robot rig that replayed GPS/IMU feeds into Station Keeping Playbook motion commands.',
  },
  {
    id: 'hume-center-undergraduate-research-assistant',
    companyId: 'hume-center',
    range: 'Dec 2022 - May 2023',
    title: 'Undergraduate Research Assistant',
    company: 'Hume Center for National Security and Technology',
    location: 'Blacksburg, VA',
    summary:
      'Tested BLE IoT range, battery life, and durability for Boeing. Parsed sensor logs with PuTTY and Python and wrote up findings for the team.',
    details:
      'Bench-tested BLE IoT hardware for range and battery life, then documented what held up (and what did not) for Boeing stakeholders.',
  },
];
