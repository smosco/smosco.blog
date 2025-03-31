import React from 'react';
import { YouTubePlayer } from '@/components/YouTubePlayer';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-8 border-t border-gray-300">
    <h2 className="text-xl font-semibold mb-6">{title}</h2>
    <div className="space-y-6">{children}</div>
  </section>
);

const FeatureItem = ({
  videoId,
  title,
  contributions,
}: {
  videoId: string;
  title: string;
  contributions: string[];
}) => (
  <div className="flex flex-col lg:flex-row bg-gray-100 rounded border border-gray-300 overflow-hidden">
    {/* 비디오 영역 */}
    <div className="relative w-full lg:w-1/2 aspect-video">
      <YouTubePlayer videoId={videoId} />
    </div>

    {/* 텍스트 영역 */}
    <div className="p-6 lg:w-2/3">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {contributions.map((contribution, idx) => (
          <li key={idx}>{contribution}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ProjectDescription = ({
  description,
  techStack,
  demoLink,
  githubLink,
}: {
  description: string;
  techStack: string[];
  demoLink?: string;
  githubLink?: string;
}) => (
  <div className="rounded mb-8">
    <p className="text-gray-700 mb-4">{description}</p>
    <h4 className="font-medium text-sm mb-2">기술 스택</h4>
    <div className="flex flex-wrap gap-2 mb-4">
      {techStack.map((tech, idx) => (
        <span
          key={idx}
          className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
        >
          {tech}
        </span>
      ))}
    </div>
    {demoLink && (
      <a
        href={demoLink}
        className="text-blue-500 text-sm hover:underline mr-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Demo
      </a>
    )}
    {githubLink && (
      <a
        href={githubLink}
        className="text-blue-500 text-sm hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    )}
  </div>
);

const IssueItem = ({
  title,
  description,
  details,
  keywords,
  performance,
}: {
  title: string;
  description: string;
  details: string[];
  keywords?: string[];
  performance?: { key: string; value: string }[];
}) => (
  <div className="p-4 bg-gray-100 rounded border border-gray-300">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
      {details.map((detail, idx) => (
        <li key={idx}>{detail}</li>
      ))}
    </ul>
    {keywords && (
      <>
        <h4 className="font-medium text-sm mb-2">Keywords</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </>
    )}
    {performance && (
      <>
        <h4 className="font-medium text-sm mb-2">Performance Metrics</h4>
        <table className="w-full text-sm">
          <tbody>
            {performance.map((item, idx) => (
              <tr key={idx}>
                <td className="pr-4 text-gray-600">{item.key}</td>
                <td className="text-gray-800">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </div>
);

const AboutPage = () => (
  <div className="px-4">
    {/* Header */}
    <header className="text-center mb-12">
      <h1 className="text-3xl font-bold mb-2">한현 - Frontend Engineer</h1>
      <p className="text-gray-600">
        Product-minded Developer | Crafting Meaningful Solutions
      </p>
    </header>

    {/* Sections */}
    <Section title="Biengual 프로젝트">
      <ProjectDescription
        description="CNN 뉴스와 YouTube 영상을 크롤링해 맞춤형 리딩·리스닝을 학습하는 영어 플랫폼 개발"
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
      <Section title="내가 구현한 기능">
        <FeatureItem
          videoId="-ikKY8TYKmo"
          title="메인 페이지"
          contributions={[
            '재사용 가능한 반응형 Carousel',
            '플로팅 반응형 학습 트래커',
            '메인 페이지 레이아웃 및 스타일링',
          ]}
        />
        <FeatureItem
          videoId="V8fuCVPnGOs"
          title="학습 페이지"
          contributions={[
            '최신 콘텐츠 포인트 차감 모달',
            '영상 자막 학습 기능',
            '북마크 및 메모 추가',
            '스크롤, 영상 재생 시간에 따른 학습율 기록',
            '학습 미션 수행 기록',
          ]}
        />
        <FeatureItem
          videoId="oMD1ASRnpPU"
          title="스크랩 페이지"
          contributions={[
            '문장 북마크, 메모 기능',
            '외부 스크랩 낙관적 업데이트',
            '스크랩 콘텐츠, 메모 목록 모아보기',
          ]}
        />
        <FeatureItem
          videoId="CT5EvJkVSHw"
          title="퀴즈"
          contributions={[
            '내용 일치, 순서 맞추기, 빈칸 채우기 퀴즈 타입 별 컴포넌트',
            '틀린 문제 다시 풀기',
            '퀴즈 결과 페이지',
            '퀴즈 힌트 보기',
          ]}
        />
        <FeatureItem
          videoId="b6UlR82Uziw"
          title="대시보드"
          contributions={[
            '사용자 진행 상황 대시보드 설계 및 구현',
            '학습 카테고리 분포, 퀴즈 정답율 차트',
          ]}
        />
        <FeatureItem
          videoId="rXqI-HENCrQ"
          title="반응형"
          contributions={['반응형 UI 구현']}
        />
      </Section>
      <Section title="마주한 이슈">
        <IssueItem
          title="퀴즈 기능 고도화"
          description="이벤트 기반 설계를 도입해 퀴즈 로직을 재구성하고, 상태 관리의 문제를 해결했습니다."
          details={[
            '이벤트 기반 아키텍처를 도입해 상태 변화와 시간의 흐름을 반영한 설계 구현',
            '복잡한 상태 로직을 명확히 정리하여 문제 풀이 → 결과 계산 → 재도전 흐름 개선',
            'Finite State Machine(FSM) 방식으로 상태 변화의 명확성과 일관성을 보장',
          ]}
          keywords={['event-driven', 'Finite State Machine', 'useReducer']}
          performance={[
            {
              key: '버그 해결',
              value: '결과 계산 오류 및 상태 변화 불일치 문제 해결',
            },
            {
              key: 'UX 개선',
              value:
                '퀴즈 진행 상태와 결과 계산의 정확도 향상으로 사용자의 직관적 경험 제공',
            },
            {
              key: '유지보수성 향상',
              value: '새로운 기능 추가 시 기존 코드 변경량 최소화',
            },
          ]}
        />

        <IssueItem
          title="재사용 가능한 반응형 Carousel 구현"
          description="Swiper같은 라이브러리를 사용하지 않고 직접 반응형 Carousel을 설계하고 구현했습니다."
          details={[
            '제네릭 타입을 활용한 유연한 설계로 다양한 UI 지원',
            '디바이스별 항목 수 조정 로직 추가로 반응형 화면 지원',
            'autoPlay와 터치 이벤트 충돌 방지 로직 구현으로 UX 개선',
          ]}
        />
        <IssueItem
          title="이미지 최적화 실험 설계 및 분석"
          description="CNN 및 YouTube에서 가져온 고해상도 이미지를 리사이징하고, CDN 및 S3를 활용해 최적화했습니다. 성능 개선 효과를 검증하며 LCP를 65% 개선했습니다."
          details={[
            '고해상도 이미지를 리사이징하고, S3와 CDN을 통해 빠르게 전달',
            'Autocannon으로 Latency와 Requests/sec를 측정하여 성능 개선 효과 검증 후 적용',
            'LCP를 65% 개선하여 사용자 경험 향상',
          ]}
          keywords={['Autocannon', 'CDN']}
          performance={[
            { key: 'LCP', value: '6.9초 → 2.4초 (65% 개선)' },
            { key: 'Latency', value: '46ms → 19ms (57% 개선)' },
          ]}
        />

        <IssueItem
          title="검색 엔진 최적화 기반 작업"
          description="Next.js의 동적 메타 태그와 Google Search Console을 활용해 기본적인 검색 엔진 최적화 기반 작업을 진행했습니다."
          details={[
            'Next.js의 generateMetadata를 사용해 콘텐츠별 메타 태그를 동적으로 생성',
            '사이트맵 및 robots.txt 파일을 추가해 검색 엔진 크롤링 기본 설정 완료',
            'Google Search Console을 통해 CTR(클릭률)과 Average Position 데이터를 확인하고 그 의미를 학습',
          ]}
          keywords={[
            'generateMetadata',
            'Google Search Console',
            'sitemap.xml',
            'robots.txt',
            'SEO',
          ]}
          performance={[
            { key: 'CTR', value: '22.6%' },
            { key: 'Average Position', value: '4.9' },
            {
              key: '성과',
              value:
                '검색 엔진에서 콘텐츠가 노출되기 시작했으며 소셜 미디어 공유 시 제목과 이미지를 포함한 링크 제공',
            },
          ]}
        />

        <IssueItem
          title="API 병렬 요청으로 waterfall 문제 해결"
          description="API 요청의 병렬화를 통해 메인 페이지의 성능 병목 문제를 해결하고 사용자 로딩 경험을 개선했습니다."
          details={[
            'Promise.allSettled를 활용해 비동기 요청을 병렬화',
            '메인 페이지 LCP를 2.8초에서 2.3초로 단축하며 사용자 로딩 경험 향상',
          ]}
          keywords={['Promise.allSettled', 'Lighthouse']}
          performance={[
            { key: 'LCP', value: '2.8초 → 2.3초 (18% 개선)' },
            { key: 'Lighthouse 성능 점수', value: '56 → 76 (36% 개선)' },
          ]}
        />
      </Section>
    </Section>
    <Section title="react-player-plugin-prompter 오픈소스">
      <ProjectDescription
        description="영어 학습 서비스를 위한 자막 탐색 및 하이라이트 최적화 오픈소스 라이브러리 개발"
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
      <Section title="내가 구현한 기능">
        <FeatureItem
          videoId="wTsvBMkh9xc"
          title="자막 동기화 및 탐색"
          contributions={[
            '영상 재생 시간에 따른 자막 스크롤',
            '자막 탐색',
            '한줄 보기, 전체 보기 모드',
          ]}
        />
      </Section>
      <Section title="마주한 이슈">
        <IssueItem
          title="자막 탐색 로직 최적화"
          description="자막 탐색 로직에 이진 탐색을 도입해 탐색 속도를 크게 향상시키고 버퍼링 문제를 해결했습니다."
          details={[
            '탐색 알고리즘을 순차 탐색(O(N))에서 이진 탐색(O(logN))으로 변경하여 성능 최적화',
            '버퍼링 제거 및 실시간 탐색 가능으로 사용자 경험 개선',
            '테스트 결과, 데이터 크기 증가에 따라 이진 탐색이 순차 탐색 대비 최대 88% 이상 빠름을 확인',
          ]}
          performance={[
            {
              key: '탐색 속도 개선',
              value:
                '데이터 크기 10,000 기준, 순차 탐색 평균 13.20ms → 이진 탐색 평균 0.15ms',
            },
          ]}
        />

        <IssueItem
          title="Yarn Workspaces를 활용한 모노레포 세팅"
          description="Yarn Workspaces를 기반으로 모노레포 환경을 구축하고, GitHub Actions를 활용해 NPM 자동 배포 프로세스를 구현했습니다."
          details={[
            'Yarn Workspaces를 사용하여 core 라이브러리와 demo 애플리케이션을 통합',
            '중복된 의존성을 루트로 통합하여 패키지 관리 간소화',
            'GitHub Actions를 통해 main 브랜치로 푸시 시 NPM 자동 배포 설정',
            'ESBuild를 사용하여 번들 크기 감소 및 빌드 속도 개선',
          ]}
          keywords={['Yarn Workspaces', 'GitHub Actions', 'ESBuild']}
          performance={[
            { key: '의존성 관리', value: '중복 제거로 간소화' },
            { key: '개발 생산성', value: '테스트 및 통합 작업 간소화' },
          ]}
        />
      </Section>
    </Section>
  </div>
);

export default AboutPage;
