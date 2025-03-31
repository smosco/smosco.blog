import React from 'react';
import Section from '@/components/Section';
import { ProjectDescription } from '@/components/ProjectDescription';
import { FeatureItem } from '@/components/FeatureItem';
import { IssueItem } from '@/components/IssueItem';

function BiengualPage() {
  return (
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
  );
}

export default BiengualPage;
