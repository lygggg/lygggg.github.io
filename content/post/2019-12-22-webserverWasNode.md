---
title: 'Web Serve와 Was에대해 알아보자.'
date: 2019-12-22
tag: ['Posts']
---

# Web Server와 WAS

<img src='../assets/images/webserver-vs-was1.png' width='900px' height='500px'/>
## Web Server

### Web Server의 개념

소프트웨어와 하드웨어로 구분된다.

1. 하드웨어 : Web서버가 설치되어 있는 컴퓨터
2. 소프트웨어 : 웹 브라우저 클라이언트로 부터 HTTP 요청을 받아 정적인 컨텐츠(html,css,jpeg)를 제공하는 컴퓨터 프로그램

### Web Server의 기능

- HTTP 프로토콜을 기반으로 하여 클라이언트(웹 브라우저)의 요청을 서비스 하는 기능을 담당한다.

1. 기능 (1)
   - 정적인 컨텐츠 제공
   - WAS를 거치지 않고 바로 자원을 제공
2. 기능 (2)
   - 동적인 컨텐츠 제공을 위한 요청 전달
   - 클라이언트의 요청을 WAS로 보내고, WAS가 처리한 결과를 클라이언트에게 전달한다.

- Web Server의 종류
  - 아파치 서버
  - IIS
  - Google Web Server
  - Lighttpd.
  - LightSpeed.
  - Mongoose.
  - nginx.

## WAS(Web Application Server)

### WAS의 개념

1. DB조회나 다양한 로직 처리를 요구하는 동적인 컨텐츠를 제공하기 위해 만들어진 어플리케이션 서버이다.

2. HTTP를 통해 컴퓨터나 장치에 애플리케이션을 수행해주는 미들웨어(소프트웨어 엔진)이다.

3. 웹서버 + 웹 컨테이너(JSP, Servlet을 실행시킬 수 있는 소프트웨어) 즉, WAS는 JSP,PHP,ASP등 이와같은 언어들을 사용해 동적인 페이지를 생성할수있는 서버다.

### WAS의 기능

- 분산 트랜잭션, 보안, 메시징, 쓰레드 처리 등의 기능을 분산처리하는 분산환경에서 사용됨

- 프로그램 실행 환경과 데이터베이스 접속 기능을 제공함.

- 업무를 처리하는 비즈니스 로직을 수행함.

- WAS의 종류
  - Tomcat
  - JEUS
  - IBM Webspere등

### Web Server와 WAS의 차이?

<img src='../assets/images/webserver-vs-was2.png' width='900px' height='500px'/>

### 목적부터가 다르다

Web Server와 WAS를 구별 짓는 것은 데이터를 동적으로 처리하느냐 정적으로 처리하느냐에 따라 다르다, 웹서버는 정적인 데이터를 처리하는 서버이다. 물론 WAS는 동적 데이터와 정적 데이터를 처리할 수 있으나, DB와 연결되어 데이터를 주고 받거나 프로그램으로 데이터를 조작이 필요한 경우에 쓰이고, WAS로 정적 데이터를 처리하게 되면, 동적 컨텐츠의 처리가 지연 될 것이고 이로 인한 페이지 노출 시간이 길어지게 될 것이다. 이처럼 자원 이용의 효율성 및 장애 극복, 배포 및 유지보수의 편의성 을 위해 Web Server와 WAS를 분리한다.
