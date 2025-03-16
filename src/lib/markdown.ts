import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createHighlighter } from 'shiki';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import slugify from 'slugify';
import { Post } from '@/types/Post';

const contentDirectory = path.join(process.cwd(), 'src', 'contents');

// 🔹 모든 글 목록 가져오기
export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames.map((fileName) => {
    //  파일명에서 .md 제거
    const rawTitle = fileName.replace(/\.md$/, '');

    //  slugify 적용하여 slug 변환 (파일명에도 동일한 변환 적용)
    const slug = slugify(rawTitle, { lower: true, strict: true });

    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    return {
      slug, //  slugified title 저장
      ...(data as Omit<Post, 'slug'>),
    };
  });
}

//  Shiki 하이라이터 캐싱 (성능 최적화)
let highlighterCache: any = null;

async function getShikiHighlighter() {
  if (!highlighterCache) {
    highlighterCache = await createHighlighter({
      themes: ['vitesse-dark', 'vitesse-light'],
      langs: ['javascript', 'typescript', 'json', 'bash', 'sql', 'tsx'],
    });
  }
  return highlighterCache;
}

// 🔹 특정 Slug로 포스트 가져오기
export async function getPostBySlug(slug: string): Promise<Post> {
  // ✅ slugify 적용해서 slug 변환
  const normalizedSlug = slugify(slug, { lower: true, strict: true });

  // ✅ 디버깅 로그 추가
  console.log(`🔎 Searching for slug: ${normalizedSlug}`);
  console.log(`📂 Available files:`, fs.readdirSync(contentDirectory));

  // ✅ 파일 리스트에서 slugified 된 값과 비교하여 찾기
  const fileName = fs.readdirSync(contentDirectory).find((file) => {
    const rawTitle = file.replace(/\.md$/, '');
    return slugify(rawTitle, { lower: true, strict: true }) === normalizedSlug;
  });

  if (!fileName) {
    console.error(`🔴 ERROR: Post not found for slug: ${slug}`);
    console.error(`Available files:`, fs.readdirSync(contentDirectory));
    throw new Error(`Post not found: ${slug}`);
  }

  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // ✅ GFM (표 지원) 추가
  const processedMarkdown = await remark().use(gfm).use(html).process(content);

  let contentHtml = processedMarkdown.toString();

  // ✅ 코드 하이라이팅 적용
  const highlighter = await getShikiHighlighter();
  contentHtml = contentHtml.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      return highlighter.codeToHtml(code, {
        theme: 'vitesse-dark',
        lang,
      });
    },
  );

  return {
    slug: normalizedSlug,
    ...data,
    contentHtml,
  } as Post;
}
