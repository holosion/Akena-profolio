export type TimelineEntry = {
  id: string;
  title: string;
  summary: string;
};

export const journey: TimelineEntry[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    summary: 'Programming and computer science.',
  },
  {
    id: 'ai',
    title: 'AI',
    summary: 'Artificial intelligence and algorithms.',
  },
  {
    id: 'embedded',
    title: 'Embedded',
    summary: 'Microcontrollers, sensors, and IoT.',
  },
  {
    id: 'ml',
    title: 'Machine learning',
    summary: 'Data, models, and intelligent systems.',
  },
  {
    id: 'future',
    title: 'Future',
    summary: 'AI + embedded + cloud + cybersecurity.',
  },
];
