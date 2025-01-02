import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';

export default function ArticlesPage() {
  const articles = getAllPosts();
  const orderedArticles = articles.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="container mx-auto">
      <ul className="space-y-4">
        {orderedArticles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>
              <div className="border rounded-lg p-4 hover:shadow-md">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                {/* 날짜 변환 */}
                <p className="text-gray-600">
                  {new Date(article.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
