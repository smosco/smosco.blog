---
id: 8
title: '[회고] 좋은 오픈소스란?'
date: 2024-12-22 13:00:00
category: reflections
thumbnail: '/images/thumbnail/good-open-source.jpg'
draft: false
---

BIENGUAL 프로젝트에서 처음으로 오픈소스를 설계하고 개발하면서 사용자와 개발자의 관점에서 많은 것을 배우게 되었습니다. 특히 react-player-script-prompter 라이브러리를 실제 프로젝트에 적용하며 발견한 문제들과 그로 인한 고민들은 "좋은 오픈소스란 무엇인가?"라는 질문에 대해 깊이 생각해보는 계기가 되었습니다. 이 글에서는 경험을 바탕으로 한 반성과 함께, 더 나은 설계를 위해 고려해야 할 원칙을 정리해보았습니다.

---

## react-player-plugin-prompter에서 발견된 문제점

react-player-plugin-prompter는 자막을 동적으로 처리하고 사용자 경험을 개선하기 위해 설계된 라이브러리였습니다. 그러나 실제로 적용하면서 몇 가지 문제점이 드러났습니다:

### 1. Props의 과도한 의존

- `FocusButton`, `PrevButton`, `NextButton` 등 너무 많은 Props를 요구하면서 사용자에게 부담을 주었습니다.
- Props가 많다 보니 모든 설정을 사용자가 직접 지정해야 하는 상황이 발생했습니다.

### 2. 콜백 함수의 남발

- `onClickScript`, `onSelectWord`, `seekTo`와 같은 여러 콜백 함수를 사용자가 반드시 정의해야만 라이브러리가 제대로 동작하도록 설계되어 있었습니다.
- 이러한 설계는 사용자 코드의 복잡성을 증가시키고, 직관성을 떨어뜨렸습니다.

### 3. 내부 상태 관리의 부재

- `playerRef`, `currentTime`과 같은 데이터를 Props로 전달하다 보니, 데이터 흐름이 복잡해지고 유지보수가 어려워졌습니다.
- Context API를 활용해 공통 데이터를 관리할 수 있었지만, 이러한 방식을 고려하지 못했습니다.

### 4. 업데이트의 어려움

- Breaking Changes가 빈번히 발생해 사용자가 라이브러리를 업데이트할 때마다 코드 수정이 필요했습니다.
- 사용자에게 변경 사항을 명확히 전달하거나, 마이그레이션 가이드를 제공하지 않았습니다.

---

## 발표에서의 질문: "안정적이고 명확한 설계란?"

프로젝트 발표 후, "안정적이고 명확한 설계란 무엇인가?"라는 질문을 받았을 때, Props와 콜백의 사용을 줄여야 한다는 점을 이야기했지만, 구체적인 해결책은 제시하지 못했습니다. 이 질문은 제가 오픈소스 설계에서 무엇이 부족했는지 되돌아보는 계기가 되었습니다.

---

## 좋은 오픈소스를 위한 설계 원칙

### 1. Props와 기본값 설계

Props는 최소화하되, 자주 사용되는 값에는 기본값을 제공해 사용자 부담을 줄여야 합니다. 예를 들어, `FocusButton`이나 `NextButton`은 기본 동작을 내장하고, 필요 시 커스터마이즈할 수 있도록 설계할 수 있습니다.

```typescript
const PrevButton = ({
  onClick,
}: {
  onClick: () => void;
}) => (
  <button onClick={onClick} className="custom-button">
    <ChevronLeft color="#a78bfa" />
  </button>
);
```

### 2. 콜백 함수 단순화

모든 콜백 함수가 필수적으로 정의되어야 한다면, 사용자가 라이브러리를 적용하기 어려워집니다. 따라서, 콜백은 선택적으로 제공하고, 기본 동작을 내장해야 합니다.

```typescript
function ReactScriptPlayer<T extends string>({
  onClickScript = () => {}, // 기본 동작 제공
  onSelectWord = () => {},
  ...props
}: ReactScriptPlayerProps<T>) {
  const handleClickScript = (script: Script<T>, index: number) => {
    onClickScript(script, index);
  };

  const handleSelectWord = (word: string, script: Script<T>, index: number) => {
    onSelectWord(word, script, index);
  };

  // 나머지 컴포넌트 로직
}
```

### 3. Context API 도입

Props로 전달되는 공통 데이터를 Context API로 관리하면, 데이터 흐름이 단순해지고 유지보수성이 향상됩니다. 예를 들어, `playerRef`와 `currentTime`은 Context를 활용해 관리할 수 있습니다.

```typescript
const PlayerContext = React.createContext({
  currentTime: 0,
  seekTo: (timeInSeconds: number) => {},
});

function App() {
  return (
    <PlayerContext.Provider
      value={{
        currentTime,
        seekTo,
      }}
    >
      {/* 자식 컴포넌트 */}
    </PlayerContext.Provider>
  );
}
```

---

## react-player-plugin-prompter의 개선 방향

1. **Props 최소화**:

   - 기본값을 제공하거나 필수값만 요구하는 방식으로 Props를 단순화.

2. **콜백 단순화**:

   - 선택적인 콜백을 제공하고, 기본 동작을 내장하여 사용자 부담 감소.

3. **Context API 활용**:

   - 공통 상태와 함수를 Context로 관리해 Props 체인을 줄이고, 데이터 흐름을 단순화.

4. **명확한 버전 관리**:
   - Breaking Changes를 최소화하고, 마이그레이션 가이드를 제공해 사용자 경험을 개선.

---

## 결론: 좋은 오픈소스를 향한 고민

react-player-plugin-prompter의 설계와 적용 경험은 저에게 오픈소스 설계의 어려움과 책임감을 일깨워 주었습니다. 좋은 오픈소스는 단순히 기능을 제공하는 것을 넘어, 사용자와 개발자 모두가 쉽게 이해하고 활용할 수 있는 경험을 제공합니다. 앞으로도 이러한 원칙을 기반으로, 더 나은 오픈소스를 설계하기 위해 지속적으로 고민하고 개선해 나가겠습니다.
