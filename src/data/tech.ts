export type TechItem = {
  name: string;
  note?: string;
};

export type TechGroup = {
  id: string;
  label: string;
  items: TechItem[];
};

export const techStack: TechGroup[] = [
  {
    id: 'embedded',
    label: 'Embedded',
    items: [{ name: 'ESP32' }, { name: 'Arduino' }, { name: 'C/C++' }],
  },
  {
    id: 'aiml',
    label: 'AI/ML',
    items: [{ name: 'Python' }, { name: 'Scikit-learn' }],
  },
  {
    id: 'software',
    label: 'Software',
    items: [
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: [
      { name: 'SQL' },
      { name: 'PostgreSQL' },
      { name: 'NumPy' },
      { name: 'Pandas' },
      { name: 'Matplotlib' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud/DevOps',
    items: [{ name: 'Supabase' }, { name: 'Docker' }, { name: 'Linux' }],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [{ name: 'Git' }, { name: 'GitHub' }],
  },
];
