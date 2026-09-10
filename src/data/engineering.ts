export type EngineeringDomain = {
  id: string;
  title: string;
  summary: string;
  topics: string[];
};

/**
 * Add future domains (cybersecurity, robotics, computer vision, IoT, systems
 * engineering) by appending objects here. Sections render from this list.
 */
export const engineeringDomains: EngineeringDomain[] = [
  {
    id: 'embedded',
    title: 'Embedded Systems',
    summary:
      'Microcontrollers, sensors, IoT, and hardware/software integration for intelligent monitoring systems.',
    topics: ['ESP32', 'Sensors', 'Firmware', 'IoT'],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    summary:
      'Search algorithms, optimization, intelligent agents, and AI systems that reason over problems.',
    topics: ['Search', 'Optimization', 'Agents'],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    summary:
      'Models, data processing, experimentation, and practical ML applications — still expanding through projects.',
    topics: ['Data', 'Models', 'Experimentation'],
  },
  {
    id: 'software',
    title: 'Software Engineering',
    summary:
      'Web applications, APIs, databases, and system architecture for products that people actually use.',
    topics: ['Web', 'APIs', 'Architecture'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    summary:
      'Cloud infrastructure, deployment, containers, and automation — growing alongside shipped applications.',
    topics: ['Deploy', 'Containers', 'Automation'],
  },
];
