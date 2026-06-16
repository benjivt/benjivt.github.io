export const projectDetailContentBySlug = {
  'mixed-reality-radio-visualization': {
    challenge:
      'Bench spectrum analyzers keep you glued to a 2D screen. That makes it awkward to scan a room for RF sources.',
    outcome:
      'Built a low-latency I/Q-to-Unity pipeline: Pi edge processing, UDP to Quest 3, headset tuning, OpenCV detection, and a 3D waterfall overlay.',
    detailSections: [
      {
        eyebrow: 'Problem',
        title: 'Why mixed reality for RF work',
        bullets: [
          'Tethered 2D analyzers break situational awareness.',
          'Hard to correlate spectrum peaks with physical location.',
          'Target use: RF fox hunts and finding leakage sources in the field.',
        ],
      },
      {
        eyebrow: 'System',
        title: 'Architecture and objectives',
        bullets: [
          'Raspberry Pi 5 edge processing, Meta Quest 3 display.',
          'UDP between Pi and headset for low latency.',
          'Pipeline: spectrum frames, detection frames, tuning commands.',
          'Goals: portable setup, headset controls, sub-second feedback.',
        ],
      },
      {
        eyebrow: 'Implementation',
        title: 'Detection and rendering pipeline',
        bullets: [
          'OpenCV thresholding + morphological closing for signal blobs.',
          '2048-point FFT with Hamming window on I/Q data.',
          'Bounding boxes mapped into Unity world space.',
          'Texture2D ring buffer + custom shader for scrolling 3D waterfall.',
        ],
      },
      {
        eyebrow: 'Future Work',
        title: 'Where the system can go next',
        bullets: [
          'Replace thresholding with YOLOv8 for signal classification.',
          'Track frequency-hopping transmitters.',
          'Multi-SDR sync for TDOA localization.',
        ],
      },
    ],
  },
  'milk-classification-electrochemical-fingerprints': {
    challenge:
      'Subclinical mastitis is easy to miss early. Most farm tests are slow, expensive, or not practical for continuous monitoring.',
    outcome:
      'Proof-of-concept platform: ML on Raman + impedance data, custom GUI, SQLite storage, and motorized sensing control.',
    detailSections: [
      {
        eyebrow: 'Objectives',
        title: 'What the system was designed to do',
        bullets: [
          'Combine EIS and Raman in one detection workflow.',
          'ML layer for anomaly detection in milk samples.',
          'Software + database for logging and review.',
          'Portable bench setup for dairy testing scenarios.',
        ],
      },
      {
        eyebrow: 'Solution',
        title: 'Proof-of-concept platform design',
        bullets: [
          'Classifier on optical and electrochemical signals.',
          'Autofocus and 3-axis motorized sample positioning.',
          'Centralized DB for predictions and raw runs.',
          '3D-printed fixture to hold the microfluidic device steady.',
        ],
      },
      {
        eyebrow: 'Pipeline',
        title: 'Machine learning and sensing flow',
        bullets: [
          'Modified milk samples for distinct Raman and impedance signatures.',
          'Baseline correction and normalization in preprocessing.',
          'LDA for class separability.',
          'Binary normal vs abnormal output from processed spectra.',
        ],
      },
      {
        eyebrow: 'Future Work',
        title: 'Next steps suggested in the slides',
        bullets: [
          'Wire impedance sensor controls into the GUI.',
          'Motor control from the same interface.',
          'More visualization options and cloud backup.',
          'Train on larger, more diverse milk datasets.',
        ],
      },
    ],
  },
  'facial-attribute-detection': {
    challenge:
      'Run face detection and 20 attribute classifiers on live video without tanking frame rate, on data that may skew toward certain demographics.',
    outcome:
      'MTCNN detection pipeline with CNN attribute heads, tuned for real-time webcam use. Documented bias and privacy tradeoffs.',
    detailSections: [
      {
        eyebrow: 'Objective',
        title: 'Project focus',
        bullets: [
          'Detect faces in images and live video.',
          'Classify 20 attributes per face.',
          'End-to-end real-time pipeline.',
        ],
      },
      {
        eyebrow: 'Approach',
        title: 'How detection and attributes were modeled',
        bullets: [
          'MTCNN for face detection and alignment.',
          'P-Net, R-Net, O-Net cascade for progressive refinement.',
          'Separate CNN heads for global and fine-grained attributes.',
          'Tested on webcam streams and static datasets.',
        ],
      },
      {
        eyebrow: 'Risks',
        title: 'Challenges and ethical considerations',
        bullets: [
          'Hyperparameter tuning to balance speed vs accuracy.',
          'Training skew can bias results across demographics.',
          'Facial data needs careful handling and consent.',
        ],
      },
    ],
  },
  'autonomous-tractor': {
    challenge:
      'Coordinate straight driving, turning, and emergency braking across Arduino, motors, sensors, and a remote UI.',
    outcome:
      'Working prototype: sensing, motor control, Bluetooth link, and GUI for the course capstone.',
    detailSections: [
      {
        eyebrow: 'Goal',
        title: 'Core autonomous behaviors',
        bullets: [
          'Drive straight autonomously.',
          'Execute turns on command.',
          'Emergency stop on sensor trigger.',
        ],
      },
      {
        eyebrow: 'Hardware',
        title: 'Main platform components',
        bullets: [
          'Arduino Uno, MPU6050, HM10 Bluetooth, ultrasonic sensor.',
          'L298N motor driver, pushbutton, robot car chassis.',
          'Timer/comparator/IR logic for braking routines.',
        ],
      },
      {
        eyebrow: 'System Design',
        title: 'Control and interface flow',
        bullets: [
          'Routines for init, straight drive, turn, and e-brake.',
          'GUI for monitoring and manual override.',
          'Bluetooth between tractor firmware and interface.',
        ],
      },
    ],
  },
  'nano-games': {
    challenge:
      'Three mini-games, one MSP432, non-blocking code, and BoosterPack LCD graphics on tight GPIO/SPI constraints.',
    outcome:
      'Rotating arcade with lives, high scores, custom title art, and joystick ADC noise as the RNG source.',
    detailSections: [
      {
        eyebrow: 'Overview',
        title: 'Three games in one embedded arcade',
        bullets: [
          'Meter Filler, Direction Obeyer, Color Confirmer in rotation.',
          '2s pregame, 4s active window per round.',
          'Score, lives, game-over, and high-score tracking.',
        ],
      },
      {
        eyebrow: 'Gameplay',
        title: 'Input and scoring design',
        bullets: [
          'Meter Filler: button press within 0.5s of meter fill.',
          'Direction Obeyer: hold joystick in prompted direction.',
          'Color Confirmer: true/false on random color prompts.',
          '+1000 on success, lose a life on fail.',
        ],
      },
      {
        eyebrow: 'Architecture',
        title: 'Hardware and communication flow',
        bullets: [
          'GPIO for launchpad buttons, BoosterPack buttons, joystick.',
          'SPI to BoosterPack LCD for graphics.',
          'FSMs and app struct pointers for clean state transitions.',
        ],
      },
      {
        eyebrow: 'Polish',
        title: 'Quality and bonus features',
        bullets: [
          'Commented, non-blocking code; minimal magic numbers.',
          'Custom title and life graphics.',
          'Joystick ADC noise instead of rand().',
          'Random-color LED effect during Color Confirmer.',
        ],
      },
    ],
  },
  'low-power-tamagotchi': {
    challenge:
      'Keep a responsive pet loop on low-power MSP432: animations, stat decay, and input without blocking the interrupt architecture.',
    outcome:
      'Gumball-themed Tamagotchi with character select, life stages, sprite graphics, and interrupt-driven sleep/wake.',
    detailSections: [
      {
        eyebrow: 'Concept',
        title: 'A virtual pet on constrained hardware',
        bullets: [
          'Pick Gumball, Darwin, or Anais at start.',
          'Feed and play to keep energy and happiness up.',
          'Aging + stat decay drive life-cycle and game over.',
        ],
      },
      {
        eyebrow: 'Gameplay',
        title: 'Input loop and pet-state system',
        bullets: [
          'BoosterPack button 1 feeds the pet.',
          'Joystick left/right moves the pet and raises happiness.',
          'Movement burns energy; balance both stats to survive.',
          'Every 3s the pet ages and both stats tick down.',
        ],
      },
      {
        eyebrow: 'Architecture',
        title: 'Interrupt-first low-power design',
        bullets: [
          'CPU sleeps until GPIO interrupt wakes for input or tick.',
          'GPIO for buttons, joystick, LEDs.',
          'SPI to BoosterPack LCD for sprites.',
          'Responsive gameplay within low-power constraints.',
        ],
      },
      {
        eyebrow: 'Polish',
        title: 'Presentation and code quality goals',
        bullets: [
          'Custom title, game-over, and life-stage sprites.',
          'Character select via multiple FSMs.',
          'Non-blocking code, small functions, few hard-coded literals.',
        ],
      },
    ],
  },
};
