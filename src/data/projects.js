import tractorThumb from '../../info/projects/autonomous tractor.webp';
import tractorReport from '../../info/projects/autonomous tractor.pdf';
import facialThumb from '../../info/projects/facial attribute.webp';
import facialReport from '../../info/projects/facial attribute detection.pdf';
import milkThumb from '../../info/projects/milk fingerprint.webp';
import milkReport from '../../info/projects/milk fingerprinting.pdf';
import mixedRealityThumb from '../../info/projects/mixed reality.webp';
import mixedRealityReport from '../../info/projects/mixed reality.pdf';
import nanoGamesThumb from '../../info/projects/nano games.webp';
import nanoGamesReport from '../../info/projects/Nano Games Report.pdf';
import tamagotchiThumb from '../../info/projects/tamagochi.webp';
import tamagotchiReport from '../../info/projects/Tamagotchi Report.pdf';

// Projects grouped by area; the Projects card on the desk lists each group with its projects.
export const groups = [
  {
    id: 'xr',
    name: 'Mixed reality',
    blurb: 'Mixed reality and spatial data',
    color: '#39d5ff',
    projects: [
      {
        id: 'mixed-reality-radio',
        name: 'Mixed Reality Radio Visualization',
        year: '2026',
        image: mixedRealityThumb,
        report: mixedRealityReport,
        summary:
          'Raw I/Q data from a software-defined radio, piped through a Raspberry Pi 5 into a Meta Quest 3 and drawn as an isometric waterfall you can tune in the room.',
        notes: [
          'Cross-platform pipeline to ingest, transmit, and visualize raw I/Q data in AR/VR',
          'Immersive UI for real-time spectral analysis with live frequency tuning',
        ],
        stack: ['Unity', 'C#', 'Python', 'Meta Quest 3', 'Raspberry Pi 5'],
      },
    ],
  },
  {
    id: 'ml',
    name: 'Machine learning',
    blurb: 'Machine learning and computer vision',
    color: '#c6ff3d',
    projects: [
      {
        id: 'milk-fingerprints',
        name: 'ML Classification of Milk Fingerprints',
        year: '2025',
        image: milkThumb,
        report: milkReport,
        summary:
          'Catching abnormal milk early from electrochemical fingerprints, so farms can spot subclinical mastitis before it spreads.',
        notes: [
          'Normalization pipeline and frequency-band features from 61-dimensional EIS spectra',
          'Leave-One-Cow-Out GroupKFold cross-validation to stop data leakage',
          'k-NN model: 90.8% accuracy, 0.888 F1',
        ],
        stack: ['Python', 'scikit-learn', 'EIS'],
      },
      {
        id: 'facial-attributes',
        name: 'Facial Attribute Detection',
        year: '2024',
        image: facialThumb,
        report: facialReport,
        summary: 'Live webcam video in, 20 facial attributes out, in real time.',
        notes: [
          'MTCNN (P-Net, R-Net, O-Net) for face detection and alignment',
          'Tuned multi-CNN layers to balance live inference speed against accuracy',
        ],
        stack: ['Python', 'OpenCV', 'MTCNN', 'CNNs'],
      },
    ],
  },
  {
    id: 'embedded',
    name: 'Embedded',
    blurb: 'Embedded systems and robotics',
    color: '#ffcc00',
    projects: [
      {
        id: 'autonomous-tractor',
        name: 'Autonomous Tractor',
        year: '2023',
        image: tractorThumb,
        report: tractorReport,
        summary:
          'A small robot tractor with ultrasonic and IMU sensing, Bluetooth control, and a custom GUI for straight driving, turns, and e-stop.',
        notes: ['Sensor fusion with an MPU6050 IMU and ultrasonic ranging', 'Bluetooth control link and desktop drive UI'],
        stack: ['Arduino Uno', 'Bluetooth', 'MPU6050', 'Qt GUI'],
      },
      {
        id: 'nano-games',
        name: 'Nano Games',
        year: '2023',
        image: nanoGamesThumb,
        report: nanoGamesReport,
        summary:
          'Meter Filler, Direction Obeyer, and Color Confirmer in one MSP432 arcade loop, using joystick noise as the random number generator.',
        notes: ['Finite state machines for each mini-game', 'BoosterPack LCD over SPI'],
        stack: ['Embedded C', 'MSP432', 'FSMs', 'SPI'],
      },
      {
        id: 'tamagotchi',
        name: 'Low-Power Tamagotchi',
        year: '2023',
        image: tamagotchiThumb,
        report: tamagotchiReport,
        summary:
          'A Gumball-themed virtual pet on the MSP432: pick Gumball, Darwin, or Anais, then feed and play through interrupt-driven, low-power gameplay.',
        notes: ['Interrupt architecture to keep the CPU asleep', 'Sprite life stages on an SPI display'],
        stack: ['Embedded C', 'MSP432', 'Interrupts', 'SPI'],
      },
    ],
  },
];
