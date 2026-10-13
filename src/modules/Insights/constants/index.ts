export const TABS = [
  ['hub', 'Content Hub', ''],
  ['reports', 'Industry reports', '/reports'],
  ['press', 'Newsroom', '/press'],
] as const;

export type Tab = (typeof TABS)[number][0];
