---
title: '자바스크립트 정규표현식에 대해서 알아보자.'
date: 2020-01-19
tag: ['Posts']
---

## 목적

자바스크립트에서 사용하는 정규식 표현에 대해서 포스팅 하고자 한다. 평소에 공부할려고 생각하고 있었는데 오늘 간단하게 정규표현식을 어떻게 사용하는지 알아보고자 한다.

### 1. 정규표현식

정규표현식은 문자열에서 특정 내용을 찾거나 대체 또는 발췌하는데 사용한다. 예를 들어 회원가입 화면에서 사용자로 부터 입력 받는 전화번호가 유효한지 체크할 필요가 있다. 이때 정규표현식을 사용하면 간단히 처리할 수 있다.

```
const tel = '0101234567팔';

const myRegExp = /^[0-9]+$/;

console.log(myRegExp.test(tel)); // false
```

이와같이 반복문과 조건문을 사용한 복잡한 코드도 정규표현식을 이용하면 매우 간단하게 표현 가능하다. 하지만 정규표현식은 주석이나 공백을 허용하지 않고 여러가지 기호를 혼합하여 사용하기 때문에 가독성이 좋지 못하다.

정규 표현식은 리터럴 표기법으로 생성할 수 있다. 정규 표현식 리터럴은 아래와 같이 표현한다.

<img src='../assets/images/regular_expression.png' width='700px' height='400px'/>

정규표현식을 사용하는 자바스크립트 메소드는RegExp.prototype.exec, RegExp.prototype.test, String.prototype.match, String.prototype.replace, String.prototype.search, String.prototype.split 등이 있다고 한다.

```
const targetStr = 'This is a pen.';
const regexr = /is/ig;

// RegExp 객체의 메소드
console.log(regexr.exec(targetStr)); // ['is']
console.log(regexr.test(targetStr)); // true

// String 객체의 메소드
console.log(targetStr.match(regexr)); // ['is', 'is']
console.log(targetStr.replace(regexr, 'IS')); // ThIs IS a pen.

// String.prototypes.search는 검색된 문자열의 첫번째 인덱스를 반환한다.
console.log(targetStr.search(regexr)); // 2 <- index
console.log(targetStr.split(regexr)); // ['Th', '', ' a pen. ']
```

### 1.2 플래그

플래그는 아래와 같은 종류가 있다.

1. i
   - Ignore Case 대소문자를 구별하지 않고 검색한다.
2. g
   - Global 문자열 내의 모든 패턴을 검색한다.
3. m
   - Multi Line 문자열의 행이 바뀌더라도 검색을 계속한다.

플래그는 옵션이다. 그러므로 선택적으로 사용한다. 플래그를 사용하지 않은 경우 문자열 내의 검색 매칭 대상이 1개 이상이더라도 첫번째 매칭한 대상만을 검색하고 종료한다. 꼭 필요한 기능이다.

```
const targetStr = 'Is this all there is?';

let regexr = /is/;

console.log(targetStr.match(regexr)); // [ 'is', index: 5, input:'Is this all there is?' ] // 5번째 인덱스에 있는 is만 검색하고 종료한다.

// 문자열 is를 대소문자를 구별하지 않고 대상 문자열 끝까지 검색한다.
regexr = /is/ig;

console.log(targetStr.match(regexr)); // [ 'Is' 'is' 'is' ]
console.log(targetStr.match(regexr).length); // 3
```

### 1.2 패턴

패턴에는 검색하고 싶은 문자열을 지정한다. 이때 문자열의 따옴표는 생략한다. 따옴표를 포함하면 따옴표까지도 검색한다. 또한 패턴은 특별한 의미를 가지는 메타문자(Metacharacter) 또는 기호로 표현할 수 있다. 몇가지 패턴 표현 방법을 소개한다.

```
const targetStr = 'AA BB Aa Bb';

const regexr = /../;
```

`.` 은 임의의 문자 한개를 의미한다. 문자의 내용은 무엇이든지 상관없다. 위 예제의 경우 `.` 를 3개 연속하여 패턴을 생성하였으므로 3자리 문자를 추출한다. `표현식 안에 띄워쓰기를 하면 조건이 바뀐다. 필자가 실수로 넣었다가 뻘짓했다.`

```
console.log(targetStr.match(regexr)); //['AA ', index: 0, input: 'AA BB Aa Bb'];
```

위 대로작성하면 추출을 반복하지 않는다. 문자열 모두를 검색하려면 g플러그인을 사용해야한다.

```
const targetStr = 'AA BB Aa Bb';

const regexr = /../g;

console.log(targetStr.match(regexr)); // ['AA ', 'BB ', 'Aa ']
```

모든 문자를 선택하고 싶으면 어떻게 할것인가? 밑에 구문을 보지말고 생각을 해봐라

```
const targetStr = 'AA BB Aa Bb';

const regexr = /./g;

console.log(targetStr.match(regexr)); // ["A", "A", " ", "B", "B", " ", "A", "a", " ", "B", "b"]
```

띄워쓰기를 포함한 모든 문자열을 배열에 뽑아낸다.

특정 문자열을 대소문자 구별없이 전부 뽑아 내보자

```
const targetStr = 'AA BB Aa Bb';

const regexr = /a/ig

console.log(targetStr.match(regexr)); // [ 'A', 'A', 'A', 'a']
```

위에서 설명했듯이 i 플래그를 사용하면 된다.

앞선 패턴을 최소 한번 반복하기 위해서는 앞선 패턴 뒤에 +를 붙인다. 아래 예제의 경우, 앞선 패턴은 A이므로 A+는 A만으로 이루어진 문자열 ('A', 'AA', 'AAA' ...)을 의미한다.

```
const targetStr = 'AA AAA BB Aa Bb';
// 'A'가 한번이상 반복되는 문자열 ('A', 'AA', 'AAA', ...) 을 반복 검색
const regexr = /A+/g;

console.log(targetStr.match(regexr)); // ['AA', 'AAA', 'A']
```

|를 사용하면 or의 의미를 가지게 된다.

```
const targetStr = 'AA BB Aa Bb';

const regexr = /A|B/ig;

console.log(targetStr.match(regexr)); // ["A", "A", "B", "B", "A", "a", "B", "b"]
```

분해되지 않은 단어 레벨로 추축하기 위해서는 +를 같이 사용하면 된다.

```
const targetStr = 'AA AAA BB Aa Bb';

const regexr = /A+|B+/ig;

console.log(targetStr.match(regexr)); // ["AA", "BB", "Aa", "Bb"]
```

위 예제는 패턴을 or로 한번 이상 반복하는 것인데 간단하게 표현하면 아래와 같다. []내의 문자는 or로 동작한다. 그 뒤에 +를 사용하여 앞선 패턴을 한번 이상 반복하게 한다.

```
const targetStr = 'AA BB Aa Bb';

// 'A' 또는 'B'가 한번 이상 반복되는 문자열을 반복 검색
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regexr = /[AB]+/g;

console.log(targetStr.match(regexr)); // ['AA', 'BB', 'A', 'B']
```

범위를 지정하려면 []내에 -를 사용한다. 아래의 경우 대문자 알파벳을 추출한다.

```
const targetStr = 'AA BB ZZ Aa Bb';

const regexr = /[A-Z]+/ig;

console.log(targetStr.match(regexr)); // ["AA", "BB", "ZZ", "Aa", "Bb"]
```

대소문자를 구별하지 않고 알파벳을 추출하려면 아래와 같이 사용한다.

```
const targetStr = 'AA BB Aa Bb';
// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한번 이상 반복되는 문자열을 반복 검색

const regexr = /[A-Za-z]+/g;
//아래와 동일하다. 범위를 다르게 설정할 수 있다.
// const regexr = /[A-Z]+/gi;

console.log(targetStr.match(regexr)); // ["AA", "BB", "Aa", "Bb"]
```

숫자를 추출하는 방법이다.

```
const targetStr = 'AA BB Aa Bb 24,000';

const regexr = /[0-9]+/g;

console.log(targetStr.match(regexr)); // ['24', '000']
```

위에서 콤마가 거슬린다. 콤마 때문에 결과가 ,로 분리되므로 패턴에 포함시켜야한다.

```
const targetStr = 'AA BB Aa Bb 24,000';

const regexr = /[0-9,]+/g;

console.log(targetStr.match(regexr)); // ['24,000']
```

이것을 간단히 표현하면 아래와 같다. \d는 숫자를 의미한다. \D는 \d와 반대로 동작한다.

```
const targetStr = 'AA BB Aa Bb 24,000';

const regexr = /[\d,]+/g;

console.log(targetStr.match(regexr)); // ['24,000']

regexr = /[\D,]+/g;

console.log(targetStr.match(regexr)); // ['AA BB Aa Bb ', ',']
```

\w는 알파벳과 숫자를 의미한다. \W는 \w와 반대로 동작한다.

```
const targetStr = 'AA BB Aa Bb 24,000';

let regexr = /[\w,]+/g;

console.log(targetStr.match(regexr)); // ["AA", "BB", "Aa", "Bb", "24,000"]

regexr = /[\W,]+/g;

console.log(targetStr.match(regexr)); // [" ", " ", " ", " ", ","]
```

참 쉽죠? ㅎㅎ 여기까지 직접 쳐보지 않고 눈으로만 확인을 했다면 반성하셔야 합니다.

### 자주 사용하는 정규 표현식

특정 단어로 시작하는지 검사한다.

```
const url = 'http://example.com';

// 'http'로 시작하는지 검사
// ^ : 문자열의 처음을 의미한다.
const regexr = /^http/;

console.log(regexr.test(url)); // true
```

특정 단어로 끝나는지 검사한다.

```
const fileName = 'index.html';

// 'html'로 끝나는지 검사
// $ : 문자열의 끝을 의미한다.
const regexr = /html$/;

console.log(regexr.test(fileName)); // true
```

숫자인지 검사한다.

```
const targetStr = '12345';

// 모두 숫자인지 검사
// [^]: 부정 (not)을 의미한다. 예를 들어 [^a-z]는 알파벳 소문자로 시작하지 않는 모든 문자를 의미한다.
// [] 바깥의 ^는 문자열의 처음을 의미한다.

const regexr = /^\d+$/; // ^ 처음부터 $ 끝까지 숫자인지

console.log(regexr.test(targetStr)); // true
```

하나 이상의 공백으로 시작하는지 검사한다.

```
const targetStr = ' Hi! ';

// 1개 이상의 공백으로 시작하는지 검사
// \s : 여러 가지 공백 문자 (스페이스, 탭 등) => [\t\r\n\v\f]
const regexr = /^[\s]+/;

console.log(regexr.test(targetStr)); // true
```

아이디로 사용 가능한지 검사한다. (영문자, 숫자만 허용, 4~10자리)

```
const id = 'abc123';

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~10 자리인지 검사
// {4,10}: 4 ~ 10자리

const regexr = /^[A-Za-z0-9]{4,10}$/;

console.log(regexr.test(id)); // true
```

메일 주소 형식에 맞는지 검사한다. 이부분은 복잡하니 꼭 직접 쳐보자.

(): 괄호로 묶인 패턴은 매칭된다음, 그 부분을 기억한다.
?:0 또는 1개의 문자 매칭
\*: 0회 이상 반복
.: 정확히 1개 문자 매칭

```
const email = 'ungmo2@gmail.com';

const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-z-A-Z]{2,3}$/;

console.log(regexr.test(email)); // true
```

핸드폰 번호 형식에 맞는지 검사한다.

```
const cellphone = '010-1234-5678'

const regexr = /^\d{3}-\d{3,4}-\d{4}$/;

console.log(regexr.test(cellphone)); // true
```

특수 문자 포함 여부를 검사한다.

```
const targetStr = 'abc#123';

let regexr = /[^A-za-z0-9]/gi; // [^]는 부정을 의미한다.

console.log(regexr.test(targetStr)); // true

// 아래 방식도 동작한다. 이 방식의 장점은 특수 문자를 선택적으로 검사할 수 있다.
regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; // 존나 어렵다 그냥 알고만있자....

console.log(regexr.test(targetStr)); // true

// 특수문자를 제거한다.
console.log(targetStr.replace(regexr, '')); // abc123
```

## Javascript Regular Expression

### 2.1 RegExp Constructor

자바스크립트는 정규표현식을 위해 RegExp 객체를 지원한다. RegExp 객체를 생성하기 위해서는 리터럴 방식과 RegExp 생성자 함수를 사용할 수 있다. 일반적인 방법은 리터럴 방식이다.

```
new RegExp(pattern[, flags])
```

- pattern 정규표현식의 텍스트
- flags 정규표현식의 플래그 (g, i, m, u, y)

```
// 정규식 리터럴
/ab+c/i;

new RegExp('ab+c', 'i');

new RegExp(/ab+c/, 'i');

new RegExp(/ab+c/i); // ES6
```

### RegExp Method

```
const target = 'Is this all there is?';
const regExp = /is/;

const res = regExp.exec(target);

console.log(res); // ['is'] // index 5
```

exec 메소드는 g 플래그를 지정하여도 첫번째 매칭 결과만을 반환한다.

```
const target = 'Is this all there is?';
const regExp = /is/g;

const res = regExp.exec(target);

console.log(res); // ['is'] index 5
```

문자열을 검색하여 매칭 결과를 반환한다. 반환값은 ture 또는 false이다.

```
const target = 'Is this all there is?';
const regExp = /is/;

const res = regExp.test(target);
console.log(res);
```

오늘은 정규표현식을 어떻게 사용하는지를 정리해보았다. 잘만 쓴다면 정말 효율적이고 최소한의 시간으로 최대의 결과물을 낼 수 있는 방법이라고 생각한다. 꼭 눈으로만 보지 말고 직접 쳐보고 결과를 확인하는걸 추천한다.

#### 참고

[Poiemaweb](https://poiemaweb.com/js-regexp)
