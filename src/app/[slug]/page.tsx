import { Metadata } from 'next';
import MarkdownContent from '@/components/MarkdownContent';
import { getPostBySlug } from '@/lib/markdown';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'BIENGUAL Blog',
      description: 'smosco의 테크 블로그',
      openGraph: {
        type: 'website',
        title: 'BIENGUAL Blog',
        description: 'smosco의 테크 블로그',
        url: `https://smosco-dev.vercel.app/blog/${params.slug}`,
        images: [
          {
            url: 'https://smosco-dev.vercel.app/images/default-og.png',
            width: 1200,
            height: 630,
            alt: 'Default blog og image',
          },
        ],
      },
    };
  }

  return {
    title: post.title,
    description: 'smosco의 테크 블로그',
    openGraph: {
      type: 'article',
      title: post.title,
      description: 'smosco의 테크 블로그',
      url: `https://smosco-dev.vercel.app/${params.slug}`,
      images: [
        {
          url: post.thumbnail
            ? `https://smosco-dev.vercel.app/${post.thumbnail}`
            : 'https://smosco-dev.vercel.app/images/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="flex flex-col space-y-4 mb-32">
        <h1 className="text-3xl font-bold text-center">
          글을 찾을 수 없습니다.
        </h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col space-y-4 mb-32">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="flex items-center text-sm text-gray-600 space-x-2">
        <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
      </p>
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full aspect-video object-cover rounded-lg mb-4 brightness-90"
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
          ← 돌아가기 /articles
        </a>
      </footer>
    </section>
  );
}
