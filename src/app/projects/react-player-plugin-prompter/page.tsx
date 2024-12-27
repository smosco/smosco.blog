'use client';

import { useRef, useEffect, useState } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/FeatureCard';

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
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground md:text-6xl animate-fade-in-up pb-3">
          React Player Plugin Prompter
        </h1>
      </section>

      {/* 프로젝트 개요 */}
      <section className="flex flex-col gap-12 animate-fade-in animation-delay-500">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            프로젝트 소개
          </h2>
          <p className="text-base text-muted-foreground">
            React Player Plugin은 React-Player를 확장하여 자막 동기화, 자막
            탐색, 문장 또는 단어 접근성 등 학습에 최적화된 자막 제어 기능을
            제공합니다. 영어 학습 및 교육 콘텐츠에 적합한 오픈소스
            라이브러리입니다.
          </p>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() =>
              window.open(
                'https://www.npmjs.com/package/react-player-plugin-prompter',
                '_blank',
                'noopener,noreferrer',
              )
            }
          >
            데모보기
          </Button>
        </div>
        <VideoPlayer
          src="/videos/overview.mp4"
          poster="/images/overview-thumbnail.png"
        />
      </section>

      {/* 핵심 기능 */}
      <section className="space-y-12 py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-8">
          핵심 기능
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎯"
            title="라인 및 블록 모드"
            description="두 가지 자막 보기 모드를 지원합니다."
          />
          <FeatureCard
            icon="📚"
            title="단어 선택 및 액션"
            description="자막 내 단어를 클릭하여 커스텀 액션을 실행할 수 있습니다."
          />
          <FeatureCard
            icon="📊"
            title="접근성과 유연성"
            description="자막 스타일링과 다국어 지원을 제공합니다."
          />
        </div>
      </section>

      {/* 기능 섹션 */}
      <FeatureSection
        title="자막 동기화"
        description="재생 시간에 맞춰 자막이 자동으로 스크롤됩니다."
        videoSrc="/videos/싱크.mp4"
        posterSrc="/images/싱크썸.png"
        features={['재생 시간 동기화', '자막 탐색', '정확한 타이밍']}
      />

      <FeatureSection
        title="라인 및 블록 모드"
        description="자막을 라인 단위 또는 블록 단위로 표시할 수 있습니다."
        videoSrc="/videos/모드.mp4"
        posterSrc="/images/모드썸.png"
        features={['라인 단위 보기', '블록 단위 보기', '사용자 지정 가능']}
      />

      <FeatureSection
        title="포커스 모드"
        description="현재 자막만 하이라이트하여 학습에 집중할 수 있습니다."
        videoSrc="/videos/포커스.mp4"
        posterSrc="/images/포커스썸.png"
        features={[
          '탐색 도중 빠르게 현재 자막으로 돌아올 수 있음',
          '학습 흐름이 끊기지 않게 도움',
        ]}
      />
    </div>
  );
}
