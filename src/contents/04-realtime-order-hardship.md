---
id: 12
title: '[Next Table Order #3] 실시간 주문 처리는 왜 이렇게 어려운 걸까'
date: 2025-02-12 15:00:00
category: next table order
thumbnail: '/images/thumbnail/실시간주문썸.webp'
draft: false
---

📞 **"손님이 주문 넣었는데 화면에 안 떠요!"**  
😅 **"어… 새로고침 해보시겠어요?"**  
😡 **"??? (주먹 불끈)"**

이건 아니었다.
**주문이 들어오면, 사장님이 실시간으로 확인할 수 있어야 한다.**

그럼 **_"페이지를 새로고침하지 않고, 주문 상태를 실시간으로 업데이트하려면 어떻게 해야 할까?"_**

✔ Polling을 사용할 수도 있고  
✔ WebSocket을 사용할 수도 있고  
✔ SSE(Server-Sent Events)를 사용할 수도 있다.

나는 **SSE를 활용한 실시간 주문 관리 시스템을 구축했다.**  
하지만 예상치 못한 문제들이 발생했다…

## → 어떤 문제가 있었고, 어떻게 해결했는지 함께 살펴보자! 🚀

![실시간 주문](gifs/실시간주문.gif)

## **Why SSE? (Not Polling? Not WebSocket?)**

![polling](images/polling.png)
Polling(일반적인 API 요청): 클라이언트 요청이 있을 때만 서버가 응답  
![websocket](images/websocket.png)
WebSocket: 서버에서도 자유롭게 메시지를 보낼 수 있도록 양방향 소통  
![sse](images/sse.png)
SSE: 서버로부터 단방향 통신

- 서버야, 지금부터 무슨 일이 있으면 나한테 말해줘. 난 듣기만 할게~

### **SSE(Server-Sent Events)란?**

SSE는 **HTTP 기반의 실시간 데이터 푸시 방식**이다.

✔ 서버에서 **클라이언트로만** 데이터를 보낼 수 있음  
✔ 기존 HTTP 연결을 유지하면서 서버가 필요한 데이터를 전송  
✔ 단순한 이벤트 스트리밍에 최적화됨

📌 **Polling, SSE, WebSocket 비교**

| 방식          | 장점                                                                                                                             | 단점                                | 사용 예시                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------- |
| **Polling**   | 간단한 구현, 모든 브라우저 지원                                                                                                  | 불필요한 요청 발생, 실시간성 떨어짐 | 페이지 자동 새로고침, 간단한 알림      |
| **WebSocket** | 양방향 통신 가능                                                                                                                 | WebSocket 서버 필요, 설정 복잡      | 채팅, 게임, 다중 사용자 협업           |
| **SSE**       | HTTP 기반, 간단한 구현([JavaScript Web API EventSource 객체 사용](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)) | 단방향 통신만 가능                  | 실시간 주문 관리, 금융 데이터 스트리밍 |

💡 **나의 선택:**

- **Polling** → 트래픽 부담이 너무 크고 실시간성이 떨어짐
- **WebSocket** → 양방향 통신이 필요하지 않음
- **SSE** → 주문 상태 업데이트만 하면 되므로 단방향 소통으로 충분

✅ **SSE를 사용하기로 결정!**

---

## **문제 상황: SSE를 적용했는데, 최적화가 부족했다!**

처음에는 **"SSE로 주문 상태를 실시간으로 보내면 끝 아니야?"** 라고 생각했다.  
그런데 운영하면서 예상치 못한 문제들이 터졌다.

### **기존 SSE 방식의 문제점**

❌ **처음 접속하면 주문 목록이 안 보임**

- SSE는 이벤트가 발생해야 데이터를 받을 수 있음
- 새로운 주문이 발생하기 전까지 데이터가 안 온다 → 빈 화면 🤯

❌ **불필요한 전체 데이터 전송**

- 주문 한 개 바뀌어도, **모든 주문 데이터를 다시 전송**
- 데이터가 많아질수록 **트래픽 낭비 + 서버 부하 증가**

❌ **성능 이슈: 주문 수가 많아질수록 느려짐**

- 100개 주문 → 괜찮음
- 10,000개 주문 → 좀 느려짐
- 1,000,000개 주문 → 서버 터짐 🫠

---

## **해결 방법: SSE를 Refetch 트리거로 활용하기**

📌 **기존 SSE 방식 (비효율적)**

1️⃣ SSE가 **전체 주문 데이터를 계속 전송**  
2️⃣ 네트워크 트래픽 증가 & 서버 부하 심화

📌 **개선된 SSE 방식 (최적화)**

1️⃣ SSE는 **"주문 변경됨!" 신호만 전송**  
2️⃣ 클라이언트가 **변경된 주문만 가져오는 API 호출**

➡ **"실시간 업데이트는 유지하면서도, 불필요한 트래픽을 줄이는 방식!"**

---

## **이벤트 로그 테이블 도입**

기존 SSE는 **orders 테이블**의 변경 사항을 직접 감지함 → **부하 증가**

💡 해결 방법 → **order_events 테이블**을 도입하여 "변경 로그"만 감지

```sql
CREATE TABLE public.order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

| event_type    | 설명             |
| ------------- | ---------------- |
| order_created | 새로운 주문 생성 |
| order_updated | 주문 상태 변경   |
| order_paid    | 결제 완료        |
| order_failed  | 결제 실패        |

📌 **orders 테이블을 감지하는 것이 아니라, order_events 테이블을 감지!**

✅ 불필요한 데이터 변경 감지 방지  
✅ 최소한의 트래픽으로 실시간 업데이트 가능  
✅ 확장성도 확보 가능

---

## **개선된 SSE API 코드**

💡 **기존 방식 (비효율적)**

```tsx
supabase
  .channel('orders')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'orders' },
    async (payload) => {
      const { data: orders } = await supabase.from('orders').select('*');
      writer.write(
        new TextEncoder().encode(`data: ${JSON.stringify(orders)}\n\n`),
      );
    },
  )
  .subscribe();
```

✅ 모든 주문 데이터를 계속 전송 → **트래픽 낭비**

💡 **개선된 방식 (최적화됨)**

```tsx
supabase
  .channel('order_events')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'order_events' },
    (payload) => {
      writer.write(
        new TextEncoder().encode(
          `data: ${payload.new.event_type}:${payload.new.order_id}\n\n`,
        ),
      );
    },
  )
  .subscribe();
```

✅ **"주문이 변경됨" 이벤트만 전송**  
✅ 클라이언트에서 **해당 주문 데이터만 가져옴**

---

## **실험: 성능 차이 비교**

| 주문 개수   | 기존 방식 (전체 refetch) | 새로운 방식 (이벤트 로그 기반) |
| ----------- | ------------------------ | ------------------------------ |
| 100개       | 5ms                      | **3ms**                        |
| 10,000개    | 150ms                    | **5ms**                        |
| 1,000,000개 | 💀 3.2s (서버 과부하)    | **6ms**                        |

✅ **데이터가 많아질수록 개선 효과가 극명하게 차이남**

---

## **결론: 실시간 데이터 최적화, 꼭 필요하다!**

✅ 실시간 데이터라고 **모든 데이터를 전송할 필요는 없다!**  
✅ **변경 감지만 전송하고, 필요한 데이터만 가져오는 방식**이 효율적이다.  
✅ **이벤트 로그 테이블을 활용하면 성능을 획기적으로 개선할 수 있다!** 🚀
