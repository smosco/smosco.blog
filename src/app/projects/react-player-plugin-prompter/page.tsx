'use client';

import { useRef, useEffect, useState } from 'react';
import { VideoPlayer } from '@/components/YouTubePlayer';
import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';
import { Play, List, Focus } from 'lucide-react';

function CoreFeatures() {
  const features = [
    {
      icon: <Play className="w-10 h-10 text-blue-500" />,
      title: '자막 동기화',
      description:
        '영상 재생 시간에 맞춰 자막이 자동으로 스크롤되며 정확한 타이밍에 표시됩니다.',
    },
    {
      icon: <List className="w-10 h-10 text-green-500" />,
      title: '라인 및 블록 모드',
      description:
        '한 줄씩 보기(집중 학습) 또는 전체 보기(문맥 학습) 모드를 제공합니다.',
    },
    {
      icon: <Focus className="w-10 h-10 text-purple-500" />,
      title: '포커스 모드',
      description:
        '현재 재생 중인 자막으로 빠르게 이동할 수 있는 기능을 제공합니다.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">핵심 기능</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center p-6">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureSection({
  title,
  description,
  videoSrc,
  posterSrc,
  features,
  note,
}: {
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  features: string[];
  note?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`grid md:grid-cols-2 gap-8 items-center py-16 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        <ul className="list-disc pl-5 space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        {note && <p className="mt-4 text-sm text-warning">{note}</p>}
      </div>
      <VideoPlayer src={videoSrc} poster={posterSrc} />
    </section>
  );
}

export default function ReactPlayerPluginPage() {
  return (
    <div className="container mx-auto py-12">
      {/* 히어로 섹션 */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-zinc-700 pb-2">
          React Player Plugin Prompter
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          영상 기반 영어 학습 서비스를 위한 자막 탐색 및 하이라이트 최적화
          오픈소스 라이브러리입니다.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            className="rounded-full"
            size="lg"
            onClick={() =>
              window.open(
                'https://www.npmjs.com/package/react-player-plugin-prompter',
                '_blank',
              )
            }
          >
            NPM 패키지 보기
          </Button>
          <Button
            className="rounded-full"
            size="lg"
            variant="outline"
            onClick={() =>
              window.open(
                'https://github.com/smosco/react-player-plugin-prompter',
                '_blank',
              )
            }
          >
            GitHub 저장소
          </Button>
        </div>
      </section>

      {/* 프로젝트 배경 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            프로젝트 배경
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                React Player Plugin Prompter는 영어 학습 플랫폼{' '}
                <strong className="text-violet-800">Biengual</strong>의
                필요성에서 시작되었습니다. 자막 제어와 학습 최적화를 위한 기능이
                필요했지만, 적합한 라이브러리를 찾을 수 없어 직접 개발하기로
                결정했습니다.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                React-Player를 기반으로 자막 동기화, 탐색, 맞춤형 보기 모드를
                추가하여 최적의 학습 경험을 제공합니다.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <VideoPlayer
                src="/videos/project-background.mp4"
                poster="/images/project-background-poster.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 기능 */}
      <CoreFeatures />

      {/* 기능 섹션 */}
      <FeatureSection
        title="자막 동기화"
        description="재생 시간에 맞춰 자막이 자동으로 스크롤됩니다."
        videoSrc="/videos/싱크.mp4"
        posterSrc="/images/싱크썸.png"
        features={[
          '영상 재생에 따라 자막 자동 스크롤',
          '이전/다음 자막으로 빠르게 이동하는 탐색 버튼',
          '정확한 타이밍으로 표시',
        ]}
      />

      <FeatureSection
        title="라인 및 블록 모드"
        description="자막을 한 줄씩 또는 블록 단위로 볼 수 있습니다."
        videoSrc="/videos/모드.mp4"
        posterSrc="/images/모드썸.png"
        features={[
          '한 줄 보기 모드: 한 문장씩 집중 학습 가능',
          '전체 보기 모드: 문맥에 따라 학습 가능',
          '학습 스타일에 따라 모드 전환 가능',
        ]}
      />

      <FeatureSection
        title="포커스 모드"
        description="현재 자막을 하이라이트하여 학습에 집중할 수 있습니다."
        videoSrc="/videos/포커스.mp4"
        posterSrc="/images/포커스썸.png"
        features={[
          '다른 자막 탐색 중 현재 재생 중인 자막으로 돌아오는 기능',
          '끊김 없이 학습 흐름 유지 가능',
        ]}
      />

      {/* 기술적 도전과 해결 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            기술적 도전과 해결
          </h2>
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-4">성능 최적화</h3>
              <p className="text-lg text-gray-700 mb-6">
                사용자들이 자막 탐색 버튼을 빠르게 클릭하며 탐색할 때, 응답
                시간이 느려지고 버퍼링 문제가 발생했습니다. 분석 결과, 자막
                데이터를 순차적으로 검색하는 과정이 원인으로 밝혀졌습니다.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                자막이 시간 순으로 정렬된 점을 활용하여 이진 탐색 알고리즘(
                <span className="italic font-serif">O(log N)</span>)을
                적용했습니다. 이를 통해 자막 탐색 속도를 크게 개선할 수
                있었습니다.
              </p>
            </div>
            <div className="flex gap-6 rounded-lg overflow-hidden">
              <VideoPlayer
                src="/videos/수정전.mp4"
                poster="/images/수정전썸.png"
              />
              <VideoPlayer
                src="/videos/수정후.mp4"
                poster="/images/수정후썸.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 구조 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            프로젝트 구조 및 기술 스택
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">모노레포 구조</h3>
              <p className="text-lg text-gray-700 mb-6">
                Yarn Workspaces를 사용해 라이브러리 개발(core)과 데모
                테스트(demo)를 한 저장소에서 효율적으로 관리했습니다.
              </p>
              <h3 className="text-2xl font-semibold mb-4">기술 스택</h3>
              <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                <li>React와 TypeScript를 활용해 견고한 개발</li>
                <li>esbuild를 사용해 최적화된 빌드 환경 구축</li>
                <li>react-player 기반으로 안정적인 비디오 재생 제공</li>
              </ul>
            </div>
            <Card>
              <CardContent className="p-6">
                <pre className="text-sm overflow-x-auto">
                  <code>
                    {`project-root/
├── core/
│   ├── src/
│   └── package.json
├── demo/
│   ├── src/
│   └── package.json
├── package.json
└── yarn.lock`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 배운 점 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            배운 점과 성장
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">사용자 중심 개발</h3>
              <p className="text-lg text-gray-700 mb-6">
                이번 프로젝트를 통해 사용자 피드백이 얼마나 중요한지 알게
                되었습니다. 포커스 모드와 같은 작은 기능이 사용자 경험에
                결정적인 영향을 준다는 것을 배웠습니다. 이 경험을 통해 개발
                과정에서 항상 사용자 관점을 우선시해야 한다는 것을 다시 한 번
                깨달았습니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">오픈소스 경험</h3>
              <p className="text-lg text-gray-700 mb-6">
                오픈소스 라이브러리를 개발하며 명확한 문서화, 안정적인 API 설계,
                그리고 세심한 버전 관리의 중요성을 배웠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
