import autonomousTractorThumb from '../../info/projects/autonomous tractor.png';
import facialAttributeThumb from '../../info/projects/facial attribute.png';
import milkFingerprintThumb from '../../info/projects/milk fingerprint.png';
import mixedRealityThumb from '../../info/projects/mixed reality.png';

export const projects = [
  {
    slug: 'mixed-reality-radio-visualization',
    title: 'Mixed Reality Radio Visualization',
    category: 'Mixed Reality / Data Visualization',
    year: '2026',
    summary:
      'A mixed reality spectrum analysis tool that overlays live RF activity onto the physical environment so users can tune, inspect, and locate signals without a tethered 2D display.',
    role: 'Meta Quest 3, Raspberry Pi 5, Ettus B206mini, Unity',
    interactiveType: 'preview',
    thumbnail: mixedRealityThumb,
    accent: 'linear-gradient(135deg, rgba(178, 141, 255, 0.82), rgba(214, 187, 255, 0.54))',
    stack: ['Unity', 'OpenCV', 'UDP', 'Meta Quest 3'],
    challenge:
      'Traditional spectrum analyzers are tied to bulky 2D displays, making it difficult to maintain situational awareness while locating RF sources in the physical world.',
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
  {
    slug: 'milk-classification-electrochemical-fingerprints',
    title: 'ML Classification of Milk Fingerprints',
    category: 'Machine Learning / Biosensing',
    year: '2025',
    summary:
      'A dual-modal biosensing project that combines machine learning, Raman spectroscopy, and electrochemical impedance measurements to improve early detection of abnormal milk samples.',
    role: 'Machine Learning, Raman, EIS, GUI, Database',
    interactiveType: 'preview',
    thumbnail: milkFingerprintThumb,
    accent: 'linear-gradient(135deg, rgba(198, 171, 255, 0.72), rgba(244, 114, 182, 0.4))',
    stack: ['Machine Learning', 'Raman Spectroscopy', 'EIS', 'SQLite'],
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
  {
    slug: 'facial-attribute-detection',
    title: 'Facial Attribute Detection',
    category: 'Computer Vision',
    year: '2024',
    summary:
      'A real-time computer vision project that uses CNN-based face detection and feature extraction to identify 20 facial attributes from live video and datasets.',
    role: 'Computer Vision, MTCNN, Multi-CNN',
    interactiveType: 'preview',
    thumbnail: facialAttributeThumb,
    accent: 'linear-gradient(135deg, rgba(255, 159, 67, 0.72), rgba(255, 94, 98, 0.56))',
    stack: ['MTCNN', 'CNNs', 'Multi-CNN', 'Live Video'],
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
  {
    slug: 'autonomous-tractor',
    title: 'Autonomous Tractor',
    category: 'Embedded Systems / Robotics',
    year: '2023',
    summary:
      'An autonomous tractor prototype built to drive straight, turn, and trigger emergency stops using onboard sensors, control logic, Bluetooth communication, and a custom interface.',
    role: 'Arduino Uno, Bluetooth, Sensors, GUI',
    interactiveType: 'preview',
    thumbnail: autonomousTractorThumb,
    accent: 'linear-gradient(135deg, rgba(255, 255, 255, 0.55), rgba(178, 141, 255, 0.44))',
    stack: ['Arduino Uno', 'Bluetooth', 'Ultrasonic Sensor', 'MPU6050'],
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
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
