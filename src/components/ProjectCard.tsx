import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';

export const ProjectCard = ({
  title,
  slug,
  shortDescription,
  thumbnail,
  techStack,
  demoLink,
  githubLink,
}: {
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  techStack: string[];
  demoLink?: string;
  githubLink?: string;
}) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:translate-y-[-8px] dark:bg-gray-900">
    {/* 상단 그라데이션 라인 */}
    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />

    <div className="relative flex flex-col overflow-hidden border border-gray-100 border-t-0 rounded-2xl dark:border-gray-800">
      {/* 썸네일 */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={thumbnail || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* 위에서 아래로 흐리는 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100" />
      </div>

      {/* 카드 본문 */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/projects/${slug}`}>
          <h3 className="mb-2 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>

          {/* 한 줄 설명 */}
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {shortDescription}
          </p>

          {/* 기술 스택 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </Link>

        {/* 하단 링크 영역 */}
        <div className="flex gap-3">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              aria-label="데모 보기"
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              aria-label="GitHub 저장소 보기"
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);
