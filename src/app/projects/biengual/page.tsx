'use client';

import { useRef, useEffect, useState } from 'react';
import { VideoPlayer } from '@/components/YouTubePlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Pencil, BarChart } from 'lucide-react';

function CoreFeatures() {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-blue-500" />,
      title: '맞춤형 콘텐츠',
      description: '관심사에 맞는 CNN 기사와 YouTube 동영상을 제공받으세요.',
    },
    {
      icon: <Pencil className="w-10 h-10 text-green-500" />,
      title: '인터랙티브 학습',
      description: '북마크, 메모 기능과 퀴즈로 효과적인 학습을 경험하세요.',
    },
    {
      icon: <BarChart className="w-10 h-10 text-purple-500" />,
      title: '진행 상황 추적',
      description: '상세한 분석과 인사이트로 학습 여정을 모니터링하세요.',
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
          기술적 도전과 해결
        </h2>
        <div className="space-y-16">
          {/* 퀴즈 상태 관리 이슈 */}
          <h3 className="text-2xl font-semibold mb-4">
            퀴즈 기능 상태 관리 개선
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            CNN 뉴스와 YouTube 콘텐츠 기반으로 학습 퀴즈를 개발하는 과정에서
            복잡한 상태 관리 문제를 겪었습니다. 기존의 스냅샷 중심 상태 관리
            방식으로 인해 퀴즈 진행 중 예기치 못한 동작이 발생하며 사용자 경험을
            저해하는 주요 원인이 되었습니다.
          </p>
          <div>
            <h4 className="text-xl font-semibold mb-4">문제 정의</h4>
            <Card>
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold mb-4">
                  스냅샷 중심 상태 관리의 한계
                </h5>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    isCorrect로 상태를 관리했으나, 정답을 맞추자마자 isCorrect가
                    true로 바뀌면서 다음 문제가 자동으로 넘어가는 버그 발생
                  </li>
                  <li>
                    결과 페이지에 도달하지 못하거나 잘못된 결과(0/2로 계산)가
                    표시되는 문제 발생
                  </li>
                  <li>상태 변화와 시간 흐름 간의 단절로 인해 로직 오류 발생</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">해결 방법</h4>
            <Card>
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold mb-4">
                  이벤트 기반 설계 도입
                </h5>
                <p className="mb-4">
                  상태를 "단순 스냅샷"이 아닌, 이벤트를 통해 누적된 결과로
                  관리하는 방식으로 접근했습니다.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    사용자 행동을 이벤트로 정의 (예: submit_answer,
                    response_question_result, retry_quiz)
                  </li>
                  <li>
                    이벤트 기반 상태 계산으로 정확한 로직과 상태 흐름 보장
                  </li>
                  <li>
                    Finite State Machine 개념을 도입해 상태 전환의 명확성 확보
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">코드 구현</h4>
            <Card>
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold mb-4">
                  이벤트 기반 상태 관리 구현
                </h5>
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
    // ... 다른 케이스들
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
                  <li>문제 개수 감소 및 결과 계산 오류 해결</li>
                  <li>
                    사용자 경험 개선: 진행 상태가 직관적으로 표시되고, 결과
                    계산의 정확도 향상
                  </li>
                  <li>
                    유지보수성 향상: 새로운 기능 추가 시 기존 코드 변경량 최소화
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

          {/* 이미지 최적화 이슈 */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              이미지 최적화: S3와 CDN 활용
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              CNN과 YouTube에서 가져온 고해상도 이미지로 인해 로딩 시간이
              길어지는 문제가 있었습니다. 이를 해결하기 위해 이미지 리사이징과
              CDN 도입을 고려했습니다.
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2">문제 정의</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>고해상도 이미지로 인한 웹사이트 로딩 속도 저하</li>
                  <li>백엔드 팀의 S3만을 이용한 이미지 저장 제안</li>
                  <li>CDN 사용에 대한 비용 우려</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">해결 과정</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>S3만 사용 시 성능 저하 가능성 인식</li>
                  <li>Autocannon을 이용한 성능 테스트 설계</li>
                  <li>원본, S3, CDN 각각의 성능 비교 실험</li>
                  <li>실험 결과를 바탕으로 CDN 도입 결정</li>
                </ol>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">실험 결과</h4>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">CDN 적용 전</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>리스닝 목록 페이지 LCP: 6.9초</li>
                          <li>평균 이미지 로딩 시간: 46ms</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">
                          리사이징 + CDN 적용 후
                        </h5>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>리스닝 목록 페이지 LCP: 2.3초</li>
                          <li>평균 이미지 로딩 시간: 16.12ms</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">결론 및 학습</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>S3만 사용 시 오히려 성능 저하 확인</li>
                  <li>CDN 도입으로 이미지 로딩 시간 대폭 감소</li>
                  <li>기술 도입 시 수치적 근거의 중요성 인식</li>
                  <li>팀 내 의사결정을 위한 실험과 데이터 활용의 가치 이해</li>
                </ul>
              </div>
            </div>
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
        <p className="text-lg text-gray-700 mb-6">
          CNN 뉴스 기사와 YouTube 영상을 사용자의 관심사에 맞게 제공하여, 한
          곳에서 효율적으로 읽기와 듣기 학습을 할 수 있는 영어 학습
          플랫폼입니다.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            className="rounded-full"
            size="lg"
            onClick={() => window.open('https://biengula.store', '_blank')}
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
                영어 공부할 때 여러 창을 왔다 갔다 하며 시간 낭비를 하거나,
                자신에게 맞는 콘텐츠를 찾기 어려운 적이 있었나요? Biengual은
                이런 문제를 해결하기 위해 만들어졌습니다.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <VideoPlayer src="/videos/메인.mp4" poster="/images/메인썸.png" />
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 기능 */}
      <CoreFeatures />

      {/* 기능 섹션 */}
      <FeatureSection
        title="메인 페이지"
        description="당신만의 맞춤형 학습 시작점"
        videoSrc="/videos/메인.mp4"
        posterSrc="/images/메인썸.png"
        features={[
          '가장 인기 있는 콘텐츠를 한눈에',
          '개인화된 추천 콘텐츠 제공',
          '학습 진행 상황 실시간 확인',
          '매일 영감을 주는 문구 제공',
        ]}
      />

      <FeatureSection
        title="학습 페이지"
        description="맞춤형 콘텐츠로 학습에 몰입하세요"
        videoSrc="/videos/리스닝.mp4"
        posterSrc="/images/리스닝썸.png"
        features={[
          '듣기와 읽기 학습 중 선택 가능',
          '관심 카테고리 콘텐츠 바로 접근',
          '중요 문장은 북마크하고 메모 추가',
          '맞춤형 퀴즈로 이해도 확인',
        ]}
      />

      <FeatureSection
        title="스크랩 페이지"
        description="복습으로 학습 효과를 극대화하세요"
        videoSrc="/vidoes/리딩.mp4"
        posterSrc="/images/리딩썸.png"
        features={[
          '저장한 콘텐츠 한 곳에서 확인',
          '북마크한 문장 손쉽게 관리',
          '학습 기록 빠르게 접근 가능',
        ]}
      />

      <FeatureSection
        title="대시보드"
        description="학습 여정을 한눈에 파악하세요"
        videoSrc="/videos/대시보드.mp4"
        posterSrc="/images/대시보드썸.png"
        features={[
          '학습 진행 상황 시각화',
          '퀴즈 성과와 분석 제공',
          '포인트 이력 추적 가능',
          '개인 학습 선호도 분석',
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
                이벤트 기반 설계의 가치
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                복잡한 상태 관리 문제를 해결하면서, 이벤트 중심 설계의 중요성을
                배웠습니다. 단순히 현재 상태를 저장하는 것이 아니라, 변화의
                흐름을 추적하는 설계를 통해 일관성과 확장성을 동시에 잡을 수
                있었습니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">사용자 중심 개발</h3>
              <p className="text-lg text-gray-700 mb-6">
                기술적 문제 해결에만 집중하는 것이 아닌, 항상 사용자 경험을
                최우선으로 고려해야 한다는 점을 깨달았습니다. 작은 기능 하나도
                전체 사용자 경험에 큰 영향을 미칠 수 있음을 학습하며, 피드백을
                반영한 개발의 중요성을 알게 되었습니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                데이터 기반의 의사결정
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                새로운 기술을 도입할 때는 수치로 개선 효과를 증명하는 것이
                중요하다는 것을 배웠습니다. 이미지 최적화 과정에서 얻은 구체적인
                데이터를 통해 팀 내에서 효과적인 의사결정을 이끌어낼 수
                있었습니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                팀 내 소통과 데이터 활용
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                프로젝트 방향성을 논의할 때, 의견이 아닌 데이터를 기반으로
                설득하는 방식이 훨씬 효과적임을 경험했습니다. 성능 테스트 결과를
                활용해 팀원 간 합의를 이끌어내며 데이터 중심 소통의 중요성을
                체감했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
