import { industryName } from '@shared/data/industries';
import type { PortfolioItem } from '@shared/types';

export const geoOf = (it: PortfolioItem) => it.startup.city || it.startup.country || '';
export const statusOf = (it: PortfolioItem) => (it.startup.status === 'exit' ? 'Exited' : 'Active');

/** Plain data for the client-side filter, so the browser gets no more than the list needs. */
export interface Row {
  id: string;
  name: string;
  text: string;
  initials: string;
  sector: string;
  sectorName: string;
  stage: string;
  geo: string;
  status: 'Exited' | 'Active';
}

export const toRow = (it: PortfolioItem, initials: string): Row => ({
  id: it.id,
  name: it.startup.name,
  text: it.text,
  initials,
  sector: it.startup.industry,
  sectorName: industryName(it.startup.industry),
  stage: it.startup.stage,
  geo: geoOf(it),
  status: statusOf(it),
});
