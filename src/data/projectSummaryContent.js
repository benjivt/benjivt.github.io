export const projectSummaryContent = [
  {
    slug: 'mixed-reality-radio-visualization',
    title: 'Mixed Reality Radio Visualization',
    category: 'Mixed Reality / Data Visualization',
    year: '2026',
    summary:
      'Overlays live RF spectrum data in a Quest 3 headset so you can tune and inspect signals without a tethered 2D analyzer.',
    role: 'Meta Quest 3, Raspberry Pi 5, Ettus B206mini, Unity',
    stack: ['Unity', 'OpenCV', 'UDP', 'Meta Quest 3'],
  },
  {
    slug: 'milk-classification-electrochemical-fingerprints',
    title: 'ML Classification of Milk Fingerprints',
    category: 'Machine Learning / Biosensing',
    year: '2025',
    summary:
      'Subclinical mastitis is hard to catch early on a farm. This project paired Raman and EIS with ML, a GUI, and a SQLite backend to flag abnormal milk samples.',
    role: 'Machine Learning, Raman, EIS, GUI, Database',
    stack: ['Machine Learning', 'Raman Spectroscopy', 'EIS', 'SQLite'],
  },
  {
    slug: 'facial-attribute-detection',
    title: 'Facial Attribute Detection',
    category: 'Computer Vision',
    year: '2024',
    summary:
      'Face detection and 20 attribute classifiers on live video: MTCNN for alignment, then multi-head CNNs in real time on webcam and benchmark datasets.',
    role: 'Computer Vision, Face Detection, Real-time Pipeline',
    stack: ['MTCNN', 'OpenCV', 'Multi-head CNN', 'Live Video'],
  },
  {
    slug: 'autonomous-tractor',
    title: 'Autonomous Tractor',
    category: 'Embedded Systems / Robotics',
    year: '2023',
    summary:
      'Built a small robot tractor on Arduino with ultrasonic and IMU sensing, Bluetooth control, and a custom GUI for straight driving, turns, and e-stop.',
    role: 'Arduino Uno, Bluetooth, Sensors, GUI',
    stack: ['Arduino Uno', 'Bluetooth', 'Ultrasonic Sensor', 'MPU6050'],
  },
  {
    slug: 'nano-games',
    title: 'Nano Games',
    category: 'Embedded Systems / Game Development',
    year: '2023',
    summary:
      'Meter Filler, Direction Obeyer, and Color Confirmer in one MSP432 arcade loop: FSMs, joystick noise as RNG, and a BoosterPack LCD.',
    role: 'Embedded C, FSMs, SPI, GPIO',
    stack: ['Embedded C', 'Finite State Machines', 'SPI', 'MSP432'],
  },
  {
    slug: 'low-power-tamagotchi',
    title: 'Low-Power Tamagotchi',
    category: 'Embedded Systems / Game Development',
    year: '2023',
    summary:
      'Gumball-themed virtual pet on MSP432: pick Gumball, Darwin, or Anais, then feed and play through interrupt-driven, low-power gameplay with sprite life stages.',
    role: 'Embedded C, Interrupts, SPI, Sprite Work',
    stack: ['Embedded C', 'Interrupt Architecture', 'SPI', 'GPIO'],
  },
];
