import { NEWS } from '@shared/data';
import type { NewsItem } from '@shared/types';

const byDate = (a: NewsItem, b: NewsItem) => (a.date < b.date ? 1 : -1);

/** Published posts for the Content Hub, or press mentions for the Newsroom. */
export const getPosts = (press = false) =>
  NEWS.filter((n) => (n.category === 'Press') === press).sort(byDate);

export const getPost = (id: string) => NEWS.find((n) => n.id === id);
