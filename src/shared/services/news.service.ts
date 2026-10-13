import 'server-only';
import { cache } from 'react';
import { listAll } from '@shared/api/ucode';
import { isPublished, toNews } from '@shared/api/ucode/mappers';
import { NEWS } from '@shared/data';
import type { NewsItem } from '@shared/types';
import { fromSource } from './source';

const byDate = (a: NewsItem, b: NewsItem) => (a.date < b.date ? 1 : -1);

const loadNews = cache(() =>
  fromSource<NewsItem[]>(
    'news',
    async () => (await listAll('news', { cacheTags: ['news'] })).filter(isPublished).map(toNews),
    () => NEWS,
    [],
  ),
);

/** Published posts for the Content Hub, or press mentions for the Newsroom, newest first. */
export const getPosts = async (press = false) =>
  (await loadNews()).filter((n) => (n.category === 'Press') === press).sort(byDate);

export const getAllPosts = async () => [...(await loadNews())].sort(byDate);

export const getPost = async (id: string) => (await loadNews()).find((n) => n.id === id);
