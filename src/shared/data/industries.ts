import type { Industry } from '@shared/types';

export const INDUSTRIES: Industry[] = [
  'FinTech',
  'AI',
  'SaaS',
  'E-commerce',
  'AgroTech',
  'EdTech',
  'HealthTech',
  'Logistics',
  'GreenTech',
  'InsurTech',
  'Industrial Tech',
].map((name) => ({ id: name.toLowerCase().replace(/[^a-z]+/g, '-'), name }));

export const industryName = (id: string) => INDUSTRIES.find((i) => i.id === id)?.name ?? id;
