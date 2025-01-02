import ArticleCard from '@/components/ArticlleCard';
import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';

export default function ArticlesPage() {
  const articles = getAllPosts();

  const orderedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="space-y-4">
        {orderedArticles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>
              <ArticleCard
                category={article.category}
                title={article.title}
                date={new Date(article.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                thumbnail={article.thumbnail}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
