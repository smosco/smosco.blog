---
id: 4
title: '[오픈소스 개발기] 자막 동기화 문제 해결: 순차 탐색에서 이진 탐색으로'
date: 2024-12-03 14:00:00
category: developments
thumbnail: '/images/thumbnail/binary-search.webp'
draft: false
---

BIENGUAL 프로젝트에서 자막 동기화 문제는 예상보다 훨씬 복잡한 도전 과제였습니다. 작은 문제로 보였지만, 데이터를 탐색하는 방식이 얼마나 성능에 영향을 미칠 수 있는지를 경험하며 많은 것을 배웠습니다. 이 글에서는 **왜 문제가 발생했는지**, **어떻게 해결했는지**, 그리고 **배운 점**을 정리하겠습니다.

---

## 문제 정의

react-player-plugin-prompter는 현재 재생 중인 시간에 맞는 자막을 표시하기 위해 자막 데이터 배열에서 해당 항목을 찾는 과정을 반복합니다. 초기에는 배열의 각 항목을 순차적으로 탐색하여 해결했습니다. 하지만:

### 문제 상황

1. **데이터의 증가**:

   - 자막 데이터가 10개 이하일 때는 문제가 없었으나, 데이터가 100개 이상으로 증가하면서 성능 저하가 눈에 띄기 시작했습니다.

2. **비효율적인 탐색 방식**:

   - 순차 탐색 방식은 최악의 경우 배열의 모든 요소를 확인해야 하므로, 탐색 시간이 _O(n)_ 에 비례하여 증가했습니다.

3. **실제 사용자 경험 악화**:
   - 동기화 지연으로 인해 자막이 끊기거나 비디오와 맞지 않는 상황이 발생했습니다.

---

## 시도했던 해결 방안

### 초기 접근: 순차 탐색

순차 탐색은 간단하게 배열을 처음부터 끝까지 순회하며 조건에 맞는 항목을 찾는 방식입니다. 아래는 초기 코드입니다:

```typescript
function findCurrentScriptIndexSequential(scripts, currentTime) {
  for (let i = 0; i < scripts.length; i++) {
    if (
      currentTime >= scripts[i].startTimeInSecond &&
      currentTime < scripts[i].startTimeInSecond + scripts[i].durationInSecond
    ) {
      return i;
    }
  }
  return -1; // 찾지 못한 경우
}
```

- **장점**:
  - 구현이 간단하고 직관적입니다.
- **단점**:
  - 배열이 길어질수록 성능이 저하됩니다.

### 최종 해결책: 이진 탐색 도입

이진 탐색은 정렬된 배열에서 중간 값을 기준으로 탐색 범위를 절반으로 줄여 나가는 방식입니다. 탐색 시간이 _O(log n)_ 으로 개선되어, 대규모 데이터에서도 효율적입니다.

**변경된 코드**:

```typescript
export function findCurrentScriptIndex(
  scripts: Script[],
  currentTime: number,
): number {
  let left = 0;
  let right = scripts.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const script = scripts[mid];

    if (
      currentTime >= script.startTimeInSecond &&
      currentTime < script.startTimeInSecond + script.durationInSecond
    ) {
      return mid;
    } else if (currentTime < script.startTimeInSecond) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left; // 가장 가까운 다음 자막 인덱스 반환
}
```

- **장점**:
  - 배열의 크기가 커질수록 성능 개선 효과가 극대화됩니다.
- **단점**:
  - 배열이 정렬되어 있어야 한다는 조건이 필요합니다.

---

## 성능 비교

이진 탐색을 도입하기 전과 후의 성능 차이를 아래와 같이 측정했습니다:

### 테스트 조건

- **테스트 환경**: 동일한 시스템에서 순차 탐색과 이진 탐색 각각 실행.
- **데이터 세트**: 100개, 1,000개, 10,000개 크기의 자막 데이터를 생성.
- **탐색 조건**: 현재 시간을 랜덤으로 생성하여 배열 내에서 해당 시간을 탐색.
- **측정 방법**: 각 탐색 알고리즘을 10,000회 반복 실행하며 평균 실행 시간을 측정.

테스트를 위해 아래와 같은 코드를 사용했습니다:

```typescript
import { performance } from 'perf_hooks';

function generateMockData(size: number) {
  return Array.from({ length: size }, (_, i) => ({
    startTimeInSecond: i * 10,
    durationInSecond: 10,
    enScript: `Sample text ${i}`,
    koScript: `샘플 텍스트 ${i}`,
    isHighlighted: false,
  }));
}

function testPerformance() {
  const dataSizes = [100, 1000, 10000];
  const iterations = 10000;

  dataSizes.forEach((size) => {
    const scripts = generateMockData(size);
    const randomTime = Math.random() * size * 10;

    const sequentialStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      sequentialSearch(scripts, randomTime);
    }
    const sequentialEnd = performance.now();

    const binaryStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      binarySearch(scripts, randomTime);
    }
    const binaryEnd = performance.now();

    console.log(`Data size: ${size}`);
    console.log(
      `Sequential Search: ${(sequentialEnd - sequentialStart).toFixed(2)} ms`,
    );
    console.log(`Binary Search: ${(binaryEnd - binaryStart).toFixed(2)} ms`);
  });
}

testPerformance();
```

### 테스트 결과

| 데이터 크기 | 순차 탐색 평균 시간(ms) | 이진 탐색 평균 시간(ms) |
| ----------- | ----------------------- | ----------------------- |
| 100         | 0.15                    | 0.05                    |
| 1,000       | 1.40                    | 0.10                    |
| 10,000      | 13.20                   | 0.15                    |

이진 탐색은 데이터 크기가 증가할수록 성능에서 큰 차이를 보였습니다.

---

## 이진 탐색과 알고리즘의 중요성

### 순차 탐색 vs. 이진 탐색

1. **순차 탐색**

   - **시간 복잡도**: _O(n)_
   - **적용 시점**: 데이터가 작고, 탐색 조건이 복잡하지 않은 경우.

2. **이진 탐색**
   - **시간 복잡도**: _O(log n)_
   - **적용 시점**: 데이터가 크고, 정렬된 상태가 보장될 경우.

### 알고리즘의 실제 중요성

처음에는 "데이터가 몇 개 안 되는데 굳이 알고리즘을 신경 쓸 필요가 있을까?"라고 생각했습니다. 하지만 데이터 크기가 조금만 커져도 성능 차이는 매우 크게 나타났습니다. 이러한 경험은 **작은 데이터셋이라도 올바른 알고리즘을 적용하는 것이 중요하다**는 것을 깨닫게 했습니다.

---

## 배운 점

### 1. 성능 최적화의 중요성

간단한 탐색 문제라도 데이터 크기에 따라 성능이 급격히 저하될 수 있습니다. 성능 최적화는 사용자 경험을 개선하는 핵심 요소입니다.

### 2. 알고리즘 선택의 중요성

알고리즘을 선택할 때, 데이터 크기와 특성을 고려하는 것이 중요합니다. 정렬 여부, 데이터 크기, 탐색 빈도 등을 종합적으로 판단해야 합니다.

---

## 결론

이진 탐색을 도입함으로써 BIENGUAL의 자막 동기화 문제를 성공적으로 해결할 수 있었습니다. 이번 경험은 데이터 크기가 작더라도 올바른 알고리즘을 사용하는 것이 얼마나 중요한지를 배우는 계기가 되었습니다.
