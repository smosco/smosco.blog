---
id: 10
title: '[Next Table Order #1] 주문 리셋, 사장님도 헷갈린다'
date: 2025-02-05 18:00:00
category: next table order
thumbnail: '/images/thumbnail/주문리셋썸.webp'
draft: false
---

테이블 오더 시스템을 만들다가 예상치 못한 문제가 터졌다.  
손님이 테이블에서 주문하고, 나가고, 새로운 손님이 앉았는데…  
💥 **이전 손님의 주문이 그대로 남아있다?!?**

"어? 이거 원래 이렇게 되는 거야?"  
"그럼 손님이 바뀔 때마다 사장님이 직접 테이블을 초기화해줘야 하나?"  
"아니, 자동으로 해결할 방법이 없을까?"

🤯 **이건 좀 이상한데?**

---

## **🧐 테이블 오더, 생각보다 쉽지 않다?**

처음엔 단순히 `table_id` 기준으로 주문을 불러왔다.  
손님이 테이블에서 주문하면, `orders` 테이블에 저장되고, `table_id`로 주문을 가져오면 끝.

<!-- TODO(@smosco): 주문 내역에 내가 주문한게 아닌 것도 포함된 이미지 -->

그런데…  
🚨 **손님이 바뀌어도 같은 `table_id`를 사용하니까, 이전 손님의 주문이 그대로 남아있다!**  
🚨 **새로운 손님은 ‘내가 주문한 게 아닌데?’라고 생각할 것.**  
🚨 **사장님은 테이블이 바뀔 때마다 직접 초기화해야 한다.**

🛑 **"이걸 자동으로 해결할 방법이 없을까?"**

---

## **💡 해결책: `order_groups` 도입!**

우리가 찾은 해결책은 바로 **손님 단위로 주문을 그룹화하는 것**이었다.

✅ **하나의 `order_group`은 한 손님의 주문을 의미**  
✅ **새로운 손님이 오면 `order_group`을 새로 생성**  
✅ **이전 손님의 주문과 새로운 손님의 주문이 확실하게 분리**

```ts
// 현재 열린 order_group이 있는지 확인
const { data: existingGroup } = await supabase
  .from('order_groups')
  .select('id')
  .eq('table_id', tableId)
  .is('closed_at', null)
  .single();

// 없으면 새 order_group 생성
if (!existingGroup) {
  const { data: newGroup } = await supabase
    .from('order_groups')
    .insert([{ table_id: tableId }])
    .select('id')
    .single();
  existingGroup = newGroup;
}
```

🔥 **이제 손님이 바뀌면 이전 주문과 분리할 수 있다!**  
🔥 **사장이 order_group만 닫으면 새로운 주문으로 시작된다!**

---

## **😱 그런데… 사장님이 실수로 닫아버리면?!**

💥 **사장님이 실수로 `order_group`을 닫아버리면 주문 내역이 사라진다!**  
💥 **테이블을 다시 열어야 하는데 방법이 없다!**

🚀 **"이걸 복구할 방법이 필요하지 않을까?"**

✅ **해결책: '복구' 기능 추가!**

```ts
async function reopenOrderGroup(tableId: number) {
  await supabase
    .from('order_groups')
    .update({ closed_at: null }) // ✅ 다시 열기!
    .eq('table_id', tableId)
    .not('closed_at', 'is', null)
    .order('closed_at', { ascending: false }) // 가장 최근 닫힌 order_group을 선택
    .limit(1);
}
```

💡 **이제 사장님이 실수로 닫아도 다시 열 수 있다!**

---

## **⏳ 하지만, 사장님이 닫는 걸 까먹으면?**

그런데 또 다른 문제가 생겼다.

🚨 **사장님이 닫는 걸 까먹으면?**  
🚨 **손님이 떠났는데 주문이 계속 열린 상태면?**

🤔 "그럼 자동으로 닫히게 하면 어떨까?"

✅ **해결책: 일정 시간이 지나면 자동으로 닫아버리기!**

```ts
async function autoCloseExpiredOrderGroups() {
  const THRESHOLD_MINUTES = 30;
  const now = new Date();
  const thresholdTime = new Date(now.getTime() - THRESHOLD_MINUTES * 60 * 1000);

  // 최근 `THRESHOLD_MINUTES` 이상 주문이 없는 그룹 찾기
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

💡 **이제 사장님이 안 닫아도, 손님이 떠나면 자동으로 닫힌다!**

---

## **🔥 최종 정리: 스마트한 테이블 오더 시스템 완성!**

✅ **손님이 바뀌면 자동으로 `order_group`이 생성!**  
✅ **사장님이 실수로 닫아도 복구 가능!**  
✅ **사장님이 닫는 걸 까먹어도 자동으로 닫힘!**

🚀 **이제야 진짜로 "테이블 오더 시스템답다"**

---

## **👀 그리고 보니, 실무에서도 이런 고민이 많다**

👀 **쿠팡, 배달의민족, 토스페이먼츠** 같은 서비스에서도  
결제 트랜잭션을 관리하는 방식이 비슷하다.

- 주문이 결제되기 전까지는 **"장바구니"**
- 결제가 완료되면 **"새로운 주문 그룹"** 생성
- 기존 주문과 **완전히 분리되는 구조**

우리는 단순히 테이블 오더를 만들었지만, **이런 고민이 실무에서도 필요하다는 걸 배웠다.**
