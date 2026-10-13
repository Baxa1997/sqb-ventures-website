import 'server-only';
import { cache } from 'react';
import { listAll } from '@shared/api/ucode';
import { isPublished, toPage } from '@shared/api/ucode/mappers';
import { PAGES } from '@shared/data';
import type { ContentPage } from '@shared/types';
import { fromSource } from './source';

/** Service pages such as the privacy policy. */
export const getPages = cache(() =>
  fromSource<ContentPage[]>(
    'pages',
    async () => (await listAll('pages', { cacheTags: ['pages'] })).filter(isPublished).map(toPage),
    () => PAGES,
    [],
  ),
);

export const getPage = async (slug: string) => (await getPages()).find((p) => p.slug === slug);
