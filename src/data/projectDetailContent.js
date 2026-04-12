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
};
