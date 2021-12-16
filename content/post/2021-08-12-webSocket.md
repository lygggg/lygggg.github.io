---
title: 'Web Socket이란?'
date: 2021-08-12
tag: ['Posts']
---

### Web Socket이란?

웹소켓은 HTML5 표준 기술로, 사용자의 브라우저와 서버 사이의 동적인 양방향 연결 채널을 구성합니다. Websocket API를 통해 서버로 메세지를 보내고, 요청 없이 응답을 받아오는것이 가능하며, 웹소켓은 별도의 포트를 사용하지 않고 HTTP와 같은 80번 포트를 사용하고 있는데, 이때문에 클라이언트인 웹 브라우저뿐만 아니라 웹 서버도 기능을 지원하고 있어야 한다.

<img src='/assets/images/websocket-polling.gif' width='450px' height='250px'/>

### Socket.io의 등장

먼저 나온 웹소켓은 HTML5의 기술이기 때문에 오래된 버전의 웹브라우저는 웹소켓을 지원하지 않습니다. 예를들어 구버전 익스플로어 사용자들은 웹소켓으로 작성된 웹페이지를 보지못합니다. 이 문제를 해결하기 위해서 나온 기술이 Socket.io 입니다. 웹페이지가 열리는 브라우저가 웹소켓을 지원하면 웹소켓 방식으로, 지원하지 않으면 http를 이용해 실시간 통신 흉내를 내는것입니다.

Socket.io는 node.js기반으로 만들어진 기술로, 거의 모든 웹 브라우저와 모바일 장치를 지원하는 실시간 웹 어플리케이션 지원 라이브러리입니다. 또한 Socket.io는 자바스크립트를 이용하여 브라우저 종류에 상관없이 실시간 웹을 구현할 수있도록 하는 기술입니다.

#### 참고

[한눈에 끝내는 nodejs](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174379/web-socket%EC%9D%B4%EB%9E%80)