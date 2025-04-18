---
id: 2
title: '[BIENGUAL] 퀴즈 기능 개선을 통한 이벤트 기반 설계 도입'
date: 2024-11-20 11:01:12
category: developments
thumbnail: '/images/thumbnail/quiz.jpg'
draft: false
---

CNN 뉴스와 YouTube 콘텐츠 기반으로 학습 퀴즈를 제공하는 기능을 개발하며, 상태 관리 방식의 한계를 극복하기 위해 **이벤트 기반 설계(event-driven architecture)**를 도입했습니다. 이번 포스트에서는 기존 문제점, 개선 과정을 통해 얻은 교훈, 그리고 이벤트 기반 설계의 가치를 공유합니다.

---

## 왜 이벤트 기반 설계인가?

이벤트 기반 설계는 사용자 액션이나 시스템에서 발생하는 사건(이벤트)을 중심으로 상태를 관리하고, 이를 통해 로직을 유연하게 처리하는 접근 방식입니다. 이 설계 방식은 다음과 같은 경우 유용합니다:

- **상태 변화가 복잡하거나 연속적인 흐름이 필요한 경우**: 이벤트의 축적을 통해 상태를 관리할 수 있습니다.
- **확장 가능성과 유지보수성이 중요한 경우**: 새로운 로직이나 기능 추가 시 기존 코드를 최소한으로 변경할 수 있습니다.
- **다양한 비동기 작업을 다룰 때**: 이벤트를 중심으로 흐름을 관리하면 복잡한 의존 관계를 단순화할 수 있습니다.

대표적으로 **Redux**와 같은 상태 관리 라이브러리, 대규모 분산 시스템, 메시징 큐를 활용한 시스템 설계에 이 철학이 녹아 있습니다.

---

## 기존 상태 관리의 한계

### 문제점: 스냅샷 중심의 상태 관리

기존 구현에서는 `isCorrect`와 같은 단일 상태 변수를 통해 정답 여부를 관리했습니다. 이 방식은 간단해 보였지만, 다음과 같은 문제를 야기했습니다:

1. **잘못된 상태 변화**: 정답을 맞추는 즉시 `isCorrect`가 `true`로 변경되면서 다음 문제가 자동으로 넘어가는 버그가 발생.
2. **결과 계산 오류**: 결과 페이지에 도달하지 못하거나, 정답이 0/2로 잘못 계산되는 문제가 빈번히 나타남.
3. **시간 축의 부재**: 상태를 특정 시점의 스냅샷으로만 관리하려다 보니, 상태 변화의 흐름이나 이벤트 간 관계를 표현할 수 없었음.

---

## 이벤트 기반 설계를 통한 개선

### 시간의 흐름을 반영한 상태 관리

상태를 "단일 스냅샷"으로 보던 기존 방식에서 탈피하여, 상태를 **이벤트의 축적을 통해 계산된 결과**로 바라보는 방향으로 전환했습니다. 이를 위해 각 사용자 행동을 이벤트로 정의하고, 이벤트를 해석해 상태를 계산하는 구조를 도입했습니다.

### 주요 설계 변경

1. **이벤트 정의**

   - `submit_answer`: 사용자가 답을 제출한 이벤트.
   - `response_question_result`: 서버에서 받은 정답 결과.
   - `retry_quiz`: 틀린 문제만 다시 출제.

2. **상태 변화 흐름 명확화**

   - 각 문제는 `ready`, `submitting`, `correct`, `wrong` 상태를 가지며, 이를 기반으로 상태 변화를 관리.

3. **로직 단순화**
   - 이벤트를 통해 상태를 계산하므로, 각 상태 변화가 명확히 정의되고, 의도치 않은 상태 변화가 방지.

### 간단한 코드 예시

아래는 이벤트 기반 설계를 React의 `useReducer`를 사용해 구현한 간단한 예시입니다:

```typescript
type State = {
  id: string;
  status: 'ready' | 'submitting' | 'correct' | 'wrong';
}[];
type Action =
  | { type: 'download_quiz'; questions: { id: string }[] }
  | { type: 'submit_answer'; id: string }
  | { type: 'response_result'; id: string; correct: boolean }
  | { type: 'retry_quiz' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'download_quiz':
      return action.questions.map((q) => ({ id: q.id, status: 'ready' }));
    case 'submit_answer':
      return state.map((q) =>
        q.id === action.id ? { ...q, status: 'submitting' } : q,
      );
    case 'response_result':
      return state.map((q) =>
        q.id === action.id
          ? { ...q, status: action.correct ? 'correct' : 'wrong' }
          : q,
      );
    case 'retry_quiz':
      return state.map((q) =>
        q.status === 'wrong' ? { ...q, status: 'ready' } : q,
      );
    default:
      return state;
  }
};
```

---

## 이벤트 기반 설계의 결과

### 성과

- **정확한 상태 흐름**: 문제 풀이 → 정답 제출 → 결과 계산 → 다시 풀기까지의 흐름이 명확해졌습니다.
- **버그 해결**: 문제 개수가 줄어들거나 결과 계산이 잘못되는 오류를 완전히 제거.
- **확장 가능성**: 새로운 로직 추가 시 기존 코드 변경 없이 이벤트 정의만으로 기능 확장이 가능.

### 학습과 교훈

- **상태는 이벤트의 축적**: 단일 상태 변수가 아닌, 시간의 흐름 속에서 상태가 어떻게 변해왔는지를 추적하는 것이 중요함을 배웠습니다.
- **코드 가독성과 유지보수성 향상**: 이벤트 기반 설계 덕분에 복잡한 로직도 단순화할 수 있었습니다.

---

## 이벤트 기반 설계의 예시: 간단한 상태 변화

다음은 각 문제 상태가 `ready`에서 시작하여 정답 제출 후 `correct` 또는 `wrong`으로 변화하는 예시입니다:

```text
ready → submitting → correct/wrong
```

이러한 상태 변화를 통해 복잡한 로직을 명확히 정의하고, 코드의 가독성을 높일 수 있었습니다.

---

## 결론

이벤트 기반 설계를 통해 얻은 경험은 향후 다른 복잡한 기능 개발에도 적용할 수 있는 중요한 교훈이 되었습니다. 시스템의 상태를 단순히 "현재 상태"로만 바라보는 것이 아니라, "상태 변화의 연속성"을 중심으로 설계하는 접근 방식이 얼마나 강력한지를 직접 체감할 수 있었습니다.
