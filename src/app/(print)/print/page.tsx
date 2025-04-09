'use client';

import { projects } from '@/data/projects';
import ProjectSection from '@/components/print/ProjectSection';
import { Github, Mail, Book } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="px-6 py-10 max-w-[680px] mx-auto text-gray-800">
      {/* Profile Section */}
      <section className=" mb-12">
        <div className="flex items-start gap-4">
          {/* Name & Role */}
          <div>
            <h1 className="text-2xl font-bold">한현</h1>
            <p className="text-gray-600 mt-1">Frontend Engineer</p>
          </div>
        </div>

        {/* Highlight Sentence */}
        <div className="mt-8 text-lg font-medium text-gray-900">
          사용자에게 닿는 결과를 고민하며, 끝까지 책임지는 개발자입니다. 👨‍💻
        </div>

        {/* Description */}
        <div className="mt-4 text-base leading-relaxed text-gray-700">
          기획부터 함께 고민하고, 불완전한 흐름을 발견하면 더 나은 방향을
          제안합니다. 팀원이 빠진 프로젝트도 끝까지 완수했고, 주말에도 자리를
          지켰습니다. 화려한 말보다, 일하는 방식과 꾸준함으로 신뢰를 얻고
          싶습니다.
        </div>

        <div className="mt-4 text-base leading-relaxed text-gray-700">
          모르는 기술은 직접 실험하며 익히고, 설득이 필요할 땐 수치와 근거로
          설명합니다. 출근길 지하철에서도 문제 해결을 고민하고, 팀의 어려움엔
          먼저 나서서 함께 풀어냅니다.
        </div>

        <div className="mt-6 text-base leading-relaxed text-gray-700">
          작은 기능에도 사용자의 맥락과 목표를 담아내는 것, 그게 제가 제품을
          만드는 프론트엔드 개발자로서 가장 중요하게 생각하는 부분입니다. 💪
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <div className="w-6 h-6 rounded-full bg-gray-400"></div>
            </div>
            <span>1998. 05. 13</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <Book className="w-6 h-6 text-gray-500" />
            </div>
            <a href="https://smosco.dev" className="underline text-gray-700">
              https://smosco.dev
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <Mail className="w-6 h-6 text-gray-500" />
            </div>
            <span>go1ruf2tk3@gmail.com</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <Github className="w-6 h-6 text-gray-500" />
            </div>
            <a
              href="https://github.com/smosco"
              className="underline text-gray-700"
            >
              https://github.com/smosco
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>

        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>
              Next.js, React.js, Vite, TypeScript, JavaScript, Tailwind CSS,
              styled-components,SCSS
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>Tanstack Query, Zustand, Redux</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>Git, GitHub, GitHub Actions</span>
          </li>
        </ul>
      </section>

      {/* Project Sections */}
      {projects.map((project, i) => (
        <ProjectSection key={i} {...project} />
      ))}
    </div>
  );
}
