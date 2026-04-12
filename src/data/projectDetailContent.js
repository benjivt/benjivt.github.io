export const projectDetailContentBySlug = {
  'mixed-reality-radio-visualization': {
    challenge:
      'Traditional spectrum analyzers are tied to bulky 2D screens, making it difficult to maintain situational awareness while locating RF sources in the physical world.',
    outcome:
      'The project established a low-latency pipeline from I/Q acquisition to mixed reality rendering, with headset-based tuning, real-time signal detection, and an immersive 3D waterfall overlay.',
    detailSections: [
      {
        eyebrow: 'Problem',
        title: 'Why mixed reality for RF work',
        bullets: [
          'Conventional spectrum tools rely on tethered 2D screens.',
          'Users lose environmental awareness while searching for transmitters.',
          'The goal was to place spectral data directly into the working environment.',
          'Target use cases included RF fox hunts and identifying leakage sources.',
        ],
      },
      {
        eyebrow: 'System',
        title: 'Architecture and objectives',
        bullets: [
          'Raspberry Pi 5 performs edge processing before sending data to a Meta Quest 3.',
          'UDP was selected for low-latency communication between the Pi and headset.',
          'Core objectives included portability, headset control, low latency, and actionable signal insight.',
          'The pipeline supports spectrum frames, detection frames, and radio tuning commands.',
        ],
      },
      {
        eyebrow: 'Implementation',
        title: 'Detection and rendering pipeline',
        bullets: [
          'Signal detection used OpenCV thresholding with morphological closing.',
          'A 2048-point FFT and Hamming window were applied during spectrum processing.',
          'Bounding boxes were extracted and mapped into Unity coordinates.',
          'A Texture2D ring buffer and custom shader powered the scrolling 3D waterfall visualization.',
        ],
      },
      {
        eyebrow: 'Future Work',
        title: 'Where the system can go next',
        bullets: [
          'Move from OpenCV thresholding to YOLOv8 for signal classification.',
          'Add frequency hopping support for agile signals.',
          'Synchronize multiple SDRs for TDOA-based localization.',
        ],
      },
    ],
  },
  'milk-classification-electrochemical-fingerprints': {
    challenge:
      'Subclinical mastitis is difficult to detect early, and existing methods are often too slow, expensive, or impractical for continuous monitoring in farm environments.',
    outcome:
      'The team built a proof-of-concept real-time biosensor platform that paired machine learning with Raman and impedance data, plus a GUI, database support, and motorized sensing control.',
    detailSections: [
      {
        eyebrow: 'Objectives',
        title: 'What the system was designed to do',
        bullets: [
          'Combine Electrochemical Impedance Spectroscopy and Raman Spectroscopy into one detection workflow.',
          'Use machine learning to improve anomaly detection in milk samples.',
          'Support data analysis and collaboration through custom software and a database.',
          'Target a portable, scalable, and real-time platform for dairy environments.',
        ],
      },
      {
        eyebrow: 'Solution',
        title: 'Proof-of-concept platform design',
        bullets: [
          'Built a machine learning algorithm to detect anomalies in optical and electrochemical signals.',
          'Integrated autofocus and 3-axis motorized adjustment into the control workflow.',
          'Created a centralized database for predictions and data management.',
          'Used a custom 3D-printed fixture to stabilize the microfluidic device during testing.',
        ],
      },
      {
        eyebrow: 'Pipeline',
        title: 'Machine learning and sensing flow',
        bullets: [
          'Milk samples were modified to create distinguishable Raman and impedance signatures.',
          'Preprocessing included baseline correction and normalization.',
          'LDA mapping was used to maximize class separability.',
          'The classifier produced normal-versus-abnormal predictions from processed spectra.',
        ],
      },
      {
        eyebrow: 'Future Work',
        title: 'Next steps suggested in the slides',
        bullets: [
          'Integrate impedance sensor controls into the custom software.',
          'Add motor control directly into the existing interface.',
          'Expand visualization options and cloud database support.',
          'Train with more diverse milk datasets and port the software to more platforms.',
        ],
      },
    ],
  },
  'facial-attribute-detection': {
    challenge:
      'The main challenge was balancing detection accuracy and computational efficiency while working with live video and datasets that may not represent all demographics equally.',
    outcome:
      'The project implemented a real-time MTCNN-based workflow for face detection and facial feature identification while outlining clear performance, bias, and privacy considerations.',
    detailSections: [
      {
        eyebrow: 'Objective',
        title: 'Project focus',
        bullets: [
          'Detect faces in images and live video streams.',
          'Identify 20 facial attributes from detected faces.',
          'Integrate the pipeline into a real-time workflow.',
        ],
      },
      {
        eyebrow: 'Approach',
        title: 'How detection and attributes were modeled',
        bullets: [
          'MTCNN was used for face detection and feature extraction.',
          'The three-stage process used P-Net, R-Net, and O-Net for progressively refined detection.',
          'CNN-based models handled global and specific facial attribute recognition.',
          'The system combined live video use cases with dataset-based analysis.',
        ],
      },
      {
        eyebrow: 'Applications',
        title: 'Real-world scenarios discussed in the slides',
        bullets: [
          'Personalization for beauty and skincare recommendations.',
          'Security and surveillance for identity and emotion-related analysis.',
          'Healthcare-oriented analysis of facial features and patterns.',
        ],
      },
      {
        eyebrow: 'Risks',
        title: 'Challenges and ethical considerations',
        bullets: [
          'Hyperparameter tuning was needed to balance speed with detection quality.',
          'Non-diverse training data can create demographic bias.',
          'Facial data handling must protect privacy and follow regulations.',
        ],
      },
    ],
  },
  'autonomous-tractor': {
    challenge:
      'The tractor needed to execute core autonomous behaviors such as straight driving, turning, and emergency braking while coordinating multiple hardware components reliably.',
    outcome:
      'The finished prototype combined sensing, motor control, Bluetooth communication, and a custom GUI into a working autonomous vehicle platform for the course project.',
    detailSections: [
      {
        eyebrow: 'Goal',
        title: 'Core autonomous behaviors',
        bullets: [
          'Drive straight autonomously.',
          'Make turns as needed.',
          'Trigger emergency stops when required.',
        ],
      },
      {
        eyebrow: 'Hardware',
        title: 'Main platform components',
        bullets: [
          'Arduino Uno, MPU6050 gyroscope, HM10 Bluetooth module, and ultrasonic sensor.',
          'L298N motor controller, pushbutton interface, and robot car chassis.',
          'Additional hardware concepts included timer, comparator, and infrared components for braking logic.',
        ],
      },
      {
        eyebrow: 'System Design',
        title: 'Control and interface flow',
        bullets: [
          'The implementation included dedicated routines for initialization, straight driving, turning, and e-brake behavior.',
          'A graphical user interface was designed to support monitoring and interaction.',
          'Bluetooth connectivity enabled communication between the tractor system and the interface.',
        ],
      },
    ],
  },
  'nano-games': {
    challenge:
      'The project needed to package three distinct mini-games into one responsive embedded experience while keeping the code modular, non-blocking, and compatible with constrained launchpad inputs and display hardware.',
    outcome:
      'The final build delivered a three-game arcade loop with lives, high scores, custom graphics, and joystick-based randomness, all organized around finite state machines and event-driven gameplay.',
    detailSections: [
      {
        eyebrow: 'Overview',
        title: 'Three games in one embedded arcade',
        bullets: [
          'The project combined Meter Filler, Direction Obeyer, and Color Confirmer into one rotating experience.',
          'Each game used a two-second pregame state followed by a four-second active game window.',
          'The session tracked score, lives, and a final game-over state with high-score updates.',
        ],
      },
      {
        eyebrow: 'Gameplay',
        title: 'Input and scoring design',
        bullets: [
          'Meter Filler challenged the player to time a button press within half a second of a filling meter.',
          'Direction Obeyer required holding the joystick in a prompted random direction.',
          'Color Confirmer paired random color prompts with true or false button responses.',
          'Successful rounds added 1000 points, while failed rounds reduced the player life count.',
        ],
      },
      {
        eyebrow: 'Architecture',
        title: 'Hardware and communication flow',
        bullets: [
          'GPIO handled inputs from launchpad buttons, BoosterPack buttons, and joystick movement.',
          'SPI communication linked the system to the BoosterPack LCD for real-time graphics.',
          'The codebase relied on finite state machines and application-struct pointers to manage game state transitions cleanly.',
        ],
      },
      {
        eyebrow: 'Polish',
        title: 'Quality and bonus features',
        bullets: [
          'The project emphasized reasonably commented, non-blocking code with limited hard-coded values.',
          'Custom title and life graphics were added to improve the visual presentation.',
          'Joystick ADC noise was used as a random-number source instead of standard `rand()` calls.',
          'A random-color LED effect added extra chaos during Color Confirmer rounds.',
        ],
      },
    ],
  },
  'low-power-tamagotchi': {
    challenge:
      'The game needed to maintain a responsive virtual pet loop on low-power embedded hardware, balancing animation, pet-state updates, and user input without abandoning an interrupt-driven architecture.',
    outcome:
      'The finished Tamagotchi delivered character selection, evolving pet life stages, low-power interrupt handling, and sprite-based visuals in a polished embedded game themed around The Amazing World of Gumball.',
    detailSections: [
      {
        eyebrow: 'Concept',
        title: 'A virtual pet on constrained hardware',
        bullets: [
          'Players choose between Gumball, Darwin, and Anais before gameplay begins.',
          'The pet must be fed and played with to prevent energy and happiness from dropping to zero.',
          'Aging, energy, and happiness stats drive the pet life-cycle and game-over conditions.',
        ],
      },
      {
        eyebrow: 'Gameplay',
        title: 'Input loop and pet-state system',
        bullets: [
          'BoosterPack button 1 feeds the pet to restore energy.',
          'Left and right joystick movement drives pet movement and increases happiness.',
          'Movement consumes energy, so the user must balance both needs to keep the pet alive.',
          'Every three seconds the pet ages and both energy and happiness are decremented.',
        ],
      },
      {
        eyebrow: 'Architecture',
        title: 'Interrupt-first low-power design',
        bullets: [
          'The CPU remains in low-power sleep until an interrupt wakes it for input or update work.',
          'GPIO handles input and output across buttons, joystick, LEDs, and other peripherals.',
          'SPI communication powers the BoosterPack LCD graphics pipeline.',
          'The design keeps the gameplay responsive while respecting the low-power architecture requirement.',
        ],
      },
      {
        eyebrow: 'Polish',
        title: 'Presentation and code quality goals',
        bullets: [
          'The project included custom title and game-over images plus sprite work for pet life stages.',
          'Preset character selection was implemented with multiple finite state machines.',
          'The report emphasizes non-blocking code, limited hard-coded values, and manageable function sizes.',
        ],
      },
    ],
  },
};
