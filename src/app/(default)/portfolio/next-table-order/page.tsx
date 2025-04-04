import React from 'react';
import Section from '@/components/Section';
import { ProjectDescription } from '@/components/ProjectDescription';
import { FeatureItem } from '@/components/FeatureItem';
import { IssueItem } from '@/components/IssueItem';

function NextTableOrderPage() {
  return (
    <Section title="Next Table Order 프로젝트">
      <ProjectDescription
        description="간단한 설정만으로 도입할 수 있는 웹 기반 테이블 오더 시스템 개발"
        techStack={[
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Supabase',
          'shadcn/ui',
        ]}
        demoLink="https://next-table-order.vercel.app/"
        githubLink="https://github.com/smosco/next-table-order"
      />

      <Section title="내가 구현한 기능">
        <FeatureItem
          videoId="5Ij_P55IUVo"
          title="메뉴 상세 모달"
          contributions={[
            '메뉴 이미지, 설명, 재료 확인',
            '옵션 선택 및 수량 조절',
            '장바구니 담기 기능',
          ]}
        />
        <FeatureItem
          videoId="vBpMuBCvBU4"
          title="장바구니 & 결제 페이지"
          contributions={[
            '장바구니 내 메뉴 및 옵션 확인',
            '수량 조절 및 삭제 기능',
            '총 금액 계산 및 결제 요청',
          ]}
        />
        <FeatureItem
          videoId="icQ-5QP8gqM"
          title="대시보드 홈"
          contributions={[
            '일/주/월 단위 매출 필터링',
            '매출 요약 카드 및 매출 그래프 구현',
            '인기 메뉴 TOP 5 차트',
            '최근 주문 리스트 표시',
          ]}
        />
        <FeatureItem
          videoId="LDkCZrZVcf0"
          title="메뉴 관리 페이지"
          contributions={[
            '카테고리 생성, 수정, 삭제 기능',
            '메뉴 추가, 수정, 삭제 기능',
            '메뉴 리스트 테이블 구성 (이름, 가격, 재고, 활성화)',
          ]}
        />
        <FeatureItem
          videoId="Vi0G8tfLK90"
          title="실시간 주문 관리"
          contributions={[
            '실시간 주문 리스트 UI 구성',
            '주문 상태 변경 버튼 구현',
            '날짜, 키워드 기반 필터 기능',
          ]}
        />
      </Section>

      <Section title="마주한 이슈">
        <IssueItem
          title="SSE 최적화로 실시간 주문 관리 개선"
          description="SSE 이벤트 트래픽을 줄이기 위해 주문 이벤트 로그 기반의 리스폰스를 구현했습니다."
          details={[
            'order_events 테이블 도입해 변경 로그만 감지',
            '클라이언트는 해당 주문만 refetch',
          ]}
          keywords={['SSE', 'order_events', '트래픽 최적화']}
          performance={[
            { key: '1만 건 응답시간', value: '150ms → 5ms' },
            { key: '100만 건 응답시간', value: '3.2s → 6ms' },
          ]}
        />

        <IssueItem
          title="order_group을 활용한 주문 단위 자동 초화"
          description="각 테이블의 주문 상태를 그룹 단위로 관리하고, 실수로 종료된 주문을 복구하거나 일정 시간 후 자동 종료되는 로직을 설계했습니다."
          details={[
            '테이블마다 열려 있는 주문 그룹이 없으면 새로운 order_group 생성',
            '사장님이 실수로 닫은 경우 복구 기능 제공',
            '일정 시간 경과 시 자동으로 order_group 종료 처리',
          ]}
          keywords={['order_group', '자동 초기화', '복구 로직']}
          performance={[
            {
              key: '다음 손님이 입장할 때 이전 주문이 보이지 않도록 처리',
              value: '안정적인 주문 흐름 유지',
            },
            { key: '수동 개입 감소', value: '초기화 필요 없음' },
          ]}
        />

        <IssueItem
          title="옵션이 다른 주문을 구분 처리"
          description="같은 메뉴라도 옵션 조합에 따라 장바구니 항목을 구분 처리하도록 로직을 개선했습니다."
          details={[
            'menuId + 옵션 조합 기반 고유 키 생성',
            '옵션 가격 포함 계산 및 UI 표기',
          ]}
        />

        <IssueItem
          title="가격 이력 보존을 위한 DB 구조 개선"
          description="과거 주문 정확도를 보장하기 위해 실시간 가격 대신 주문 시점의 가격을 저장하는 구조로 변경했습니다."
          details={[
            'order_items, order_item_options 테이블에 가격 저장',
            '조회 시 저장된 가격 기준으로 총합 계산',
          ]}
        />
      </Section>
    </Section>
  );
}

export default NextTableOrderPage;
