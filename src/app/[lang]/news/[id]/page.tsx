import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@modules/Insights';
import { NEWS } from '@shared/data/news';
import { LOCALES, pick, type Locale } from '@shared/i18n';
import { getPost } from '@shared/services/news.service';
import { pageMetadata } from '@shared/utils/seo';

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.flatMap((lang) => NEWS.map((n) => ({ lang, id: n.id })));

export async function generateMetadata({ params }: PageProps<'/[lang]/news/[id]'>): Promise<Metadata> {
  const { lang, id } = await params;
  const post = getPost(id);
  const l = lang as Locale;
  return post ? pageMetadata(l, pick(post.t, 'title', l), `/news/${id}`, pick(post.t, 'excerpt', l)) : {};
}

export default async function Page({ params }: PageProps<'/[lang]/news/[id]'>) {
  const { lang, id } = await params;
  const post = getPost(id);
  if (!post) notFound();
  return <ArticlePage locale={lang as Locale} post={post} />;
}
