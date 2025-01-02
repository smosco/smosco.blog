import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

// 특정 글 가져오기
export async function getPostBySlug(slug: string): Promise<Post> {
  // URL-safe 슬러그를 디코딩하여 파일 이름과 비교
  const decodedSlug = decodeURIComponent(slug);

  // 디코딩된 슬러그와 파일 이름 비교
  const fileName = fs
    .readdirSync(contentDirectory)
    .find((file) => file.replace(/\.md$/, '') === decodedSlug);

  if (!fileName) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(gfm).use(html).process(content);

  return {
    slug,
    ...data,
    contentHtml: processedContent.toString(),
  } as Post;
}
