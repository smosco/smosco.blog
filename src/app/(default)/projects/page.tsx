import React from 'react';
import { ProjectCard } from '@/components/ProjectCard';

import { Github, Mail } from 'lucide-react';

const socialLinks = [
  {
    icon: Mail,
    href: 'mailto:go1ruf2tk3@gmail.com',
    label: 'Email',
  },
  {
    icon: Github,
    href: 'https://github.com/smosco',
    label: 'GitHub',
  },
];

const PortfolioPage = () => (
  <div className="px-4">
    <header className="mt-4 text-center mb-12">
      <h1 className="text-3xl font-bold mb-2">한현 - Frontend Engineer</h1>
      <p className="text-gray-600">
        Product-minded Developer | Crafting Meaningful Solutions
      </p>

      <div className="mt-6 flex justify-center gap-4">
        {socialLinks.map(({ icon: Icon, href, label }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </header>

    <div className="px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <ProjectCard
        title="Next Table Order"
        slug="next-table-order"
        shortDescription="웹 기반 테이블 오더 시스템"
        thumbnail="/images/portfolio/next-table-order-thumb.png"
        techStack={[
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Supabase',
          'shadcn/ui',
        ]}
        demoLink="https://next-table-order.vercel.app/"
        githubLink="https://github.com/smosco/next-table-order"
      />
      <ProjectCard
        title="Biengual"
        slug="biengual"
        shortDescription="CNN 뉴스와 YouTube 기반 맞춤형 영어 학습 플랫폼"
        thumbnail="/images/portfolio/biengual-thumb.png"
        techStack={[
          'Next.js',
          'TypeScript',
          'React-Query',
          'Recharts.js',
          'Tailwind CSS',
          'shadcn/ui',
        ]}
        demoLink="https://biengual.store"
        githubLink="https://github.com/Kernel360/F2-BIENGUAL-FE"
      />
      <ProjectCard
        title="React Player Plugin Prompter"
        slug="react-player-plugin-prompter"
        shortDescription="영어 학습을 위한 자막 탐색 최적화 오픈소스 라이브러리"
        thumbnail="/images/portfolio/plugin-prompter-thumb.png"
        techStack={[
          'React',
          'TypeScript',
          'ESBuild',
          'Yarn Workspaces',
          'GitHub Actions',
          'Vite',
          'SCSS',
        ]}
        demoLink="https://www.npmjs.com/package/react-player-plugin-prompter"
        githubLink="https://github.com/smosco/react-player-plugin-prompter"
      />
    </div>
  </div>
);

export default PortfolioPage;
