import React from 'react';
import Section from '@/components/Section';
import { ProjectDescription } from '@/components/ProjectDescription';
import { FeatureItem } from '@/components/FeatureItem';
import { IssueItem } from '@/components/IssueItem';

function ReactPlayerPluginPrompterPage() {
  return (
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
  );
}

export default ReactPlayerPluginPrompterPage;
