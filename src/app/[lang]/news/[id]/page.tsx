import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@modules/Insights';
import { LOCALES, pick, type Locale } from '@shared/i18n';
import { getAllPosts, getPost } from '@shared/services/news.service';
import { pageMetadata } from '@shared/utils/seo';

// posts published in ucode later are rendered on first visit, then cached
export const dynamicParams = true;
export const generateStaticParams = async () => {
  const posts = await getAllPosts();
  return LOCALES.flatMap((lang) => posts.map((n) => ({ lang, id: n.id })));
};

export async function generateMetadata({ params }: PageProps<'/[lang]/news/[id]'>): Promise<Metadata> {
  const { lang, id } = await params;
  const post = await getPost(id);
  const l = lang as Locale;
  return post ? pageMetadata(l, pick(post.t, 'title', l), `/news/${id}`, pick(post.t, 'excerpt', l)) : {};
}

export default async function Page({ params }: PageProps<'/[lang]/news/[id]'>) {
  const { lang, id } = await params;
  const post = await getPost(id);
  if (!post) notFound();
  return <ArticlePage locale={lang as Locale} post={post} />;
}
