---
title: '자바스크립트에서 병목현상'
date: 2022-07-06
tag: ['JavaScript']
---

## 병목현상?

비동기 처리를 겪으면 필수로 겪는 문제인 병목현상에 대해서 알아보려고 합니다. 나무위키에서는 병목현상에 대해서 아래와 같이 설명하고있습니다.

<Blockquote>
차로에서 출구가 대폭 줄어들어 교통 체증이 생기는 현상을 병목현상이라고 표현합니다. 
 </Blockquote>

필자도 제대로 공부를 하기전에는 비동기 코드를 작성하면서 아무런 문제가 없다고 생각했습니다.이번 기회에 과거를 반성하며 글로 정리해보려고합니다.

## 비동기 처리

자바스크립트에서는 ES6 이전에 Promise가 존재하지 않을 떄 비동기 함수의 콜백 내부에서 다음 비동기 함수를 호출하는 방법으로 비동기 처리가 필요한 부분들을 해결했다.하지만 이런 방법은 가독성도 떨어지고 개발자를 괴롭게 만드는 요소중 하나였다.

추후에 이런 문제를 해결하기 위해 Promise, async await가 나왔고, 많은 사람들이 비동기 처리를 위해서 async await를 주로 사용하고있다. 그럼 async await는 문제가 없는걸까? 아래 코드를 보자

## 무분별한 Async Await로 인한 문제점

### Promise 함수 선언

```tsx
const promise1 = () => new Promise(res => setTimeout(res, 1000))
const promise2 = () => new Promise(res => setTimeout(res, 2000))
const promise3 = () => new Promise(res => setTimeout(res, 3000))
```

시간을 측정하기 위해 1000, 2000, 3000씩 딜레이를 넣은 Promise 함수를 3개 함수를 선언했습니다.

### 시간 측정

```tsx
console.time('function promise1')
console.time('function promise2')
console.time('function promise3')

await promise1()

console.timeEnd('function promise1')

await promise2()

console.timeEnd('function promise2')

await promise3()

console.timeEnd('function promise3')
```

각각의 함수를 `console.time` 을 사용해서 종료되는 시간을 측정했습니다.
해당 메서드가 궁금하시면 아래를 참고하면 될 것 같습니다.
[console.time()](https://developer.mozilla.org/ko/docs/Web/API/console/time)
[console.end()](https://developer.mozilla.org/ko/docs/Web/API/console/timeEnd)

### 결과

![image](https://user-images.githubusercontent.com/52567149/180214886-aca9a382-d783-4a86-a0ad-c7c106fcd3b8.png)

함수가 종료되는 시간이 증가해서 모든 마지막 함수가 종료되기까지 걸리는 시간이 6초인 것을 확인할 수 있습니다. asnyc await는 비동기 처리를 하기 위한 문법으로 순차적으로 결과가 출력된후에 아래 코드를 실행합니다. 비동기 처리에는 이런 현상 떄문에 병목현상이 존재합니다.

![image](https://user-images.githubusercontent.com/52567149/180200131-7c80419e-3c2c-40fd-8435-3f3cf524836e.png)

## Promise.all

함수가 아무런 연관성이 없을떄는 Promise.all을 사용함으로써 위와같은 문제를 해결할 수 있습니다.

```tsx
console.time('promiseAll')
await Promise.all([promise1(), promise2(), promise3()])
console.timeEnd('promiseAll')
```

### 결과

![image](https://user-images.githubusercontent.com/52567149/180216695-e79f40b4-caf8-48bb-aeb8-91e2bb339fc4.png)

`promise.all`을 사용하여 함수의 종료시간이 줄어든 것을 확인할 수 있습니다. 해당 메소드의 비동기 통신은 병렬로 작동합니다. 이러한 이유 떄문에 가장 시간이 오래걸리는 것을 기준으로 모든 응답이 처리됩니다. 이런 상황일 떄 해당 메소드의 사용을 고려해볼 수 있습니다.
하지만 promise.all은 한가지 문제점이 존재합니다.

### 주의할 점

응답 처리중에 문제가 생겨서 Promise 객체중 하나라도 reject가 발생하면 응답 데이터 전체를 받아올 수 없게 된다. 아무런 결과를 받아오지 못하면 어느 응답이 잘못된건지 알수가 없다. 또한 결국 상황에 맞게 사용하는 것이 중요한 것 같습니다. 예를들면 안전성이 높은 응답에 사용하는 것이 옳바른 것 같습니다.

## Promise.allSettled

Promise.allSettled의 사용 방법과 병렬로 비동기 처리를 하는 부분은 Promise.all과 동일합니다.

```tsx
console.time('promiseAll')
await Promise.allSettled([promise1(), promise2(), promise3()])
console.timeEnd('promiseAll')
```

하지만 결과는 다르다. Promise.all 같은 경우는 하나라도 reject가 있다면 전부 reject를 반환하지만 Promise.allSettled는 fulfiled 상태라면 value를 rejected 상태라면 reason 속성을 가진 객체를 반환합니다. 그리고 특정 브라우저(IE)에서는 지원하지 않는 메서드 이므로 때문에 상황에 맞게 사용해야합니다.

### 결과 예시

```tsx
 [
   {status: "fulfilled", value: 33},
   {status: "fulfilled", value: 66},
   {status: "fulfilled", value: 99},
   {status: "rejected",  reason: Error: an error}
 ]
```

하지만 함수가 의존성을 갖는 경우는 해당 방법들만으로는 부족합니다.

## 함수끼리 의존성이 있는 경우

```tsx
const promise1 = () => new Promise(res => setTimeout(res, 1000))
const promise2 = () => new Promise(res => setTimeout(res, 2000))
const promise3 = () => new Promise(res => setTimeout(res, 3000))
const promise4 = fun => new Promise(res => setTimeout(res, fun))
```
