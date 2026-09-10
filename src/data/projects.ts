import { projectLinks } from '../config/socials';

export type ProjectDetails = {
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  challenges: string[];
  learned: string[];
};

export type Project = {
  id: string;
  title: string;
  category: string;
  featured?: boolean;
  description: string;
  technologies: string[];
  features: string[];
  github: string;
  demo: string;
  image: string;
  details: ProjectDetails;
};

export const projects: Project[] = [
  {
    id: 'lumora',
    title: 'Smart LPG Gas Monitoring & Leakage Detection System',
    category: 'Embedded · IoT · Intelligent Monitoring',
    featured: true,
    description:
      'Lumora is an embedded/IoT system for LPG cylinder monitoring — combining load cells, gas sensing, onboard processing, and alerts into a practical safety and consumption platform.',
    technologies: [
      'ESP32',
      'HX711',
      'Load cells',
      'MQ-series gas sensor',
      'OLED',
      'Embedded C/C++',
      'IoT',
    ],
    features: [
      'Gas leakage detection',
      'Cylinder weight monitoring',
      'LPG consumption tracking',
      'Gas-level estimation',
      'Depletion prediction',
      'Audible alarm and LED warnings',
    ],
    github: projectLinks.lumora.github,
    demo: projectLinks.lumora.demo,
    image: 'lumora',
    details: {
      problem:
        'LPG users often discover leaks too late, and remaining gas is guessed rather than measured. That creates safety risk and operational uncertainty.',
      solution:
        'Lumora pairs an ESP32 with load cells (HX711) and an MQ-series gas sensor to estimate remaining fuel, watch for leakage, and raise audible/visual alerts. A connected interface extends the system beyond the device.',
      architecture:
        'LPG cylinder → load cell + MQ sensor → ESP32 processing → OLED local display → alarm/LED path, with a cloud-connected monitoring interface for status and signup/access.',
      technologies: [
        'ESP32 microcontroller',
        'HX711 amplifier',
        'Load cells',
        'MQ-series gas sensor',
        'OLED display',
        'Embedded software',
        'IoT architecture',
      ],
      challenges: [
        'Stable weight readings from load cells in a real environment',
        'Separating leakage events from normal sensor noise',
        'Estimating remaining gas and depletion from weight over time',
        'Coordinating local alerts with a connected software layer',
      ],
      learned: [
        'Hardware/software integration is a systems problem, not just firmware',
        'Sensor fusion and calibration matter as much as the algorithm',
        'Safety-oriented products need clear, fail-visible alerting',
      ],
    },
  },
  {
    id: 'iles',
    title: 'Internship Login Evaluation System',
    category: 'Software Systems',
    description:
      'A web system designed to manage and evaluate internship login and evaluation workflows. Replace this description with the full product narrative when ready.',
    technologies: ['JavaScript', 'React', 'Web', 'Evaluation workflows'],
    features: [
      'Internship login / evaluation workflow management',
      'Structured evaluation flow (details to be expanded)',
      'Deployed web application',
    ],
    github: projectLinks.iles.github,
    demo: projectLinks.iles.demo,
    image: 'iles',
    details: {
      problem:
        'Internship evaluation and login processes are often fragmented across spreadsheets, forms, and informal tracking.',
      solution:
        'A dedicated web application that centralizes internship login and evaluation workflows. Expand this section with the exact modules you implemented.',
      architecture:
        'Client web application with a structured evaluation workflow. Add backend, auth, and data-store details here when you document the stack.',
      technologies: ['React', 'JavaScript', 'Web application architecture'],
      challenges: [
        'Add the hardest engineering problems you solved on this project',
      ],
      learned: [
        'Add what this project taught you about product and systems design',
      ],
    },
  },
  {
    id: 'events',
    title: 'Event Booking System',
    category: 'Software Systems',
    description:
      'A web-based event booking and management system. Expand features and architecture here as you document the implementation.',
    technologies: ['JavaScript', 'Web', 'Booking workflows'],
    features: [
      'Event booking and management',
      'Web-based user flow',
      'Deployed application',
    ],
    github: projectLinks.events.github,
    demo: projectLinks.events.demo,
    image: 'events',
    details: {
      problem:
        'Event reservation and management often needs a dedicated system rather than ad-hoc communication.',
      solution:
        'A deployed web application for booking and managing events. Replace this with the specific booking, inventory, or admin flows you built.',
      architecture:
        'Web client with booking workflows. Document APIs, database, and deployment topology here.',
      technologies: ['JavaScript', 'Web application', 'Hosting / deployment'],
      challenges: [
        'Add concurrency, data integrity, or UX challenges from this build',
      ],
      learned: [
        'Add the software-engineering lessons from shipping this system',
      ],
    },
  },
];
