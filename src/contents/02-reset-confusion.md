---
id: 10
title: '손님 교체 시 주문 리셋 문제와 해결 과정'
date: 2025-02-05 18:00:00
category: next table order
thumbnail: '/images/thumbnail/주문리셋썸.webp'
draft: false
---

## 1. 들어가며

테이블 오더 시스템을 개발하는 과정에서 예상치 못한 문제가 발생했다.  
처음에는 "테이블별로 주문을 모으면 끝"이라고 생각했지만, 손님이 교체되는 상황에서 이 방식이 완벽하지 않다는 걸 깨달았다.

이 문서에서는 개발 과정에서 발견한 문제와 해결 과정을 정리한다.  
비슷한 시스템을 만드는 사람들에게 참고가 되기를 바란다.

## 2. 문제 상황: 주문이 리셋되지 않는다

초기 설계는 테이블마다 `table_id`를 부여하고, 주문을 이 `table_id`에 저장하는 방식이었다.

- 손님이 테이블에 앉는다.
- 주문을 넣는다.
- `table_id`로 주문을 조회한다.

단순하고 직관적이었지만, 손님이 떠난 뒤 새 손님이 앉으면 문제가 발생했다.

**문제 상황**

- 새 손님이 주문 화면을 열었을 때 이전 손님의 주문 내역이 그대로 남아 있었다.
- 사장님이 수동으로 테이블을 초기화해야 했다.
- 초기화를 깜빡하면 새 손님이 당황하는 일이 생겼다.

테이블 오더 시스템은 손님 교체 시 **주문이 깔끔히 초기화**되는 것을 기본으로 해야 하지만, 기존 구조로는 이를 보장할 수 없었다.

## 3. 문제 원인 분석

문제의 핵심은 주문을 테이블(`table_id`) 단위로만 관리했다는 점이다.

테이블은 물리적 공간일 뿐이며,  
**손님 세션 단위로 주문을 관리**해야 했다.

즉,

- 손님이 바뀌면 새 세션을 시작하고,
- 주문도 새 세션에 속해야 한다.

기존 구조는 테이블만 바라봐서 손님 교체를 인식하지 못했다.  
해결하려면 테이블이 아니라 **손님 단위로 주문 그룹**을 새로 만들어야 했다.

## 4. 처음 생각한 해결 방법들 (그리고 왜 탈락했는지)

처음에는 손님이 떠날 때마다 테이블 주문을 수동으로 초기화하는 방법을 생각했다.

**문제점**

- 사장님이 일일이 기억하고 관리해야 하는 부담
- 초기화를 깜빡하면 여전히 문제 발생
- 실수로 주문을 삭제하면 복구가 어렵다

또 다른 방법은 **손님 착석 시 자동으로 기존 주문 삭제**하는 것이었다.

**문제점**

- 잠시 자리를 비운 경우 주문이 사라질 위험
- 결제 직전에 삭제되면 사고 발생 가능성

결국, 주문을 단순히 "지우는 것"으로는 문제를 해결할 수 없었다.  
**손님 단위로 주문을 묶는 구조**가 필요했다.

## 5. 최종 해결책: `order_groups` 도입

새로운 개념인 `order_group`을 도입했다.  
`order_group`은 **손님 한 팀의 주문을 묶는 단위**다.

손님이 바뀔 때마다 새로운 `order_group`을 생성하고, 이후 주문은 이 그룹에 연결한다.

### 구조 변화

- 기존: `orders` → `table_id` 참조
- 변경: `orders` → `order_group_id` 참조

`order_groups` 테이블은 다음과 같은 필드를 가진다:

- `id`: 고유 식별자
- `table_id`: 연결된 테이블
- `created_at`: 생성 시각
- `closed_at`: 닫힌 시각 (진행 중이면 null)

![order_groups erd.svg](/images/posts/order_groups_erd.svg)

### 새로운 주문 흐름

1. 손님 착석 → 열린 `order_group`이 있는지 확인
2. 없으면 새 `order_group` 생성
3. 주문은 해당 `order_group`에 연결
4. 손님 퇴장 시 `order_group`을 수동 또는 자동 종료

### 예시 코드

```tsx
// 열린 order_group이 있는지 확인
const { data: existingGroup } = await supabase
  .from('order_groups')
  .select('id')
  .eq('table_id', tableId)
  .is('closed_at', null)
  .single();

// 없으면 새로 생성
if (!existingGroup) {
  const { data: newGroup } = await supabase
    .from('order_groups')
    .insert([{ table_id: tableId }])
    .select('id')
    .single();
  existingGroup = newGroup;
}
```

이 방식 덕분에 손님 교체 시 주문 기록을 자동으로 분리할 수 있게 되었고, 사장님의 관리 부담도 크게 줄었다.

## 6. 추가 문제와 보완책

### 문제 1: 사장님이 실수로 `order_group`을 닫았을 때

- 문제: 주문이 진행 중인데 그룹이 닫혀 추가 주문 불가
- 해결: **복구 기능** 추가 → 가장 최근 닫힌 `order_group`을 다시 열 수 있도록 함

```tsx
async function reopenOrderGroup(tableId: number) {
  await supabase
    .from('order_groups')
    .update({ closed_at: null })
    .eq('table_id', tableId)
    .not('closed_at', 'is', null)
    .order('closed_at', { ascending: false })
    .limit(1);
}
```

### 문제 2: 사장님이 테이블 종료를 깜빡했을 때

- 문제: 손님이 떠나도 주문이 열린 채 남아 데이터 꼬임 위험
- 해결: **자동 닫기 기능** 추가 → 마지막 주문 후 30분이 지나면 자동 종료

```tsx
async function autoCloseExpiredOrderGroups() {
  const THRESHOLD_MINUTES = 30;
  const now = new Date();
  const thresholdTime = new Date(now.getTime() - THRESHOLD_MINUTES * 60 * 1000);

  const { data: expiredGroups } = await supabase
    .from('order_groups')
    .select('id')
    .is('closed_at', null)
    .lt('last_order_time', thresholdTime);

  if (expiredGroups.length > 0) {
    await supabase
      .from('order_groups')
      .update({ closed_at: now })
      .in(
        'id',
        expiredGroups.map((g) => g.id),
      );
  }
}
```

이로써 사장님이 수동으로 관리할 필요가 거의 없어졌다.

## 7. 실제 적용 사례

`order_group` 기능을 개발한 후, 사장님용 관리 화면에도 반영했다.

- 주문 진행 중: 테이블 상태 = "주문 중"
- 주문 종료: 테이블 상태 = "비어 있음"
- 실수로 종료한 경우: **"마지막 주문 복구"** 버튼 제공

**주문 흐름**

![order_group_flowchart.svg](/images/posts/order_group_flowchart.svg)

1. 손님 착석 → 자동 `order_group` 생성
2. 주문 진행 → 현재 `order_group`에 연결
3. 손님 퇴장 → 수동 종료 또는 30분 후 자동 종료
4. 실수로 종료 시 → 복구 버튼으로 다시 열기

## 8. 맺음말

처음에는 테이블별 주문 관리로 충분하다고 생각했지만, 실제 문제를 겪으며 설계 방향을 바꿔야 했다.

핵심 교훈은 다음과 같다:

- 시스템은 **사용자의 실제 행동 흐름**을 자연스럽게 반영해야 한다.
- 데이터는 삭제하거나 덮는 것이 아니라 **안전하게 분리**해 관리해야 한다.
- **단순해 보이는 문제일수록** 설계 단계에서 깊이 고민해야 한다.

앞으로도 시스템을 설계할 때  
**누구를 기준으로 데이터를 관리할 것인가**를 항상 먼저 생각할 것이다.

이 경험이 비슷한 고민을 하는 사람들에게 작은 도움이 되기를 바란다.
