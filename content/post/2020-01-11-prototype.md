---
title: '[JavaScript] 프로토타입(ProtoType) 이해하기 '
date: 2020-01-11
tag: ['Posts']
---

## 목적

우리가 쓰는 자바스크립트는 프로토타입(ProtoType) 기반 언어 라고 불립니다. 프로토타입이 거의 자바스크립트 그 자체이고, 자바스크립트를 사용할 때 빠질 수 없는 것이 프로토타입입니다. 그만큼 프로토타입은 복잡하고 이해하기 어려운 개념입니다. 하지만 자바스크립트를 사용하는 사람이라면 꼭 알아야 하는 개념이기에 공부해보도록 합시다.

## ProtoType 는 ? Class 는 ?

여기서 Class는 객체지향에서 빠질 수 없는 개념입니다. 하지만 자바스크립트는 객제지향 언어지만 Class라는 개념이 없었고, 프로토타입(Prototype)이 존재했습니다. 그래서 보통 프로토타입을 기반으로 상속을 흉내 내서 구현했습니다. 최근 ECMA6부터 Class 문법이 추가되었습니다. 하지만 추가되었을 뿐이지 자바스크립트가 Class 기반으로 바뀌었다는 소리는 아닙니다.

### 자바스크립트의 객체 생성 방법

자바스크립트의 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어 있습니다. 그리고 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 합니다. 이러한 부모 객체를 Prototype(프로토타입) 객체 또는 줄여서 Prototype(프로토타입)이라 합니다. 프로토타입 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용합니다.

```
const student = {
    name: 'Lee',
    score: 90
};

// student에는 hasOwnProperty 메소드가 없지만 아래 구문은 동작합니다.
console.log(student.hasOwnProperty('name')); // true
```

<img src='/assets/images/printout_student_obj_from_chrome.png' width='700px' height='400px'/>

ECMAScript spec에서는 자바스크립트의 모든 객체는 [[Prototype]]이라는 인터널 슬롯(internal slot)를 가진다. [[Prototype]]의 값은 null 또는 객체이며 상속을 구현하는데 사용된다. [[Prototype]] 객체의 데이터 프로퍼티는 get 액세스를 위해 상속되어 자식 객체의 프로퍼티처럼 사용할 수 있다. 하지만 set 액세스는 허용되지 않는다. 라고 되어있다.

[[Prototype]]의 값은 Prototype(프로토타입) 객체이며 **proto** accessor property로 접근할 수 있다. **proto** 프로퍼티에 접근하면 내부적으로 Object.getPrototypeOf가 호출되어 프로토타입 객체를 반환한다.

student 객체는 **proto** 프로퍼티로 자신의 부모 객체(프로토타입 객체)인 Object.prototype을 가리키고 있다.

```
var student = {
  name: 'Lee',
  score: 90
}
console.log(student.__proto__ === Object.prototype); // true
```

객체를 생성할 때 프로토타입은 결정됩니다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있습니다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미합니다. 이러한 특징을 활용하여 객체의 상속을 구현할 수 있습니다.

## ProtoType를 어디에 사용하나요?

프로토타입은 간단하게 함수와 new를 통해 클래스를 비슷하게 따라 할 수 있습니다.

```
function Person() {
    this.eyes = 2;
    this.nose = 1;
}

const kim = new Person();
const park = new Person();

console.log(kim.eyes); // 2
console.loh(kim.nose); // 1

console.log(park.eyes); // 2
console.log(park.nose); // 1
```

kim과 park은 eyes와 nose를 공통적으로 가지고 있는데 메모리에는 eyes와 nose가 두 개씩 총 4개 할당됩니다. 객체를 100개 만들면 200개의 변수가 메모리에 할당됩니다.
바로 이런 문제를 해결할 수 있는 게 프로토타입 입니다.

```
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

const kim = new Person();
const park = new Person();

console.log(kim.eyes);
```

Person.protoype이라는 빈 Object가 어딘가에 존재하고, Person 함수로부터 생성된 객체(kim, park)들은 어딘가에 존재하는 Object에 들어있는 값을 모두 갖다 쓸 수 있습니다. 즉 eyes와 nose를 어딘가에 있는 빈 공간에 넣어놓고 kim과 park이 공유해서 사용하는 것이죠.

## [[Prototype]] vs prototype 프로퍼티

모든 객체는 자신의 프로토타입 객체를 가리키는 [[Prototype]] 인터널 슬롯(internal slot)을 가지며 상속을 위해 사용된다.

함수도 객체이므로 [[Prototype]] 인터널 슬롯을 갖는다. 그런데 함수 객체는 일반 객체와는 달리 prototype 프로퍼티도 소유하게 된다.

주의해야 할 것은 prototype 프로퍼티는 프로토타입 객체를 가리키는 [[Prototype]] 인터널 슬롯은 다르다는 것이다. prototype 프로퍼티와 [[Prototype]]은 모두 프로토타입 객체를 가리키지만 관점의 차이가 있다.

```
function Person(name) {
    this.name = name;
}

const foo = new Person('Lee');

console.dir(Person); // prototype 프로퍼티가 있다.
console.dir(foo); // prototype 프로퍼티가 없다.
```

- [[Prototype]]
  - 함수를 포함한 모든 객체가 가지고 있는 인터널 슬롯이다.
  - 객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며 함수 객체의 경우 Function.prototype를 가리킨다.

```
console.log(Person.__proto__ === Function.prototype);
```

- prototype 프로퍼티
  - 함수 객체만 가지고 있는 프로퍼티이다.
  - 함수 객체가 생성자로 사용될 때 이 함수를 통해 생성될 객체의 부모 역할을 하는 객체(프로토타입 객체)를 가리킨다.

```
console.log(Person.prototype === foo.__proto__);
```

## constructor 프로퍼티

프로토타입 객체는 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 객체의 입장에서 자신을 생성한 객체를 가리킨다.

예를 들어 Person() 생성자 함수에 의해 생성된 객체를 foo라 하자. 이 foo 객체를 생성한 객체는 Person() 생성자 함수이다. 이때 foo 객체 입장에서 자신을 생성한 객체는 Person() 생성자 함수이며, foo 객체의 프로토타입 객체는 Person.prototype이다. 따라서 프로토타입 객체 Person.prototype의 constructor 프로퍼티는 Person() 생성자 함수를 가리킨다.

```
function Person(name) {
    this.name = name;
}

const foo = new Person('Lee');

// Person() 생성자 함수에 의해 생성된 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log (Person.prototype.constructor === Person);

// foo 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(foo.constructor === Person);

// Person() 생성자 함수를 생성한 객체는 Function() 생성자 함수이다.
console.log(Person.constructor === Function);
```

## Prototype chain

자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색한다. 이것을 프로토타입 체인이라 한다.

```
const student = {
    name: 'Lee',
    score: 90
}

// Object.prototype.hasOwnProperty()
console.log(student.hasOwnProperty('name'));
```

student 객체는 hasOwnProperty 메소드를 가지고 있지 않으므로 에러가 발생하여야 하나 정상적으로 결과가 출력되었다. 이는 student 객체의 [[Prototype]]이 가리키는 링크를 따라가서 student 객체의 부모 역할을 하는 프로토타입 객체(Object.prototype)의 메소드 hasOwnProperty를 호출하였기 때문에 가능한 것이다.

```
const student = {
    name: 'Lee',
    score: 90
}
console.dir(student);
console.log(student.hasOwnProperty('name')); // true
console.log(student.__proto__ === Object.prototype); //true
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true

```

정리

객체에 존재하지 않는 프로퍼티를 접근하려고 시도하면 해당 객체의 내부 [[Prototype]]를 따라가면서 수색 장소를 결정한다. 모든 일반 객체의 최상위 프로토타입 연쇄는 내장 Object.prototype 이고 이 지점에서도 찾지 못하면 수색은 종료된다.

두 객체를 서로 연결 짓는 가장 일반적인 방법은 함수 호출 시 new 키워드를 앞에 붙이는 것이고, new 키워드는 "일반 함수 호출 + '객체' 생성"이라는 잔업을 더 부과하는 지시 자이다. const f = new Person()를 실행하면 Person 함수가 실행이 되고, 객체가 생성되어 변수 f에 할당된다.

```
f // object
Person // function
```

- constructor는 내가 선언한 생성자 함수를(Person) 가리킨다. new 키워드와 함께 함수를 호출할 경우 constructor 함수를 실행하고 부수효과로 객체가 생성된다.
- prototype은 생성자 함수에 정의한 모든 객체가 공유할 원형이다.
- proto는 [[Prototype]] 링크이다. 생성자 함수에 정의해두었던 prototype을 참조한다.

참고

- [PoiemaWeb](https://poiemaweb.com/js-prototype)

- [프로토타입 이해하기](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
