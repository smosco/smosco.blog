import React from 'react';
import { Github, Mail, Book, UserRound } from 'lucide-react';

function HomePage() {
  return (
    <div className="px-6 py-10 max-w-[680px] mx-auto text-gray-800">
      {/* Header */}
      <section className="mb-12">
        <div className="flex items-start gap-4">
          {/* Name & Role */}
          <div>
            <h1 className="text-2xl font-bold">한현</h1>
            <p className="text-gray-600 mt-1">Frontend Engineer</p>
          </div>
        </div>

        {/* Highlight Sentence */}
        <div className="mt-8 text-lg font-medium text-gray-900">
          사용자 경험과 팀의 흐름을 함께 고민하는, 유연하고 실용적인
          개발자입니다. 🤝
        </div>

        {/* Description */}
        <div className="mt-4 text-base leading-relaxed text-gray-700">
          반복되는 흐름 속의 불편함을 정의하고, 작은 구조의 변화로 개선하는 데
          익숙합니다. 실시간 시스템의 병목을 해결하거나, 학습 도구의 상태 흐름을
          정비하며 사용자가 더 적은 행동으로도 원하는 결과에 도달할 수 있도록
          도왔습니다.
        </div>

        <div className="mt-4 text-base leading-relaxed text-gray-700">
          기획 단계부터 논의에 참여하고, 더 나은 흐름이 있다면 열린 자세로
          제안합니다. 작업 방향을 빠르게 맞추기 위해 배운 내용을 자주 공유하고,
          새로운 기술은 직접 실험한 뒤 수치와 근거로 팀을 설득합니다.
        </div>

        <div className="mt-4 text-base leading-relaxed text-gray-700">
          사용자 입장에서 문제를 바라보며, 협업 과정에서는 수용적이고 유연하게
          소통합니다. 다양한 관점에서 피드백을 받아들이며, 함께 더 좋은 방향을
          찾는 과정을 즐깁니다.
        </div>

        <div className="mt-6 text-base leading-relaxed text-gray-700">
          기능 하나에도 사용자 맥락과 목표가 자연스럽게 녹아들도록 만드는 것,
          그게 제가 프론트엔드 개발자로서 가장 집중하는 부분입니다. 💪
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <UserRound className="w-6 h-6 text-gray-500" />
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
              Next.js, React.js, TypeScript, Javascript, styled-components,
              Tailwind CSS, SCSS
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>React Query, Zustand, Redux</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>Git, GitHub, GitHub Actions</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
