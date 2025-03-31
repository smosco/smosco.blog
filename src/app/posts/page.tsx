import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';

export default function PostsPage() {
  const posts = getAllPosts();

  const orderedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="">
      <ul className="space-y-4">
        {orderedPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.id}-${post.slug}`} className="block">
              <PostCard
                category={post.category}
                title={post.title}
                date={new Date(post.date)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, '.')}
                thumbnail={post.thumbnail}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
