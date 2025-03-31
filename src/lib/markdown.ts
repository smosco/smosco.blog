// lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createHighlighter } from 'shiki';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Post } from '@/types/Post';

const contentDirectory = path.join(process.cwd(), 'src', 'contents');

function makeSlug(title: string): string {
  return title
    .replace(/\[.*?\]/g, '') // [Next Table Order #2] 제거
    .trim()
    .toLowerCase()
    .replace(/[^\w가-힣\s-]/g, '')
    .replace(/\s+/g, '-');
}

// 모든 글 목록
export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames.map((fileName) => {
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const slug = makeSlug(data.title); // 사람이 보기 좋은 slug 생성

    return {
      id: String(data.id), // id는 필수
      slug,
      ...(data as Omit<Post, 'slug' | 'id'>),
    };
  });
}

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

export async function getPostById(id: string): Promise<Post | null> {
  const fileName = fs.readdirSync(contentDirectory).find((file) => {
    const content = fs.readFileSync(path.join(contentDirectory, file), 'utf8');
    const { data } = matter(content);
    return String(data.id) === id;
  });

  if (!fileName) return null;

  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedMarkdown = await remark().use(gfm).use(html).process(content);
  let contentHtml = processedMarkdown.toString();

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
    id: String(data.id),
    slug: makeSlug(data.title),
    ...data,
    contentHtml,
  } as Post;
}
