---
id: 11
title: '[Next Table Order #2] 옵션 설계는 왜 이렇게 복잡할까'
date: 2025-02-11 15:00:00
category: next table order
thumbnail: '/images/thumbnail/옵션썸.webp'
draft: false
---

👦 **"사장님, 지미 존슨 하나 주세요!"**  
👨‍🍳 **"기본으로 드릴까요?"**  
👦 **"아니요! 추가 치즈랑 더블 베이컨이요!"**  
👨‍🍳 **"좋아요~ 주문 도와드릴게요."**

🚀 **(내가 만든 테이블 오더 시스템에서, 드디어 첫 주문이 들어왔다!)**

✅ **메뉴 선택**  
✅ **장바구니 추가**  
✅ **주문 완료**

"됐어! 이제 실전 테스트만 하면 되겠군!" 😆🎉

그. 런. 데.

---

📢 **장바구니를 열어보니…?**

🍔 **"지미 존슨 ×2"** _(엥? 추가 치즈랑 베이컨은?)_

💀 **"잠깐, 옵션이 다 달랐는데 같은 아이템으로 묶여버렸다!"**

😱 **"이러면 안 되잖아? 치즈 추가한 거랑, 그냥 기본이랑 다른 건데?!"**

🙅‍♂️ **"같은 메뉴라도 옵션이 다르면 다른 항목으로 취급해야 한다!"**

🚨 **테이블 오더에서 옵션 처리는 선택이 아니라 필수다.**  
🚨 **이걸 제대로 해결하지 않으면? 고객이 잘못된 주문으로 난리 날 거다!**

---

## **⚠️ 1. 왜 이런 문제가 생겼을까?**

처음 만든 장바구니 로직을 살펴보자.

📌 **기존 장바구니 코드:**

```ts
const addItem = (newItem: CartItem) => {
  setItems((prev) => {
    const existingIndex = prev.findIndex((i) => i.menuId === newItem.menuId);

    if (existingIndex !== -1) {
      // 이미 장바구니에 있으면 수량 증가
      const updatedItems = [...prev];
      updatedItems[existingIndex].quantity += newItem.quantity;
      return updatedItems;
    }

    return [...prev, newItem];
  });
};
```

👆 **이 코드에서는 `menuId`만 비교하고 있었음!**  
➡ **즉, 같은 메뉴라면 옵션이 달라도 하나의 아이템으로 취급됨.**

🚨 **결과적으로, 옵션이 추가된 메뉴도 그냥 같은 걸로 묶여버림.**

---

## **💡 2. 해결책: 옵션을 고유한 값으로 취급하자!**

**옵션까지 고려한 `addItem` 로직을 개선하자.**

✅ **옵션을 포함한 고유 키 생성 (업데이트된 로직)**

```ts
const addItem = (newItem: CartItem) => {
  setItems((prev) => {
    // 옵션이 다르면 다른 아이템으로 취급해야 함
    const newItemKey = `${newItem.menuId}-${newItem.options
      ?.map((opt) => opt.optionId)
      .join('-')}`;

    const existingIndex = prev.findIndex(
      (i) =>
        i.menuId === newItem.menuId &&
        i.options?.map((opt) => opt.optionId).join('-') ===
          newItem.options?.map((opt) => opt.optionId).join('-'),
    );

    if (existingIndex !== -1) {
      // 기존 아이템이 있으면 수량 증가
      const updatedItems = [...prev];
      updatedItems[existingIndex].quantity += newItem.quantity;
      return updatedItems;
    }

    return [...prev, newItem];
  });
};
```

✅ **이제 옵션이 다르면 다른 항목으로 구분된다!**

📌 **고유 키 생성 방법:**

1. `menuId`와 옵션 ID들을 문자열로 조합
2. 같은 `menuId`라도 옵션 조합이 다르면 `newItemKey`가 달라짐
3. 장바구니에서 `newItemKey`로 비교 → **옵션이 다르면 새로운 항목으로 추가!**

---

## **📸 3. UI도 바뀌었다! (이미지 추가)**

💡 **옵션을 반영한 새로운 장바구니 UI**

> (여기에 **옵션이 다르게 표시된 장바구니 UI 스크린샷** 넣기)

✅ **변경 전:** `지미 존슨 ×2` (옵션 무시)  
✅ **변경 후:**

- `지미 존슨 (기본) ×1`
- `지미 존슨 (+치즈) ×1`
- `지미 존슨 (+치즈, +베이컨) ×1`

🎉 **이제 고객이 어떤 옵션을 선택했는지 명확하게 볼 수 있음!**

---

## **🔥 4. "이제 장바구니는 끝났다!" 그런데...**

### **😨 "잠깐, 옵션 가격은?"**

🛑 **옵션 가격이 반영되지 않으면?**  
➡ 고객은 분명 **추가 치즈 500원**을 선택했는데, 결제 금액에는 포함이 안 됨.  
➡ **이건 큰일 난다. 매출이 줄어들 수도 있다!**

✅ **해결책: 옵션 가격도 합산하자!**

```ts
const total = items.reduce((sum, item) => {
  const optionsTotal =
    item.options?.reduce((acc, opt) => acc + opt.price, 0) ?? 0;

  return sum + (item.price + optionsTotal) * item.quantity;
}, 0);
```

📌 **이제 옵션이 추가될 때마다 가격도 자동으로 반영된다!**

---

## **📌 5. 정리: 이걸 해결하고 나니...**

🔥 **"옵션 처리 하나 때문에 이렇게 많은 걸 바꿔야 했다고?"**  
🔥 **"테이블 오더 만들다 보면 별거 아닌 것 같던 게 엄청 중요해진다."**

✅ **옵션을 고려하지 않으면 발생하는 문제**

1. **장바구니에서 옵션이 무시됨 (고객 불만!)**
2. **가격이 제대로 반영되지 않음 (매출 손실!)**
3. **UI에서 옵션이 안 보이면 혼란스러움**

✅ **개선한 점**

- **옵션이 다르면 장바구니에서 개별 항목으로 처리!**
- **옵션 가격도 자동으로 반영!**
- **UI에서 옵션이 명확하게 보이도록 변경!**

🚀 **이제 테이블 오더 시스템이 한층 더 발전했다!**
