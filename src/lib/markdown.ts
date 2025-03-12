import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createHighlighter } from 'shiki';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Post } from '@/types/Post';

const contentDirectory = path.join(process.cwd(), 'src', 'contents');

// 모든 글 목록 가져오기
export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');

    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as Omit<Post, 'slug'>),
    };
  });
}

// Shiki 하이라이터 캐싱 (성능 최적화)
let highlighterCache: any = null;

async function getShikiHighlighter() {
  if (!highlighterCache) {
    highlighterCache = await createHighlighter({
      themes: ['vitesse-dark', 'vitesse-light'], // 사용 가능한 테마 목록 지정
      langs: ['javascript', 'typescript', 'json', 'bash', 'sql', 'tsx'], // 필요한 언어 로드
    });
  }
  return highlighterCache;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const decodedSlug = decodeURIComponent(slug);
  const fileName = fs
    .readdirSync(contentDirectory)
    .find((file) => file.replace(/\.md$/, '') === decodedSlug);

  if (!fileName) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // GFM (표 지원) 추가
  const processedMarkdown = await remark()
    .use(gfm) //  표, 체크박스, 자동 링크 등 지원
    .use(html)
    .process(content);

  let contentHtml = processedMarkdown.toString();

  // 코드 하이라이팅 적용
  const highlighter = await getShikiHighlighter();
  contentHtml = contentHtml.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      return highlighter.codeToHtml(code, {
        theme: 'vitesse-dark', // ✅ 테마 지정
        lang,
      });
    },
  );

  return {
    slug,
    ...data,
    contentHtml,
  } as Post;
}
