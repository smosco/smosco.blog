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
    .replace(/\[.*?\]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^\w가-힣\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames.map((fileName) => {
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const slug = makeSlug(data.title);

    return {
      id: String(data.id),
      slug,
      ...(data as Omit<Post, 'slug' | 'id'>),
    };
  });
}

let highlighterCache: any = null;
async function getShikiHighlighter() {
  if (!highlighterCache) {
    highlighterCache = await createHighlighter({
      themes: ['vitesse-dark'],
      langs: ['javascript', 'typescript', 'json', 'bash', 'sql', 'tsx'],
    });
  }
  return highlighterCache;
}

export async function getPostById(id: string): Promise<Post | null> {
  const fileNames = fs.readdirSync(contentDirectory);

  for (const fileName of fileNames) {
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (String(data.id) === id) {
      const processedMarkdown = await remark()
        .use(gfm)
        .use(html)
        .process(content);
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
  }

  return null;
}

// 가벼운 메타데이터만 추출 (generateMetadata 용)
export function getPostMetaById(
  id: string,
): { title: string; thumbnail?: string } | null {
  const fileNames = fs.readdirSync(contentDirectory);

  for (const fileName of fileNames) {
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    if (String(data.id) === id) {
      return {
        title: data.title,
        thumbnail: data.thumbnail,
      };
    }
  }

  return null;
}
