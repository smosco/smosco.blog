import React from 'react';
import Image from 'next/image';

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
  imageSrc,
  title,
  description,
  contributions,
}: {
  imageSrc: string;
  title: string;
  description: string;
  contributions: string[];
}) => (
  <div className="p-4 bg-gray-100 rounded border border-gray-300 flex flex-col lg:flex-row">
    <div className="lg:w-1/3 mb-4 lg:mb-0">
      <Image
        src={imageSrc}
        alt={title}
        className="rounded"
        width={300}
        height={200}
      />
    </div>
    <div className="lg:w-2/3 pl-0 lg:pl-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {/* <p className="text-gray-700 mb-4">{description}</p> */}
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
  stack,
  performance,
}: {
  title: string;
  description: string;
  details: string[];
  stack: string[];
  performance: { key: string; value: string }[];
}) => (
  <div className="p-4 bg-gray-100 rounded border border-gray-300">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
      {details.map((detail, idx) => (
        <li key={idx}>{detail}</li>
      ))}
    </ul>
    <h4 className="font-medium text-sm mb-2">Tech Stack</h4>
    <div className="flex flex-wrap gap-2 mb-4">
      {stack.map((tech, idx) => (
        <span
          key={idx}
          className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
        >
          {tech}
        </span>
      ))}
    </div>
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
  </div>
);

const PortfolioPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
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
          imageSrc="/images/리딩썸.png"
          title="메인 페이지"
          description="당신만의 맞춤형 학습 시작점"
          contributions={[
            '맞춤형 추천 알고리즘 설계 및 구현',
            '사용자 학습 데이터 기반 실시간 통계 기능 개발',
            '메인 페이지 레이아웃 및 스타일링 구현',
          ]}
        />
        <FeatureItem
          imageSrc="/images/learning-feature.jpg"
          title="학습 페이지"
          description="맞춤형 콘텐츠로 학습에 몰입하세요"
          contributions={[
            '북마크 및 메모 기능 API 설계 및 구현',
            '학습 콘텐츠 자동 로드 및 카테고리화 기능 구현',
            '퀴즈 생성 로직 및 UI 개발',
          ]}
        />
        <FeatureItem
          imageSrc="/images/scrap-feature.jpg"
          title="스크랩 페이지"
          description="복습으로 학습 효과를 극대화하세요"
          contributions={[
            '사용자별 스크랩 데이터 관리 API 개발',
            '스크랩 콘텐츠 목록 UI 및 상태 관리 구현',
            '북마크한 문장 및 메모 동기화 기능 구현',
          ]}
        />
        <FeatureItem
          imageSrc="/images/dashboard-feature.jpg"
          title="대시보드"
          description="학습 여정을 한눈에 파악하세요"
          contributions={[
            '사용자 진행 상황 대시보드 설계 및 구현',
            '데이터 시각화를 위한 차트 컴포넌트 개발',
            '포인트 이력 및 학습 선호도 분석 로직 구현',
          ]}
        />
      </Section>
      <Section title="문제 해결 과정">
        <IssueItem
          title="반응형 Carousel 구현"
          description="Swiper를 사용하지 않고 직접 반응형 Carousel 컴포넌트를 설계 및 구현했습니다."
          details={[
            '제네릭 타입을 활용한 유연한 설계로 다양한 UI 지원',
            '디바이스별 항목 수 조정 로직 추가로 반응형 화면 지원',
            'autoPlay와 터치 이벤트 충돌 방지 로직 구현으로 UX 개선',
          ]}
          stack={['TypeScript', 'React', 'CSS']}
          performance={[
            {
              key: '요구사항',
              value: '다양한 UI 지원, 반응형 화면 지원, UX 디테일',
            },
            { key: '해결 방법', value: '제네릭 타입 설계 및 충돌 방지 로직' },
          ]}
        />
        <IssueItem
          title="이미지 최적화 실험 설계 및 분석"
          description="CNN 및 YouTube에서 가져온 고해상도 이미지를 리사이징하고, CDN 및 S3를 활용해 최적화했습니다. 성능 개선 효과를 검증하며 LCP를 65% 개선했습니다."
          details={[
            '고해상도 이미지를 리사이징하고, S3와 CDN을 통해 빠르게 전달',
            'Autocannon으로 Latency와 LCP를 측정하여 성능 개선 효과 검증',
            'LCP를 65% 개선하여 사용자 경험 향상',
          ]}
          stack={['AWS S3', 'CloudFront', 'Node.js']}
          performance={[
            { key: 'LCP', value: '6.9초 → 2.4초 (65% 개선)' },
            { key: 'Latency', value: '46ms → 19ms (57% 개선)' },
          ]}
        />

        <IssueItem
          title="검색 엔진 최적화 기반 작업"
          description="Next.js의 동적 메타 태그와 Google Search Console을 활용해 검색 엔진 최적화를 진행하고, 검색 순위를 개선했습니다."
          details={[
            'Next.js의 generateMetadata를 사용해 콘텐츠별 메타 태그 동적으로 생성',
            'robots.txt와 sitemap.xml 추가로 검색 엔진 크롤링 최적화',
            'Google Search Console 데이터를 분석해 CTR(클릭률)과 Average Position을 기반으로 SEO 전략 개선',
          ]}
          stack={['Next.js', 'Google Search Console', 'SEO']}
          performance={[
            { key: 'CTR', value: '22.6%' },
            { key: 'Average Position', value: '4.9' },
            {
              key: '구현 작업',
              value: '메타데이터 생성, robots.txt 및 sitemap.xml 설정',
            },
          ]}
        />
        <IssueItem
          title="API 병렬 요청으로 waterfall 문제 해결"
          description="API 요청의 병렬화를 통해 메인 페이지의 성능 병목 문제를 해결하고 사용자 로딩 경험을 개선했습니다."
          details={[
            'React Query를 활용하여 비동기 요청을 병렬화하고, Promise.all로 요청 속도를 최적화',
            'Lighthouse를 활용하여 성능 문제를 측정하고, 캐싱 및 prefetch 전략을 도입',
            'LCP를 2.8초에서 2.3초로 단축하며 사용자 로딩 경험 향상',
          ]}
          stack={['React Query', 'Promise.all', 'Lighthouse']}
          performance={[
            { key: 'LCP', value: '2.8초 → 2.3초 (18% 개선)' },
            { key: 'Lighthouse 성능 점수', value: '56 → 76 (36% 개선)' },
          ]}
        />
        <IssueItem
          title="퀴즈 기능 고도화"
          description="사용자의 학습 피드백을 강화하기 위해 퀴즈 결과 페이지와 반복 학습 기능을 고도화하고 상태 관리 로직을 재설계했습니다."
          details={[
            '결과 페이지에서 틀린 문제와 정답 해설을 제공하여 학습 약점을 시각화',
            '반복 학습 기능으로 틀린 문제만 선별해 재도전 가능',
            '복잡한 상태 관리 로직을 이벤트 기반 아키텍처로 리팩토링',
            'React Query를 활용하여 상태 동기화 문제를 해결하고 데이터 일관성을 유지',
          ]}
          stack={['React', 'React Query', 'TypeScript']}
          performance={[
            { key: '학습 완료율', value: '약 20% 증가' },
            { key: '코드 개선', value: '가독성과 유지보수성 향상' },
            {
              key: '추가 개발 효율성',
              value: '새로운 퀴즈 유형 추가 시간 단축',
            },
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
      <Section title="문제 해결 과정">
        <IssueItem
          title="자막 탐색 로직 최적화"
          description="React 기반으로 자막 탐색 속도를 최적화한 오픈소스 라이브러리를 개발했습니다. 탐색 알고리즘을 이진 탐색으로 변경하여 성능을 대폭 개선했습니다."
          details={[
            '탐색 알고리즘을 순차 탐색(O(N))에서 이진 탐색(O(logN))으로 변경하여 탐색 속도 향상',
            '포커스 모드, 하이라이트, 전체보기/한줄 보기 기능 추가로 학습 효율성 강화',
            '버퍼링 제거 및 실시간 탐색 가능으로 사용자 경험 개선',
          ]}
          stack={['React', 'TypeScript', 'Open Source']}
          performance={[
            { key: '탐색 속도', value: '실시간 탐색 가능' },
            { key: 'UX 개선', value: '자막 탐색 및 학습 환경 직관성 강화' },
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
            '타입 선언 파일 생성을 자동화하여 배포 품질 강화',
          ]}
          stack={['Yarn Workspaces', 'GitHub Actions', 'ESBuild']}
          performance={[
            { key: '배포 시간', value: '약 50% 단축' },
            { key: '의존성 관리', value: '중복 제거로 간소화' },
            { key: '개발 생산성', value: '테스트 및 통합 작업 간소화' },
          ]}
        />
      </Section>
    </Section>
  </div>
);

export default PortfolioPage;
