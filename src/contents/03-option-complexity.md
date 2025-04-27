---
id: 11
title: '옵션별 장바구니 구분 로직 개선'
date: 2025-02-11 15:00:00
category: next table order
thumbnail: '/images/thumbnail/옵션썸.webp'
draft: false
---

## 개요

테이블 오더 시스템에서는 고객이 메뉴를 주문할 때, 옵션까지 포함해 정확히 장바구니를 관리해야 합니다.
이 문서에서는 기존 로직의 문제를 분석하고, 옵션 차이를 구분하는 방법과 그 개선 결과를 소개합니다.

## 문제 상황

테이블 오더 시스템에서 고객이 메뉴를 주문할 때, **같은 메뉴라도 옵션이 다르면 별개의 항목으로 장바구니에 추가되어야** 한다.  
그러나 기존 장바구니 로직에서는 menuId만 비교하여, **옵션이 달라도 같은 아이템으로 묶이는 문제**가 발생했다.

**문제가 발생한 예시**:

- 고객 A: "지미 존슨 (기본)"
- 고객 B: "지미 존슨 (+치즈 추가)"

**기존 로직 결과**:

- 장바구니에는 "지미 존슨 ×2"로 표시됨 → 옵션 차이를 반영하지 못함

이 문제를 해결하지 않으면, 잘못된 주문 접수와 결제 오류가 발생할 수 있다.

---

## 원인 분석

기존 `addItem` 함수는 **menuId**만을 기준으로 기존 항목 존재 여부를 판단했다.  
따라서 옵션이 추가된 경우도 단순히 **같은 메뉴**로 인식해 수량만 증가시켰다.

**기존 코드 (문제 발생 부분)**:

```typescript
const existingIndex = prev.findIndex((i) => i.menuId === newItem.menuId);
```

➡ 옵션 정보(`options`)를 고려하지 않고 비교했기 때문에 발생한 문제다.

---

## 해결 방법

### 1. 옵션까지 포함한 고유 키 생성

**menuId + 옵션 ID 조합**을 이용해, 같은 메뉴라도 옵션이 다르면 별개의 항목으로 취급하도록 수정했다.

**업데이트된 비교 로직**:

```typescript
const addItem = (newItem: CartItem) => {
  setItems((prev) => {
    const existingIndex = prev.findIndex(
      (i) =>
        i.menuId === newItem.menuId &&
        i.options?.map((opt) => opt.optionId).join('-') ===
          newItem.options?.map((opt) => opt.optionId).join('-'),
    );

    if (existingIndex !== -1) {
      const updatedItems = [...prev];
      updatedItems[existingIndex].quantity += newItem.quantity;
      return updatedItems;
    }

    return [...prev, newItem];
  });
};
```

- **menuId**와 **optionId 조합**을 문자열로 만들어 비교
- 옵션 순서가 중요하지 않은 경우, optionId 배열을 정렬해서 비교하는 것도 고려할 수 있다.

### 2. 옵션 가격 합산

옵션 추가에 따른 가격 변화도 반영했다.  
옵션별 가격을 모두 합산한 뒤, 기본 메뉴 가격과 함께 계산한다.

**총액 계산 로직**:

```typescript
const total = items.reduce((sum, item) => {
  const optionsTotal =
    item.options?.reduce((acc, opt) => acc + opt.price, 0) ?? 0;
  return sum + (item.price + optionsTotal) * item.quantity;
}, 0);
```

---

## 개선된 결과

- **장바구니에서 옵션이 다른 항목은 별도로 표시**된다.
- **옵션 가격도 정확히 합산**되어 결제 금액에 반영된다.
- **고객이 선택한 옵션을 UI에서 명확히 확인**할 수 있어 혼란이 줄었다.

**변경 전**:

- "지미 존슨 ×2" (옵션 구분 불가)

**변경 후**:

- "지미 존슨 (기본) ×1"
- "지미 존슨 (+치즈) ×1"
- "지미 존슨 (+치즈, +베이컨) ×1"

---

## 추가 고려 사항

- **옵션 순서**: 고객이 선택한 옵션 순서와 관계없이 동일하게 처리할 필요가 있다면, 옵션 ID를 정렬해서 키를 만들어야 한다.
- **옵션 없는 메뉴 처리**: 옵션이 없는 경우에도 일관된 방식으로 비교해야 한다.
- **성능 최적화**: 장바구니 항목 수가 많아질 경우, 비교 성능을 고려해 해시맵(Key-Value) 구조로 리팩터링할 수도 있다.

---

# 정리

옵션 처리는 테이블 오더 시스템에서 선택이 아니라 필수다.  
옵션까지 고려하지 않으면 고객 불만, 결제 오류, 매출 손실 등 치명적인 문제가 발생할 수 있다.  
이번 개선을 통해 **주문 정확도와 고객 만족도를 크게 높일 수 있었다**.
