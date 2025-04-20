export interface ProjectIssue {
  title: string;
  asIs: string[];
  toBe: string[];
  result: string[];
}

export interface ProjectData {
  title: string;
  period: string;
  links: {
    github?: string;
    site?: string;
    docs?: string;
  };
  thumbnail: string;
  overview: string;
  roles: string[];
  stack: string[];
  features: string[];
  featureImages: string[];
  issues: ProjectIssue[];
  retrospective: string;
}

export const projects: ProjectData[] = [
  {
    title: 'Next Table Order',
    period: '2025.01 – 진행중',
    links: {
      github: 'https://github.com/smosco/next-table-order',
      site: 'https://next-table-order.vercel.app',
    },
    thumbnail: '/images/portfolio/print/n-main.png',
    overview:
      'Next Table Order는 테이블 오더와 포스기가 없는 식당의 불편함을 해결하기 위해 만든 웹 주문 시스템입니다.\n실시간 주문 흐름과 사용자 행동 기반 구조상 CSR이 더 적합했지만, 풀스택 개발 속도를 고려해 Supabase와 Next.js App Router 조합을 선택했습니다.\n초기에는 polling 방식으로 전체 주문을 다시 불러왔지만, 주문량이 많아지며 병목이 발생해 주문 이벤트 전용 테이블을 만들고 SSE 기반으로 필요한 주문만 가져오도록 개선했습니다.\n기획부터 UI, API, DB까지 직접 설계하며 데이터 구조와 API 명세 감각도 함께 키운 프로젝트입니다.',
    roles: [
      '식당 현장 문제 해결을 위한 주문 흐름 기획 및 전체 설계',
      'Next.js를 활용한 빠른 풀스택 개발',
      '주문 변경 로그 기반 SSE 구조로 전환해 전체 리렌더링 병목 해소',
      '비개발자도 사용할 수 있도록 UX 흐름 및 UI 설계 중심 개발',
      'next-intl을 활용한 i18n 다국어 구조 설계',
    ],
    stack: [
      'Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, next-intl',
      'Backend: Supabase (PostgreSQL + Realtime)',
      'Infra & Tools: pnpm, Vercel',
    ],
    features: [
      '고객이 웹 페이지를 통해 주문하면 관리자 화면에 실시간으로 반영되는 흐름 설계',
      '옵션 선택이 포함된 메뉴 장바구니 구성, 수량/가격 동적 계산',
      '장바구니 및 결제 화면에서 실시간 반영과 UX 예외 처리',
      '관리자 페이지 내 실시간 주문 필터링, 상태 변경 및 알림 구조',
      '메뉴 및 카테고리 CRUD, 품절 처리 및 상태 관리 UI 구현',
      '매출 요약, 인기 메뉴 순위, 최근 주문 내역이 포함된 대시보드 구성',
    ],
    featureImages: [
      '/images/portfolio/print/cart.png',
      '/images/portfolio/print/option.png',
      '/images/portfolio/print/realtime.png',
      '/images/portfolio/print/dashboard.png',
      '/images/portfolio/print/menuform.png',
    ],
    issues: [
      {
        title: '실시간 주문 SSE 트래픽 병목 이슈',
        asIs: [
          'SSE를 통해 실시간 주문을 구현했으나, 주문 1건이 변경될 때 전체 주문 리스트를 통째로 다시 전송.',
          '주문 수가 많아질수록 응답 속도 급감 → 10만 건 이상일 경우 최대 3.2초 이상 지연 발생.',
          '불필요한 리렌더링과 데이터 낭비로 실시간 기능의 확장성 한계 도달.',
        ],
        toBe: [
          '주문 상태 변경 로그 전용 order_events 테이블 설계 및 분리',
          '클라이언트는 이벤트 발생 시 변경된 주문 ID만 전달받아 해당 항목만 리패치',
          '전체 데이터가 아닌 단일 변경 중심의 효율적인 데이터 흐름 구성',
        ],
        result: [
          '100만 건 이상 주문 환경에서도 6ms 수준의 응답 유지',
          '트래픽 90% 이상 절감 → 서버 부하 및 프론트 렌더링 병목 모두 해소',
          '대규모 매장 확장에도 견딜 수 있는 실시간 구조 확보',
        ],
      },
      {
        title: '옵션이 다른 메뉴 구분 누락 및 가격 반영 오류',
        asIs: [
          '같은 메뉴라도 옵션이 다르면 별도 항목으로 처리되어야 하지만, 기존에는 menuId 기준으로만 판단해 덮어쓰는 문제가 발생.',
          '사용자는 옵션을 선택했는데 적용되지 않았고, 장바구니에 의도하지 않은 조합이 담김.',
          '옵션 가격이 합산되지 않아 실제 결제 금액과 매출 데이터 간의 불일치가 발생함.',
        ],
        toBe: [
          'menuId + 옵션 ID 조합으로 고유 키 생성 → 장바구니 항목을 명확히 구분',
          '선택한 옵션에 따라 실시간으로 가격 합산되도록 UI 및 계산 로직 수정',
          '관리자 측 통계에도 옵션별 매출이 정확히 반영되도록 구조 개선',
        ],
        result: [
          '옵션 선택에 따른 장바구니 결과가 직관적으로 반영되어 사용자 혼란 해소',
          '주문 시점과 동일한 가격 정보로 정확한 매출 통계 확보',
          '운영자와 고객 모두에게 신뢰성 있는 주문 경험 제공',
        ],
      },
      {
        title: '실수로 닫힌 주문 흐름 복구 + 자동 초기화',
        asIs: [
          '고객이 떠난 후에도 이전 주문이 테이블에 남아 혼선 발생.',
          '사장님이 수동으로 초기화하지 않으면 다음 손님이 이전 주문을 보게 되는 UX 오류 발생.',
          '사장님이 주문을 실수로 닫아도 복구할 수 없어 운영상 큰 불편이 있었음.',
        ],
        toBe: [
          '손님 단위 주문 흐름을 위한 order_group 필드 도입 → 상태 구분 및 관리 명확화',
          '사장님이 실수로 주문을 닫은 경우에도 reopen 기능을 통해 복구 가능하게 개선',
          '테이블 비활성 시간이 일정 기준을 넘으면 자동으로 주문 종료되는 로직 적용',
        ],
        result: [
          '사장님의 수동 개입 없이도 안정적인 주문 흐름 유지',
          '실수 복구 기능으로 운영 중단 없이 원활한 서비스 제공 가능',
          '다음 손님에게는 항상 초기화된 화면 제공 → 사용자 혼란 방지',
        ],
      },
      {
        title: '주문 시점 가격 보존을 위한 구조 개선',
        asIs: [
          '주문 당시 가격이 저장되지 않고 메뉴 테이블의 현재 가격을 참조함.',
          '가격이 바뀔 경우 과거 주문 내역과 일치하지 않아 금액 이슈 발생.',
          '환불, 클레임 대응 시 신뢰도 문제와 정확한 매출 분석이 불가.',
        ],
        toBe: [
          'order_items 및 order_item_options 테이블에 주문 당시 가격을 별도 필드로 저장',
          '총 결제 금액도 해당 시점의 가격 기준으로 계산되도록 로직 분리',
        ],
        result: [
          '과거 주문 내역을 신뢰도 있게 조회 가능',
          '매출 통계 및 회계 정산 시 실수 없음',
          '고객 클레임 대응 시 명확한 근거 확보',
        ],
      },
    ],
    retrospective:
      '단순한 주문 서비스 구현이 아닌, 실제 매장에서 발생하는 운영 흐름의 문제를 기술로 해결해보고자 시작한 프로젝트였습니다.\n고객과 사장님 모두의 불편함을 줄이기 위해 주문 단위 자동 초기화, 실수 복구 로직, 옵션 처리 등 현실적인 흐름을 직접 모델링하고 구현했습니다.\n특히 SSE 최적화, i18n 다국어 구조 설계, 과거 주문 금액 보존 등은 단순한 CRUD가 아닌 서비스 설계 관점에서 고민한 결과물입니다.\n프론트엔드 개발자로서 단순한 UI 구현을 넘어서 비즈니스 흐름을 이해하고, 문제를 정의하고, 해결하는 능력을 성장시킨 계기가 되었습니다.',
  },
  {
    title: 'BIENGUAL',
    period: '2024.09 – 2024.12',
    links: {
      github: 'https://github.com/Kernel360/F2-BIENGUAL-FE',
      site: 'https://biengual.store',
    },
    thumbnail: '/images/portfolio/print/b-main.png',
    overview:
      'BIENGUAL은 YouTube 영상과 CNN 기사로 영어를 학습할 수 있는 리딩·리스닝 플랫폼입니다.\n학습자가 관심 있는 카테고리를 설정하면 맞춤 콘텐츠를 추천하고, 자막 기반 학습, 북마크·메모, 퀴즈, 학습 미션, 대시보드를 통해 몰입 흐름을 설계했습니다.\n퀴즈 상태는 useReducer 기반의 이벤트 모델로 구조화했고, 북마크와 메모는 TanStack Query로 낙관적 업데이트를 적용했으며, 학습 대시보드는 Recharts로 시각화해 성과 체감을 돕는 데 집중했습니다.\nNext.js App Router 기반으로 SEO도 고려하며, 성능과 사용자 경험을 함께 개선한 프로젝트입니다.',
    roles: [
      '프론트엔드 리더로서 UI/UX 흐름 및 기술 구조 설계 주도',
      '이벤트 기반 퀴즈 상태 모델링 및 반복 학습 구조 구현',
      '이미지 최적화 및 병렬 API 요청을 통해 초기 로딩 속도 개선 주도',
      'SEO 대응, 반응형 UI 구현 등 사용자 접근성과 경험 향상을 위한 개선 진행',
    ],
    stack: [
      'Next.js 14 (App Router), TypeScript, Tanstack Query, Tailwind CSS, Storybook, shadcn/ui',
      'Recharts, Autocannon',
    ],
    features: [
      '메인 페이지 – 반응형 캐러셀, 추천 콘텐츠, 학습 트래커 제공',
      '리스닝/리딩 – 자막 기반 학습, 북마크/메모, 진행률 저장',
      '스크랩 – 북마크/메모 수정 및 삭제 기능 포함',
      '퀴즈 – 결과 피드백, 정답률 분석, 재도전 기능 제공',
      '대시보드 – 카테고리별 학습 분포 및 히스토리 시각화',
    ],
    featureImages: [
      '/images/portfolio/print/b-main.png',
      '/images/portfolio/print/b-scrap.png',
      '/images/portfolio/print/b-listening.png',
      '/images/portfolio/print/b-quiz.png',
      '/images/portfolio/print/b-dashboard.png',
    ],
    issues: [
      {
        title: '퀴즈 상태 관리 구조 개선 (이벤트 기반 전이 모델 도입)',
        asIs: [
          '정답 여부를 단일 상태로 관리하며 문제 개수 불일치, 결과 계산 오류 등이 빈번하게 발생함.',
          '정답 제출, 피드백 응답, 재도전 등 시간 순서 기반 흐름을 반영하지 못해 복잡한 로직에서 버그가 다수 발생함.',
        ],
        toBe: [
          '퀴즈 흐름에 발생 가능한 모든 액션을 명시적인 도메인 이벤트로 정의 (e.g. download_quiz, submit_answer, response_result, retry_quiz)',
          '각 문제 상태를 `ready → submitting → correct/wrong`으로 구분한 FSM 구조 설계',
          '`useReducer` 기반 순수 함수로 상태 전이를 관리, 사이드 이펙트 최소화 및 테스트 가능성 확보',
        ],
        result: [
          '퀴즈 흐름이 명확하게 분리되어 재도전, 피드백 등의 로직 추가가 용이해짐',
          '정답 계산 및 피드백 정확도 향상',
          '상태 전이가 예측 가능해져 디버깅과 유지보수 효율 대폭 향상',
        ],
      },
      {
        title: 'CNN/YouTube 이미지 최적화 및 CDN 적용',
        asIs: [
          'CNN/YouTube 원본 이미지를 직접 요청해 LCP 지연 발생 (6.9초)',
          '백엔드는 단순 S3 업로드만 제공 → 별도 캐싱 구조 없이 이미지 제공 중',
        ],
        toBe: [
          '오토캐논(autocannon) 기반 성능 테스트를 통해 초기 로딩 병목 지점 분석',
          'S3 업로드 후 CDN 경유 전송 구조 설계 및 `Cache-Control` 설정 적용',
          '백엔드 팀을 설득해 CDN을 도입하고 프론트 측에 적용 완료',
        ],
        result: [
          'LCP: 6.9초 → 2.4초 (65% 개선)',
          'Latency: 46ms → 19ms (57% 개선)',
          '기술 도입 방향성과 설득 과정 주도',
        ],
      },
      {
        title: '메인 페이지 API 병렬 처리 최적화',
        asIs: [
          'API 요청을 순차적으로 처리해 Waterfall 현상 발생',
          '모든 콘텐츠 로딩이 끝날 때까지 페이지 렌더링이 지연됨',
        ],
        toBe: [
          'Promise.allSettled를 활용해 API 요청을 병렬 처리',
          '성공/실패 요청을 분기 처리하여 주요 콘텐츠는 빠르게 렌더링',
        ],
        result: [
          'LCP: 2.8초 → 2.3초 (18% 개선)',
          'Lighthouse 성능 점수: 56 → 76 상승',
          '초기 페이지 체감 속도 개선 및 사용자 이탈 방지',
        ],
      },
      {
        title: '다양한 형태의 콘텐츠를 담을 수 있는 Carousel 구조 구현',
        asIs: [
          'Swiper, Embla 등 라이브러리는 이미지 슬라이더에 최적화되어 있고, 내부 요소가 다양해질수록 제약이 많았음',
          '반응형 커스터마이징 및 콘텐츠 타입 확장에 어려움이 있었고, 직접 구조를 제어하기 어려웠음',
        ],
        toBe: [
          '캐러셀 내부에 다양한 컴포넌트를 담을 수 있도록 제네릭 기반 구조 설계',
          '화면 크기에 따라 콘텐츠 개수를 유연하게 조절하고, 슬라이딩/터치 대응 포함',
          '라이브러리 없이 직접 구현하여 구조를 자유롭게 커스터마이징 가능하도록 설정',
        ],
        result: [
          '단순 이미지 슬라이더가 아닌 다양한 콘텐츠 대응 가능',
          '데스크톱/모바일에서도 자연스럽고 일관된 UX 제공',
          '재사용 가능한 유연한 Carousel 컴포넌트 확보',
        ],
      },
      {
        title: 'SEO 및 검색 노출 최적화',
        asIs: ['메타 태그 누락, 소셜 미리보기 미표시, 콘텐츠 검색 노출 불가'],
        toBe: [
          'Next.js의 `generateMetadata`로 페이지별 메타 자동 생성',
          'sitemap.xml / robots.txt 설정',
          'Google Search Console 연동으로 노출 여부 및 CTR 확인',
        ],
        result: [
          'CTR: 22.6%, Average Position: 4.9 확보',
          '소셜 공유 시 미리보기 썸네일 정상 표시',
          'SEO 구조 설계 및 적용 경험 축적',
        ],
      },
    ],
    retrospective:
      '단순히 콘텐츠를 보여주는 것이 아니라, 사용자가 몰입해서 반복 학습할 수 있도록 구조를 설계하는 데 집중했습니다.\n퀴즈 흐름은 이벤트 기반 아키텍처로 재설계하고, 성능 병목 해결과 SEO까지 고려하여 서비스 완성도를 높였습니다.\n특히 북마크, 퀴즈, 대시보드가 하나의 학습 흐름으로 연결되도록 유저 여정을 설계한 과정은 제품 중심의 프론트엔드 사고를 키우는 계기가 되었습니다.',
  },
  {
    title: 'react-player-plugin-prompter',
    period: '2024.10 – 2024.12',
    links: {
      github: 'https://github.com/smosco/react-player-plugin-prompter',
      docs: 'https://www.npmjs.com/package/react-player-plugin-prompter',
    },
    thumbnail: '/images/portfolio/print/r-block.png',
    overview:
      'react-player-plugin-prompter는 BIENGUAL에서 자막 기능을 커스터마이징할 수 없어 직접 만든 React 기반 오픈소스 자막 컴포넌트입니다.\n자막 북마크, 보기 모드, 넘기기 등 학습 흐름에 맞춘 기능을 props와 콜백으로 제어할 수 있게 설계했고,\n자막 수가 많아질수록 생기던 버퍼링 이슈는 이진 탐색으로 해결했습니다.\n타입 안정성, 자동 배포 파이프라인도 구축하며 외부 개발자 관점의 설계 경험을 쌓을 수 있었습니다.',
    roles: [
      '전체 라이브러리 설계 및 구현 주도',
      'Yarn Workspaces 기반 모노레포 구조 구성',
      'GitHub Actions + esbuild 기반 NPM 자동 배포 파이프라인 구축',
      '실제 서비스(BIENGUAL) 연동을 위한 인터페이스 설계 및 리팩터링',
    ],
    stack: [
      'React, TypeScript, Vite, SCSS, esbuild',
      'Yarn Workspaces (Monorepo)',
      'GitHub Actions (CI/CD)',
    ],
    features: [
      '자막 동기화 – 영상 재생 시간에 맞춰 자막 자동 하이라이트 및 스크롤',
      '타임라인 탐색 – 자막 클릭 시 해당 시간대로 영상 이동 (seekTo)',
      '뷰 모드 – 한 줄 보기 / 전체 보기 전환',
      '단어 클릭 이벤트 지원 – 외부 단어 사전/북마크 기능과 연동 가능',
      '범용성 고려 – 외부 플레이어 연동을 위한 Props 설계',
    ],
    featureImages: [
      '/images/portfolio/print/r-line.png',
      '/images/portfolio/print/r-block.png',
    ],
    issues: [
      {
        title: '대용량 자막 탐색 성능 최적화',
        asIs: [
          '자막을 순차 탐색(O(n)) 방식으로 처리하여 1,000개 이상일 때 평균 탐색 시간 13.2ms 소요',
          '→ 영상 진행 중 버퍼링 발생',
        ],
        toBe: [
          '이진 탐색(O(log n)) 알고리즘으로 개선하여 평균 탐색 시간 0.15ms로 단축',
        ],
        result: [
          '탐색 속도 88% 개선',
          '자막 스크롤 및 하이라이트의 실시간성 확보',
          '대용량 자막에서도 안정적인 UX 제공',
        ],
      },
      {
        title: '개발 생산성 향상을 위한 구조 개선',
        asIs: [
          'CRA 환경에서 데모 및 본 라이브러리를 동시에 관리하며 설정 중복과 테스트 지연 발생',
        ],
        toBe: [
          'Yarn Workspaces 기반으로 core/demo 분리된 모노레포 구조 구성',
          '공통 설정 중앙 관리 및 GitHub Actions를 통한 NPM 자동 배포 파이프라인 구성',
        ],
        result: ['개발과 배포 흐름을 자동화하여 생산성 향상'],
      },
    ],
    retrospective:
      '처음으로 직접 설계하고 배포까지 진행한 오픈소스 라이브러리로, 단순한 컴포넌트를 넘어 학습 효율성과 UI 흐름을 동시에 고민한 프로젝트였습니다.\n자막을 시간 기반으로 탐색하는 과정에서 탐색 알고리즘, 인터랙션 설계, 성능 개선 등 프론트엔드 기술 전반을 깊이 있게 다룰 수 있었습니다.\n특히 라이브러리의 사용성과 확장성을 고려해 Props 구성, 외부 상태 연동, 뷰 모드 제어 등 범용 설계를 적용했고,\nBIENGUAL 프로젝트에 실제 적용되며 실전 피드백을 통해 개선할 수 있었습니다.\n앞으로는 더 많은 사용자와 다양한 서비스에서도 쉽게 사용할 수 있도록, 문서화 및 사용성 개선을 이어갈 예정입니다.',
  },
];
