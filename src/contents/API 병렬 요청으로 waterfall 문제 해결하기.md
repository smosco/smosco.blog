---
title: 'BIENGUAL: API 병렬 요청으로 Waterfall 문제 해결하기'
date: 2024-12-10 12:00:00
category: developments
thumbnail: '/images/api-parallel.png'
draft: false
---

웹 애플리케이션을 개발하다 보면 성능 최적화가 주요 과제가 됩니다. 특히 BIENGUAL 프로젝트에서는 한 페이지에서 발생하는 다수의 API 요청이 직렬로 처리되면서 성능 저하 문제가 발생했는데요. 이 글에서는 이 문제를 병렬 요청으로 어떻게 해결했는지, 그리고 그 과정에서 배운 점들을 공유해 보겠습니다.

---

## 문제 상황: Waterfall 문제란?

Waterfall 문제는 API 요청이 순차적으로 처리되면서 발생하는 성능 저하를 말합니다. 예를 들어, A 요청이 완료된 후에야 B 요청이 시작되고, 그 다음에야 C 요청이 시작되는 방식입니다. 이 경우 총 실행 시간은 각 요청의 실행 시간을 모두 더한 만큼 소요됩니다. BIENGUAL 프로젝트에서는 여러 데이터를 한꺼번에 불러와야 하는 페이지에서 이 문제가 특히 심각했습니다. 사용자는 긴 대기 시간으로 인해 불편함을 겪었고, 이는 곧 UX의 저하로 이어졌습니다.

---

## 병렬 요청이란?

병렬 요청은 여러 API 요청을 동시에 실행하여 전체 처리 시간을 줄이는 방법입니다. 네트워크 레이어에서 여러 요청이 동시에 실행되므로, 가장 느린 요청의 완료 시간이 전체 응답 시간으로 결정됩니다. 직렬 요청과 비교했을 때 훨씬 빠른 성능을 기대할 수 있습니다.

### 직렬 요청의 동작

```javascript
async function fetchData() {
  const data1 = await fetch('/api/data1');
  const data2 = await fetch('/api/data2');
  const data3 = await fetch('/api/data3');
  return [data1, data2, data3];
}
```

위 코드는 각 요청이 완료된 후에야 다음 요청이 시작되므로, 실행 시간이 모든 요청 시간을 합친 만큼 걸립니다.

### 병렬 요청의 동작

```javascript
async function fetchData() {
  const [data1, data2, data3] = await Promise.all([
    fetch('/api/data1'),
    fetch('/api/data2'),
    fetch('/api/data3'),
  ]);
  return [data1, data2, data3];
}
```

병렬 요청을 사용하면 모든 요청이 동시에 시작되므로, 가장 오래 걸리는 요청 시간만큼만 소요됩니다.

---

## 문제 해결 과정

### 1. 처음엔 Promise.all로 시작

처음에는 `Promise.all`을 사용해서 병렬 요청을 구현했습니다. 이 방식은 매우 직관적이고 간단합니다. 하지만 단점도 있었죠. 요청 중 하나라도 실패하면 전체 요청이 실패 처리된다는 점입니다.

```javascript
async function fetchData() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fetch('/api/data1'),
      fetch('/api/data2'),
      fetch('/api/data3'),
    ]);
    return [data1, data2, data3];
  } catch (error) {
    console.error('요청 중 하나가 실패했습니다:', error);
  }
}
```

위 코드에서는 하나의 요청이라도 실패하면 모든 결과가 반환되지 않는 문제가 있었습니다.

### 2. Promise.allSettled로 개선

`Promise.allSettled`는 각각의 요청이 성공했는지 실패했는지를 개별적으로 처리할 수 있는 기능을 제공합니다. 이를 통해 실패한 요청은 로깅하거나 기본값으로 대체할 수 있었습니다.

```javascript
const results = await Promise.allSettled([
  fetchReadingPreview({ Cookie: cookieHeader }),
  fetchListeningPreview({ Cookie: cookieHeader }),
  fetchRecommendedBookmarks(),
  cookieHeader
    ? fetchRecommendedContents({ Cookie: cookieHeader })
    : Promise.resolve(mockRecommendedData),
]);

const initialReadingContents =
  results[0].status === 'fulfilled'
    ? results[0].value
    : { message: '리딩 콘텐츠 조회 실패', data: { readingPreview: [] } };

const initialListeningContents =
  results[1].status === 'fulfilled'
    ? results[1].value
    : { message: '리스닝 콘텐츠 조회 실패', data: { listeningPreview: [] } };

const initialSentences =
  results[2].status === 'fulfilled'
    ? results[2].value
    : { message: '오늘의 문장 조회 실패', data: { popularBookmarks: [] } };

const initialRecommendedContents =
  results[3].status === 'fulfilled'
    ? results[3].value
    : { message: '추천 콘텐츠 조회 실패', data: { recommendedContents: [] } };
```

이 방식은 한 요청이 실패하더라도 나머지 요청이 정상적으로 동작하도록 보장했습니다.

### 3. 우선순위에 따른 요청 처리

데이터를 필수와 부가 데이터로 나누고, 필수 데이터를 먼저 병렬로 요청한 뒤 부가 데이터를 백그라운드에서 처리하는 전략을 도입했습니다.

```javascript
async function fetchEssentialData() {
  const [essential1, essential2] = await Promise.all([
    fetch('/api/essential1'),
    fetch('/api/essential2'),
  ]);
  return { essential1, essential2 };
}

async function fetchAdditionalData() {
  const additional = await fetch('/api/additional');
  return additional;
}

async function fetchData() {
  const essentialData = await fetchEssentialData();
  fetchAdditionalData(); // 백그라운드 처리
  return essentialData;
}
```

---

## 배운 점

이 과정은 단순히 성능을 개선하는 것을 넘어, 사용자 경험을 어떻게 향상시킬지 고민한 사례였습니다.

1. **병렬 요청으로 성능 최적화:** Waterfall 문제를 해결하며 전체 응답 시간을 크게 단축시킬 수 있었습니다.
2. **안정적인 에러 처리:** `Promise.allSettled`로 각 요청의 성공 여부를 개별적으로 처리해 안정성을 높였습니다.
3. **우선순위 설정:** 필수 데이터를 우선 처리해 사용자 경험을 개선했습니다.
