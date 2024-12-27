'use client';

import { useRef, useEffect, useState } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Pencil, BarChart } from 'lucide-react';

function CoreFeatures() {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-blue-500" />,
      title: '맞춤 콘텐츠',
      description:
        'CNN 기사와 YouTube 영상 중 관심사에 맞는 내용을 추천받으세요.',
    },
    {
      icon: <Pencil className="w-10 h-10 text-green-500" />,
      title: '인터랙티브 학습',
      description: '북마크, 메모, 퀴즈를 활용해 효과적으로 학습하세요.',
    },
    {
      icon: <BarChart className="w-10 h-10 text-purple-500" />,
      title: '학습 진척도 추적',
      description: '학습 상황을 시각화하고 분석해보세요.',
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

function TechnicalChallenge() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          기술적 문제와 해결
        </h2>
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              퀴즈 기능 상태 관리 개선
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              CNN 기사와 YouTube 콘텐츠 기반 퀴즈 기능을 개발하면서 상태 관리의
              복잡함으로 인해 예상치 못한 오류가 발생했습니다. 기존 상태 관리
              방식으로는 사용자 경험에 부정적인 영향을 주는 문제가 있었습니다.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">문제점</h4>
            <Card>
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold mb-4">
                  기존 상태 관리 방식의 한계
                </h5>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    정답 여부를 관리하는 <code>isCorrect</code> 값이 즉시
                    업데이트되면서 문제 개수가 자동으로 줄어드는 버그 발생
                  </li>
                  <li>
                    결과 페이지가 제대로 표시되지 않거나, 잘못된 결과가 계산되는
                    문제
                  </li>
                  <li>상태와 시간 흐름 간의 단절로 인해 로직 오류 발생</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">해결 방안</h4>
            <Card>
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold mb-4">
                  이벤트 기반 설계로 전환
                </h5>
                <p className="mb-4">
                  상태를 단순히 값으로 관리하지 않고, 이벤트의 축적을 통해
                  계산하는 방식으로 전환했습니다.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    사용자 행동을 이벤트로 정의 (예: 답변 제출, 퀴즈 재시도 등)
                  </li>
                  <li>이벤트 기반 계산으로 정확한 로직과 상태 흐름 유지</li>
                  <li>
                    상태 전이를 명확하게 하기 위해 Finite State Machine 적용
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">코드 예시</h4>
            <Card>
              <CardContent className="p-6">
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">
                    {`type DomainEvent =
  | { type: 'submit_answer'; questionId: string; answer: string }
  | { type: 'response_question_result'; questionId: string; ok: boolean }
  | { type: 'end_quiz' }
  | { type: 'retry_quiz' };

type QuestionState = {
  questionId: string;
  status: 'ready' | 'submitting' | 'correct' | 'wrong';
};

type State = {
  questions: QuestionState[];
};

const reducer: React.Reducer<State, DomainEvent> = (prevState, event) => {
  switch (event.type) {
    case 'submit_answer': {
      return {
        questions: prevState.questions.map((question) =>
          question.questionId === event.questionId
            ? { ...question, status: 'submitting' }
            : question
        ),
      };
    }
    case 'response_question_result': {
      return {
        questions: prevState.questions.map((question) =>
          question.questionId === event.questionId
            ? { ...question, status: event.ok ? 'correct' : 'wrong' }
            : question
        ),
      };
    }
    default:
      return prevState;
  }
};`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">개선 결과</h4>
            <Card>
              <CardContent className="p-6">
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>퀴즈 진행 오류 해결 및 정확한 결과 계산 가능</li>
                  <li>
                    사용자가 진행 상태를 직관적으로 확인하고 결과를 신뢰할 수
                    있도록 개선
                  </li>
                  <li>
                    유지보수 효율성 증가: 새로운 기능 추가 시 기존 코드 변경
                    최소화
                  </li>
                </ul>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2">Before</h5>
                    <VideoPlayer
                      src="/videos/quiz-before.mp4"
                      poster="/images/quiz-before-poster.jpg"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">After</h5>
                    <VideoPlayer
                      src="/videos/quiz-after.mp4"
                      poster="/images/quiz-after-poster.jpg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BiengualProjectPage() {
  return (
    <div className="container mx-auto py-12">
      {/* 히어로 섹션 */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-zinc-700 pb-2">Biengual</h1>

        <div className="flex justify-center space-x-4">
          <Button
            className="rounded-full"
            size="lg"
            onClick={() => window.open('https://biengual.store', '_blank')}
          >
            데모 보기
          </Button>
          <Button
            className="rounded-full"
            size="lg"
            variant="outline"
            onClick={() =>
              window.open(
                'https://github.com/Kernel360/F2-BIENGUAL-FE',
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
                영어 공부를 하면서 여러 웹사이트를 왔다 갔다 하느라 시간을
                낭비한 적이 있으신가요? Biengual은 이런 문제를 해결하기 위해
                만들어졌습니다.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                관심사에 맞는 CNN 뉴스 기사와 YouTube 영상을 한 곳에서 제공하여
                효율적으로 영어 리딩과 리스닝을 학습할 수 있는 플랫폼입니다.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <VideoPlayer
                src="/path-to-your-video/overview.mp4"
                poster="/path-to-your-image/overview-poster.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 기능 */}
      <CoreFeatures />

      {/* 기능 섹션 */}
      <FeatureSection
        title="메인 페이지"
        description="학습의 시작점, 맞춤형 콘텐츠를 만나보세요."
        videoSrc="/videos/메인.mp4"
        posterSrc="/images/메인썸.png"
        features={[
          '인기 콘텐츠 확인',
          '개인화된 추천',
          '학습 진행 상황 확인',
          '영감이 되는 문구 제공',
        ]}
      />

      <FeatureSection
        title="학습 페이지"
        description="몰입할 수 있는 학습 경험을 제공합니다."
        videoSrc="/videos/리스닝.mp4"
        posterSrc="/images/리스닝썸.png"
        features={[
          '듣기와 읽기 선택 가능',
          '중요 문장 북마크 및 메모 추가',
          '맞춤형 퀴즈 제공',
        ]}
      />

      <FeatureSection
        title="스크랩 페이지"
        description="학습 내용을 복습하고 관리하세요."
        videoSrc="/vidoes/리딩.mp4"
        posterSrc="/images/리딩썸.png"
        features={[
          '저장한 콘텐츠를 한 곳에서 확인',
          '북마크한 문장 관리',
          '학습 기록 빠르게 접근',
        ]}
      />

      <FeatureSection
        title="대시보드"
        description="학습 진행 상황을 확인하고 동기 부여를 얻으세요."
        videoSrc="/videos/대시보드.mp4"
        posterSrc="/images/대시보드썸.png"
        features={[
          '학습 현황 시각화',
          '퀴즈 성과 확인',
          '포인트 이력 확인',
          '학습 패턴 분석',
        ]}
      />

      {/* 기술적 도전과 해결 */}
      <TechnicalChallenge />

      {/* 배운 점 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            배운 점과 성장
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                이벤트 기반 설계의 중요성
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                복잡한 상태 관리 문제를 해결하면서, 이벤트 기반 설계의 중요성을
                실감했습니다. 상태를 단순한 값으로 다루는 대신 시간의 흐름 속
                이벤트로 바라보는 접근 방식은 비즈니스 로직의 일관성을 유지하는
                데 큰 도움이 되었습니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                사용자 중심 개발의 가치
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                기술적인 해결책만 고집하지 않고, 사용자 경험을 최우선으로
                고려해야 한다는 점을 배웠습니다. 작은 기능도 전체 사용자 경험에
                큰 영향을 미친다는 것을 깨달으며, 사용자 피드백을 적극 반영해야
                한다는 것을 인지하게 되었습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
