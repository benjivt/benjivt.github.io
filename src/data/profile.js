import headshot from '../../info/headshot/headshot.webp';
import resume from '../../info/resumes/Resume 2026.pdf';

export const profile = {
  name: 'Benjamin Adjepong',
  nickname: 'Benji',
  headshot,
  resume,
  role: 'Software engineer',
  company: 'Microsoft',
  location: 'Redmond, WA',
  bio: "I'm Benji, a software engineer at Microsoft who likes building things where software meets real hardware. Virginia Tech twice over, two summers in Redmond before going full-time, and way too many hobbies.",
  strengths: ['Embedded', 'Machine learning', 'Front-end / UI', 'Test automation', 'Mixed reality', 'Leadership'],
  education: [
    { school: 'Virginia Tech', degree: 'M.Eng. Computer Engineering, Software & Machine Intelligence' },
    { school: 'Virginia Tech', degree: 'B.S. Computer Engineering, Machine Learning · Magna Cum Laude' },
  ],
  toolbox: [
    { group: 'Languages', items: ['Python', 'PowerShell', 'KQL', 'C/C++', 'C#', 'JavaScript'] },
    { group: 'Frameworks', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'Qt/QML', 'Unity'] },
    { group: 'Hardware', items: ['Raspberry Pi 5', 'Jetson Nano', 'Meta Quest 3', 'MSP432', 'Arduino'] },
  ],
};

// The phone lists these in their groups, each with an app-style icon square in `color` (icons live in Contact.jsx).
export const contacts = [
  { id: 'email', group: 'Reach me', label: 'Email', handle: 'benji@vt.edu', href: 'mailto:benji@vt.edu', color: '#0a84ff' },
  {
    id: 'linkedin',
    group: 'Reach me',
    label: 'LinkedIn',
    handle: 'in/benjaminadjepong',
    href: 'https://www.linkedin.com/in/benjaminadjepong/',
    color: '#0a66c2',
  },
  { id: 'github', group: 'Reach me', label: 'GitHub', handle: 'benjivt', href: 'https://github.com/benjivt', color: '#1f2328' },
  { id: 'resume', group: 'Reach me', label: 'Resume', handle: 'View it here', href: '#resume', color: '#ff9500' },
  {
    id: 'instagram',
    group: 'Elsewhere',
    label: 'Instagram',
    handle: '@benjarooniii',
    href: 'https://www.instagram.com/benjarooniii/',
    color: 'linear-gradient(45deg, #f58529, #dd2a7b 55%, #8134af)',
  },
  { id: 'beli', group: 'Elsewhere', label: 'Beli', handle: 'where I eat', href: 'https://beliapp.co/benjarooniii', color: '#34c759' },
];
