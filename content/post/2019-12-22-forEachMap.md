---
title: 'forEach와 map의 차이점?'
date: 2019-12-22
tag: ['Posts']
---

# 목적

우리가 javascript에서 흔히 사용하는 메소드들중 가장 대표적인 두가지 forEach와 map의 차이점을 알아보자.

## forEach

```tsx
const array = [1, 2, 3, 4, 5]
const test = []

array.forEach(num => {
  test.push(num * 3)
})

console.log(test) // [3, 6, 9, 12, 15]
```

## map

```tsx
const array = [1, 2, 3, 4, 5]
const test = array.map(num => num * 3)

console.log(test) // [3, 6, 9, 12, 15]
```

느낌이 오시나요?

가장 큰 차이점은
`forEach는 배열의 요소마다 한번씩 정해진 함수를 실행한다. 반면 map은 배열의 요소에 정해진 함수의 결과를 새로운 배열에 반환한다.`
