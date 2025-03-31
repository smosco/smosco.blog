import ArticleCard from '@/components/ArticlleCard';
import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';

export default function PostsPage() {
  const articles = getAllPosts();

  const orderedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="">
      <ul className="space-y-4">
        {orderedArticles.map((article) => (
          <li key={article.slug}>
            <Link href={`/${article.slug}`} className="block">
              <ArticleCard
                category={article.category}
                title={article.title}
                date={new Date(article.date)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, '.')}
                thumbnail={article.thumbnail}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
