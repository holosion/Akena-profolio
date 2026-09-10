export type KnowledgeNode = {
  id: string;
  title: string;
  summary: string;
};

export const aimlMap: KnowledgeNode[] = [
  {
    id: 'search',
    title: 'Search algorithms',
    summary: 'Structured exploration of problem spaces.',
  },
  {
    id: 'optimization',
    title: 'Optimization',
    summary: 'Finding better solutions under constraints.',
  },
  {
    id: 'nn',
    title: 'Neural networks',
    summary: 'Learned representations from data.',
  },
  {
    id: 'rl',
    title: 'Reinforcement learning',
    summary: 'Agents that improve through interaction.',
  },
  {
    id: 'ml',
    title: 'Machine learning',
    summary: 'Models, data pipelines, and evaluation.',
  },
  {
    id: 'cv',
    title: 'Computer vision',
    summary: 'Perception from images and video — expanding.',
  },
  {
    id: 'agents',
    title: 'Intelligent agents',
    summary: 'Systems that sense, decide, and act.',
  },
];
