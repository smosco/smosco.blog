---
id: 7
title: '[BIENGUAL] 재사용 가능한 반응형 Carousel 만들기'
date: 2024-12-16 15:00:00
category: developments
thumbnail: '/images/thumbnail/carousel.png'
draft: false
---

개발하면서 한 번쯤은 "Carousel" 컴포넌트를 구현해본 경험이 있으실 겁니다. 특히 Swiper, Slick과 같은 강력한 라이브러리를 사용하면, 많은 기능을 빠르게 구현할 수 있습니다. 하지만 저는 프로젝트 특성상 이런 라이브러리를 사용할 수 없었고, 대신 저희만의 요구사항에 맞는 **범용적이고 반응형인 Carousel**을 직접 만들어야 했습니다.

이 글에서는 왜 직접 구현을 선택했는지, 어떤 고민과 시행착오를 겪었는지, 그리고 결과적으로 무엇을 배웠는지를 공유하려 합니다.

---

## 왜 직접 만들었을까?

처음에는 Swiper 같은 라이브러리를 사용하는 것을 고민했습니다. 하지만 몇 가지 이유로 직접 구현을 선택했습니다:

1. **유연한 데이터 처리**  
   Swiper는 이미지 기반 Carousel에 최적화되어 있지만, 저희는 **다양한 데이터 형태를 렌더링**해야 했습니다. 텍스트, 버튼, 그리고 카드와 같은 UI를 자유롭게 렌더링할 수 있어야 했어요.

2. **반응형 설계의 유연성**  
   Swiper도 반응형을 지원하지만, 데스크톱, 태블릿, 모바일에서 각각 다른 항목 수를 보여주는 **세밀한 조정**은 제한적이었습니다.

3. **복잡도를 줄이고 필요에 맞게 최적화**  
   Swiper는 강력한 기능을 제공하지만, 저희가 필요로 하지 않는 기능까지 포함되어 있어 번들 크기와 로딩 시간에 영향을 줄 수 있었습니다.

---

## 구현 과정에서의 고민

### 1. 유연한 설계를 위한 제네릭 활용

Carousel은 다양한 데이터와 UI를 지원해야 했어요. 이를 위해 **`itemComponent`를 제네릭으로 받아** 렌더링할 수 있도록 설계했습니다.

```typescript
interface CarouselProps<T> {
  itemComponent: (props: { data: T; onNext?: () => void }) => JSX.Element;
  items: T[];
  desktopItemsToShow: number;
  tabletItemsToShow: number;
  mobileItemsToShow: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}
```

여기서 `itemComponent`는 데이터를 렌더링하는 컴포넌트로, 데이터와 `onNext` 콜백을 받아 필요한 UI를 자유롭게 생성할 수 있습니다. 이 구조 덕분에 Carousel의 용도가 단순히 이미지 슬라이드에만 국한되지 않고 **텍스트와 버튼 등 다양한 UI로 확장**될 수 있었죠.

---

### 2. 반응형 설계: 화면 크기별 항목 수 조정

Carousel은 화면 크기에 따라 **보여줄 항목 수가 다르게** 설계되었습니다. 이를 위해 `window.innerWidth`를 기반으로 항목 수를 동적으로 계산하는 로직을 추가했어요.

```typescript
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setItemsToShow(desktopItemsToShow);
    } else if (window.innerWidth >= 768) {
      setItemsToShow(tabletItemsToShow);
    } else {
      setItemsToShow(mobileItemsToShow);
    }
  };

  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [desktopItemsToShow, tabletItemsToShow, mobileItemsToShow]);
```

이로 인해 Carousel은 데스크톱, 태블릿, 모바일 화면에서도 **항상 적절한 레이아웃**을 유지할 수 있었습니다.

---

### 3. autoPlay와 이벤트 충돌 방지

autoPlay 기능은 Carousel을 자동으로 넘겨주는 중요한 요소였지만, 터치 이벤트나 수동 조작 시 충돌이 발생할 수 있었습니다. 이를 방지하기 위해 **현재 상태를 기반으로 autoPlay를 조정**했습니다.

```typescript
useEffect(() => {
  if (autoPlay) {
    const intervalId = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, autoPlayInterval);
    return () => clearInterval(intervalId);
  }
}, [autoPlay, autoPlayInterval, nextSlide, isTransitioning]);
```

여기서 핵심은 **`isTransitioning` 상태**를 확인하는 것입니다. 슬라이드가 이동 중일 때는 autoPlay가 동작하지 않도록 설정해 **사용자 조작과 autoPlay의 충돌을 방지**했어요.

---

### 4. 터치 이벤트: 모바일 UX 개선

모바일 환경에서 터치 스와이프가 자연스럽게 작동해야 했습니다. 이를 위해 터치 이벤트(`onTouchStart`, `onTouchMove`, `onTouchEnd`)를 활용했습니다.

```typescript
const handleTouchMove = (event: React.TouchEvent) => {
  if (touchStartX.current === null) return;

  const touchEndX = event.touches[0].clientX;
  const diff = touchStartX.current - touchEndX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    touchStartX.current = null;
  }
};
```

터치 시작과 끝을 감지해 슬라이드를 넘기는 로직을 구현했으며, **불필요한 이벤트 중복 처리**를 방지하도록 최적화했습니다.

## 결론과 배운 점

이번 Carousel 구현을 통해, 단순히 작동하는 컴포넌트를 만드는 것을 넘어 **다양한 요구사항을 충족하는 범용적이고 유연한 컴포넌트 설계**의 중요성을 배웠습니다. 특히, 반응형 설계와 모바일 UX를 고려하면서 작은 디테일들이 사용자 경험에 얼마나 큰 영향을 미치는지 깨달았습니다.
