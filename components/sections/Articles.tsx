import { parseStringPromise } from 'xml2js';
import ArticlesClient from './ArticlesClient';

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category?: string[];
}

async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await fetch('https://medium.com/feed/@asraf.muhammad07', {
      next: { revalidate: 3600 },
    });
    const xml = await res.text();
    const parsed = await parseStringPromise(xml);
    const items = parsed.rss.channel[0].item || [];
    return items.map((item: any) => ({
      title: item.title[0],
      link: item.link[0],
      pubDate: item.pubDate[0],
      description: item.content?.encoded?.[0] || item.description?.[0] || '',
      category: item.category?.map((c: any) => c) || [],
    }));
  } catch {
    return [];
  }
}

export default async function Articles() {
  const articles = await fetchArticles();
  if (articles.length === 0) return null;
  return <ArticlesClient articles={articles} />;
}
