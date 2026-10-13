import type { Source } from '@shared/types';

/* Outside media and research the Insights page points to. Add a url only when it is confirmed. */
export const MEDIA: Source[] = [
  { name: 'Pivot' },
  { name: 'Spot', url: 'https://www.spot.uz' },
  { name: 'Kapital', url: 'https://kapital.uz' },
  { name: 'Kursiv', url: 'https://kursiv.media' },
  { name: 'Stanbase' },
  { name: 'Startupbase' },
  { name: 'Review' },
];

export const REPORTS: Source[] = [
  {
    name: 'RISE Research',
    text: 'Venture capital research on Central Asia: deal counts, round sizes and active investors.',
  },
  {
    name: 'StartupBlink',
    text: 'Global Startup Ecosystem Index: how countries and cities rank each year.',
    url: 'https://www.startupblink.com',
  },
  {
    name: 'Startup Genome',
    text: 'Global Startup Ecosystem Report: ecosystem value, funding and talent benchmarks.',
    url: 'https://startupgenome.com',
  },
  {
    name: 'Dealroom',
    text: 'Company and funding data for startups, investors and ecosystems.',
    url: 'https://dealroom.co',
  },
];
