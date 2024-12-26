'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-gradient-to-br from-background to-background/80 border-none shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="pt-6">
        <div className="mb-4 text-4xl">{icon}</div>
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function FeatureSection({
  title,
  description,
  videoSrc,
  posterSrc,
  features,
}: {
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  features: string[];
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
      </div>
      <VideoPlayer src={videoSrc} poster={posterSrc} />
    </section>
  );
}

export default function BiengualProjectPage() {
  return (
    <div className="container mx-auto py-12">
      {/* 히어로 섹션 */}
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground animate-fade-in-up pb-3">
          Biengual
        </h1>
      </section>

      {/* 프로젝트 개요 */}
      <section className="flex flex-col gap-12 animate-fade-in animation-delay-500">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            프로젝트 소개
          </h2>
          <p className="text-base text-muted-foreground">
            Biengual은 사용자의 관심사에 맞춘 CNN 기사와 YouTube 동영상 콘텐츠를
            통해 읽기와 듣기 능력을 향상시키는 무료 영어 학습 플랫폼입니다.
          </p>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() =>
              window.open(
                'https://biengual.store',
                '_blank',
                'noopener,noreferrer',
              )
            }
          >
            데모보기
          </Button>
        </div>
        {/* TODO(@smosco): 디렉터님 영상 넣기 */}
        <VideoPlayer
          src="/path-to-your-video/overview.mp4"
          poster="https://media.licdn.com/dms/image/v2/D5605AQE7L8Cm2recBA/videocover-high/videocover-high/0/1734333674325?e=1735858800&v=beta&t=9SFr6U_Lzd1oPw5w5OoIc5ML0tILycaV2CH7FuVg1Ww"
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
            title="맞춤형 콘텐츠"
            description="관심사에 맞는 CNN 기사와 YouTube 동영상을 제공받으세요."
          />
          <FeatureCard
            icon="📚"
            title="인터랙티브 학습"
            description="북마크, 메모 기능과 퀴즈로 효과적인 학습을 경험하세요."
          />
          <FeatureCard
            icon="📊"
            title="진행 상황 추적"
            description="상세한 분석과 인사이트로 학습 여정을 모니터링하세요."
          />
        </div>
      </section>

      {/* 기능 섹션 */}
      <FeatureSection
        title="메인 페이지"
        description="맞춤형 학습의 시작점"
        videoSrc="/videos/메인.mp4"
        posterSrc="/images/메인썸.png"
        features={[
          '인기 콘텐츠를 한눈에 확인',
          '개인화된 콘텐츠 추천',
          '학습 진행 상황 추적',
          '일일 영감 문구 제공',
        ]}
      />

      <FeatureSection
        title="학습 페이지"
        description="맞춤형 콘텐츠로 몰입하는 학습"
        videoSrc="/videos/리스닝.mp4"
        posterSrc="/images/리스닝썸.png"
        features={[
          '듣기와 읽기 연습 중 선택',
          '관심 카테고리의 콘텐츠 접근',
          '중요 문장 북마크와 메모 추가',
          '맞춤형 퀴즈로 이해도 테스트',
        ]}
      />

      <FeatureSection
        title="스크랩 페이지"
        description="학습 내용 복습 및 강화"
        videoSrc="/vidoes/리딩.mp4"
        posterSrc="/images/리딩썸.png"
        features={[
          '저장한 모든 콘텐츠를 한 곳에서 확인',
          '북마크한 문장 쉽게 관리',
          '학습 기록에 빠르게 접근',
        ]}
      />

      <FeatureSection
        title="대시보드"
        description="진행 상황 추적 및 동기 부여"
        videoSrc="/videos/대시보드.mp4"
        posterSrc="/images/대시보드썸.png"
        features={[
          '학습 여정 시각화',
          '퀴즈 성과 모니터링',
          '포인트 이력 추적',
          '학습 선호도 분석',
        ]}
      />

      {/* 반응형 디자인 */}
      <FeatureSection
        title="반응형 디자인"
        description="어디서나 영어 학습"
        videoSrc="/videos/반응형.mp4"
        posterSrc="/images/반응형썸.png"
        features={['이동 중 영어 학습 지원']}
      />
    </div>
  );
}
