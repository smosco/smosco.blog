---
id: 5
title: '[BIENGUAL] 이미지 최적화 실험 설계와 CDN 도입기'
date: 2024-12-05 15:00:00
category: developments
thumbnail: '/images/thumbnail/image-optimization.jpg'
draft: false
---

BIENGUAL 프로젝트는 유튜브 영상과 CNN 기사 썸네일 등 다양한 이미지 리소스를 다루며 이미지 최적화가 중요한 과제가 되었습니다. 특히, 썸네일을 불러오는 페이지가 많아지면서 성능 저하가 발생할 가능성이 커졌고, 이를 해결하기 위해 실험을 설계하고 결과를 바탕으로 성능 테스트를 진행했습니다.

이 글에서는 **이미지 최적화 실험 설계의 과정과 결과**, 그리고 이를 통해 배운 점을 정리하겠습니다.

---

## 문제 정의

BIENGUAL에서 이미지 성능 문제는 사용자 경험에 직접적인 영향을 미쳤습니다. 특히, 다음과 같은 문제가 있었습니다:

1. **이미지 로딩 지연**:

   - CNN 기사와 유튜브 썸네일을 동시에 불러오는 페이지에서 로딩 시간이 길어졌습니다.
   - 초기 로딩 지연으로 인해 사용자가 페이지를 벗어날 가능성이 높아졌습니다.

2. **적용 방식의 논쟁**:
   - 백엔드 팀은 S3를 통해 이미지를 제공하는 방식만으로 충분하다고 주장했습니다.
   - CDN 도입과 리사이징 효과에 대한 명확한 근거 없이 작업을 시작하기 어려웠습니다.

---

## 해결 방안과 실험 설계

### 실험 목표

**리사이징과 CDN 도입이 실제로 성능에 긍정적인 영향을 미치는지**를 확인하는 것이 목표였습니다. 단순히 "더 나아질 것"이라는 추측에 기반한 결정이 아닌, 데이터를 기반으로 작업을 진행하기 위해 실험 설계를 제안했습니다.

### 사용 도구와 선택 이유

- **Autocannon**: 고성능 HTTP 부하 테스트 도구로, 요청당 지연 시간(Latency)과 초당 요청 수(Requests/sec)를 정확히 측정할 수 있습니다. 다른 도구보다 설정이 간단하고 빠르게 실행 가능해 선택했습니다.
- **Apache Benchmark (AB)**: 간단한 성능 테스트를 위한 도구로, 빠르게 초기 테스트를 진행할 때 유용합니다.
- **K6**: 성능 테스트를 위한 강력한 도구로, 스크립팅 기능을 통해 복잡한 시나리오를 구성할 수 있습니다.
- **JMeter**: 다기능 성능 테스트 도구로, 복잡한 로드 테스트를 설계하는 데 적합합니다.

### CDN과 캐시 설정

CDN(Content Delivery Network)은 콘텐츠를 전 세계에 분산하여 사용자와 가장 가까운 서버에서 이미지를 제공함으로써 로딩 속도를 개선하는 기술입니다.

- **Cache-Control**: 브라우저와 CDN이 데이터를 캐싱하는 방식을 설정합니다.
  - `max-age`: 브라우저가 데이터를 캐싱하는 시간을 지정하며, 이를 통해 서버 요청을 줄이고 로딩 속도를 향상시킵니다
  - `public` 또는 `private`: 캐싱 범위를 결정

### WebP 포맷 소개

**WebP**는 Google에서 개발한 이미지 포맷으로, 기존 JPEG/PNG 대비 파일 크기를 대폭 줄이면서도 품질을 유지하는 장점이 있습니다.

- **장점**: 더 작은 파일 크기로 더 빠른 로딩과 네트워크 비용 절감을 제공합니다.
- **단점**: 모든 브라우저가 지원하지 않을 수 있어 폴백(Fallback) 처리가 필요합니다.

---

## 실험 설계

1. **테스트 대상**:

   - 원본 이미지를 S3에서 제공
   - 원본 이미지를 CDN을 통해 제공
   - 리사이징된 이미지를 S3 + CDN 조합으로 제공

2. **측정 항목**:

   - Latency (ms): 요청에 대한 응답 시간이 얼마나 걸리는지
   - Requests/sec: 초당 처리할 수 있는 요청 수

3. **절차**:
   - 동일한 네트워크 환경에서 각 방식으로 테스트
   - Autocannon으로 1,000회 반복 요청을 실행하여 평균 값을 도출
   - 결과를 비교하여 가장 효율적인 방식을 선택

---

## 실험 결과

테스트 결과는 다음과 같습니다:

| 방식                   | 평균 Latency (ms) | 평균 Requests/sec |
| ---------------------- | ----------------- | ----------------- |
| 원본(CNN, Youtube cdn) | 47                | 368               |
| 리사이징 + S3 사용     | 178               | 56                |
| 리사이징 + S3 + CDN    | 10.6              | 899               |

- **리사이징 + S3만 사용**: 로딩 시간이 원본보다 3배 이상 길고 초당 처리 가능한 요청 수도 1/6로 줄어들었습니다.
  ![리사이징 + S3](/images/resizing-s3.png)

- **리사이징 + S3 + CDN 사용**: 응답 시간이 원본의 1/4로 줄고 2배 이상의 요청을 처리할 수 있습니다.
  ![리사이징 + S3 + CDN](/images/resizing-s3-cdn.png)

---

## 배운 점

### 1. 데이터 기반의 의사결정

처음에는 리사이징과 CDN 도입의 필요성을 백엔드 팀이 확신하지 못했지만, 실험 결과를 통해 효과를 증명할 수 있었습니다. **데이터를 기반으로 의사결정을 내리는 것이 중요하다**는 점을 다시금 깨달았습니다.

### 2. 적합한 도구 선택

Autocannon을 활용하여 정확한 테스트 데이터를 빠르게 수집할 수 있었습니다. 추가로, 다양한 도구를 검토하여 상황에 적합한 선택을 할 수 있다는 점을 배웠습니다.

### 3. 캐시와 CDN의 중요성

CDN의 `Cache-Control` 설정을 활용하여 이미지 응답 시간을 최소화하고, 사용자의 로딩 경험을 대폭 개선할 수 있었습니다. 또한, WebP 포맷 도입으로 네트워크 비용을 줄이는 효과도 확인했습니다.

### 4. 팀 협업과 커뮤니케이션

테스트 결과를 노션에 공유하고, S3만 사용하는 방식의 문제점을 시각적으로 보여줌으로써 팀원들의 동의를 얻는 데 성공했습니다.

---

## 결론

이미지 최적화는 사용자 경험과 서버 성능을 동시에 개선할 수 있는 중요한 작업입니다. 이번 실험을 통해 우리는 단순히 작업을 진행하는 것이 아니라, 데이터를 기반으로 명확한 효과를 검증하며 작업해야 한다는 것을 배웠습니다.
