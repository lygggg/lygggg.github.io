---
title: 'async await를 남발하면 생기는 병목현상'
date: 2022-07-24
tag: ['JavaScript']
---

## 병목현상?

비동기 처리를 겪으면 필수로 겪는 문제인 병목현상에 대해서 알아보려고 합니다. 나무위키에서는 병목현상에 대해서 아래와 같이 설명하고 있습니다.

<br/>

<Blockquote>
현실에서는 차로에 출구가 대폭 줄어들어 교통 체증이 생기는 현상을 병목현상이라고 표현합니다. 
 </Blockquote>

 <br/>

필자도 제대로 공부를 하기 전에는 비동기 코드를 작성하면서 아무런 문제가 없다고 생각했습니다. 이번 기회에 과거를 반성하며 글로 정리해 보려고 합니다.

<br/>

## 비동기 처리

<br/>

자바스크립트에서는 ES6 이전에 Promise가 존재하지 않을 때 비동기 함수의 콜백 내부에서 다음 비동기 함수를 호출하는 방법으로 비동기 처리가 필요한 부분들을 해결했습니다. 하지만 이런 방법은 가독성도 떨어지고 개발자를 괴롭게 만드는 요소 중 하나였습니다.

추후에 이런 문제를 해결하기 위해 Promise, async await가 나왔고, 많은 사람들이 비동기 처리를 위해서 async await를 주로 사용하고 있습니다. 그럼 아래에서 설명하겠습니다.

<br/>

## 무분별한 Async Await로 인한 문제점

<br/>

### Promise 함수 선언

```tsx
const promise1 = () => new Promise(res => setTimeout(res, 1000))
const promise2 = () => new Promise(res => setTimeout(res, 2000))
const promise3 = () => new Promise(res => setTimeout(res, 3000))
```

<br/>

시간을 측정하기 위해 1000, 2000, 3000씩 딜레이를 넣은 Promise 함수를 3개 함수를 선언했습니다.

<br/>

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

<br/>

각각의 함수를 `console.time` 을 사용해서 종료되는 시간을 측정했습니다.
해당 메서드가 궁금하시면 아래를 참고하면 될 것 같습니다.

[console.time()](https://developer.mozilla.org/ko/docs/Web/API/console/time)

[console.tumeEnd()](https://developer.mozilla.org/ko/docs/Web/API/console/timeEnd)

<br/>

### 결과

![image](https://user-images.githubusercontent.com/52567149/180214886-aca9a382-d783-4a86-a0ad-c7c106fcd3b8.png)

<br/>

함수가 종료되는 시간이 증가해서 모든 마지막 함수가 종료되기까지 걸리는 시간이 6초인 것을 확인할 수 있습니다. asnyc await는 비동기 처리를 하기 위한 문법으로 순차적으로 결과가 출력된 후에 아래 코드를 실행합니다. 즉 동시에 실행해도 무방한 작업들을 순차적으로 실행하면서 불필요한 대기시간이 발생하게 됩니다.

<br/>

![image](https://user-images.githubusercontent.com/52567149/180200131-7c80419e-3c2c-40fd-8435-3f3cf524836e.png)

## Promise.all

함수가 아무런 연관성이 없을 때는 Promise.all을 사용함으로써 위와 같은 문제를 해결할 수 있습니다.

```tsx
console.time('promiseAll')
await Promise.all([promise1(), promise2(), promise3()])
console.timeEnd('promiseAll')
```

### 결과

![image](https://user-images.githubusercontent.com/52567149/180216695-e79f40b4-caf8-48bb-aeb8-91e2bb339fc4.png)

<br/>

`promise.all`을 사용하면 함수의 종료시간이 줄어든 것을 확인할 수 있습니다. 해당 메서드의 비동기 통신은 병렬로 작동합니다. 이러한 이유 때문에 가장 시간이 오래 걸리는 것을 기준으로 모든 응답이 처리됩니다. 이런 상황일 때 해당 메서드의 사용을 고려해 볼 수 있습니다.
하지만 promise.all은 한 가지 문제점이 존재합니다.

<br/>

### 주의할 점

응답 처리 중에 문제가 생겨서 Promise 객체 중 하나라도 reject가 발생하면 응답 데이터 전체를 받아올 수 없습니다. 그렇기 때문에 아무런 결과를 받아오지 못하면 어느 응답이 잘못된 건지 알 수가 없습니다.

결국 상황에 맞게 사용하는 것이 중요한 것 같습니다. 예를 들면 안전성이 높은 요청이거나, 의존성이 없는 요청에 사용하는 것이 맞다고 생각합니다.

<br/>

## Promise.allSettled

Promise.allSettled의 사용 방법과 병렬로 비동기 처리를 하는 부분은 Promise.all과 동일합니다.

<br/>

```tsx
console.time('promiseAll')
await Promise.allSettled([promise1(), promise2(), promise3()])
console.timeEnd('promiseAll')
```

<br/>

하지만 결과는 다릅니다. Promise.all 같은 경우는 하나라도 reject가 있다면 전부 reject를 반환하지만 Promise.allSettled는 fulfiled 상태라면 value를 rejected 상태라면 reason 속성을 가진 객체를 반환합니다.

<br/>

### 결과 예시

```tsx
 [
   {status: "fulfilled", value: 33},
   {status: "fulfilled", value: 66},
   {status: "fulfilled", value: 99},
   {status: "rejected",  reason: Error: an error}
 ]
```

<br/>

또한 Promise.all 같은 경우 특정 브라우저(IE)에서는 지원하지 않으므로 때문에 상황에 맞게 사용해야 합니다.

<br/>

### 병렬로 처리하는 또 다른 방법

<br/>

async await를 사용할 때 여러 비동기 함수를 병렬로 처리하는 또 하나의 방법이 있습니다.

함수에 의존성이 없다면 프로미스를 먼저 생성하고, await 키워드를 나중에 사용하면 병렬로 실행되는 코드가 됩니다.

<br/>

```tsx
const runA = promise1()
const runB = promise2()

const data1 = await runA
const data2 = await runB
```

<br/>

runA, runB 두 개의 프로미스가 생성되고, 각자의 비동기 코드가 실행됩니다. 그 후에 두 프로미스가 생성된 후 기다리기 때문에 두 개의 비동기 함수가 병렬로 처리됩니다.

어느 방법을 사용하든 병렬처리를 한다는 부분에서 결과는 같지만, 필자가 생각하기에는 promise.all을 사용하는 것이 심플하고 가독성이 좋은 것 같습니다.

<br/>

## 함수끼리 의존성이 있는 경우

<br/>

위에서 선언했던 함수를 수정하겠습니다.

```tsx
const promise1 = () => new Promise(res => setTimeout(res, 2000))
const promise2 = () => new Promise(res => setTimeout(res, 1000, 1500))
const promise3 = n => new Promise(res => setTimeout(res, n))
```

<br/>

이번에는 setTimeout 시간, param 만큼 딜레이 되는 promise3 함수를 추가하고 promise2 함수는 1500을 리턴하도록 수정했습니다.

<br/>

```tsx
console.time('function main')
const runA = promise1()
const runB = promise2()

await runA
const time = await runB

await promise3(time)
console.timeEnd('function main')
```

<br/>

runA와 runB는 동시에 실행되고, runB의 결과를 받아서 promise3 함수의 인자로 넣은 후 실행합니다. 결과를 확인해 보겠습니다.

<br/>

![image](https://user-images.githubusercontent.com/52567149/180603386-4e51d640-0bf2-4135-bf2e-1239ec4bc127.png)

<br/>

runA와 runB가 동시에 실행되지만 await runA가 종료되는 시간 2초를 기다렸다가 promise3를 실행하기 때문에 3초가 걸리는 것을 볼 수 있습니다.

<br/>

```tsx
console.time('function main')
const runA = promise1()
const runB = promise2()
const time = await runB
const runC = promise3(time)
await runC
await runA
console.timeEnd('function main')
```

<br/>

위에 수정된 코드처럼 runB, promise3 함수를 먼저 처리하고, runA를 호출하면 시간을 단축시킬 수 있습니다.

<br/>

![image](https://user-images.githubusercontent.com/52567149/180605272-58b7acad-b131-43f7-9192-54672093b2a6.png)

<br/>

## 결론

<br/>

async await를 사용함으로써 가져오는 코드의 가독성, 편리함에 눈이 멀어 정작 중요한 문제점에 대해서는 생각해 보지 못했다.

async await는 코드를 순차적으로 실행하기 때문에 동시에 실행해도 무방한 작업들이 불필요한 대기시간이 발생하게 된다. 이것을 병목현상이라고 한다. 이 문제를 해결하기 위해서는 Promise.all, Promise.allSettled 같은 방법과 코드의 위치를 변경하는 것만으로도 실행 시간을 줄일 수 있다.

프로그램의 성능에 대해서 계속해서 고민해야 한다고 생각한다. 어찌 보면 1초라는 게 적은 시간처럼 보일 수는 있지만 하나하나씩 모이다 보면 결국 큰 차이로 변하기 때문이다.

<br/>

### Reference

- https://medium.com/@HoseungJang/javascript%EC%97%90%EC%84%9C-async-await%EC%9D%98-%EB%B3%91%EB%AA%A9-%EB%AC%B8%EC%A0%9C-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0-60d54795c4fa

- 기초부터 완성까지 프런트엔드

틀린 내용이 있다면 거침없는 피드백 부탁드립니다
