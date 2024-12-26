import MarkdownContent from '@/components/MarkdownContent';
import { getPostBySlug } from '@/lib/markdown';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <div className="flex flex-col space-y-4 mb-32">
        <h1 className="text-3xl font-bold text-center">
          포스트를 찾을 수 없습니다.
        </h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col space-y-4 mb-32">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 uppercase tracking-wide font-light border border-gray-300 rounded-lg py-1 px-2">
          {post.category}
        </span>
        <a
          className="opacity-50 transition-opacity duration-300 hover:opacity-90"
          title="Edit"
          // href={`/contents/${post.category}/${post.slug}.md`}
          href={`/contents/${post.slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/pencil.svg"
            alt="Edit button"
            width="18px"
            height="18px"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="flex items-center text-sm text-gray-600 space-x-2">
        <span>{post.readingTime} min read</span>
        <span>|</span>
        <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
      </p>
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full rounded-lg mb-4"
        />
      )}
      <MarkdownContent>
        <article
          className="prose prose-lg text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </MarkdownContent>
      <hr className="mt-8" />
      <footer>
        <a
          href="/articles"
          className="block mt-24 text-lg underline text-blue-500 hover:text-blue-700"
        >
          ← Back to /articles
        </a>
      </footer>
    </section>
  );
}
