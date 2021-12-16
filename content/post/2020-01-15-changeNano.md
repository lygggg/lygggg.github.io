---
title: 'Ubuntu Linux환경에서 VSCODE 기본 텍스트편집기 변경 방법'
date: 2020-01-15
tag: ['Posts']
---

## 목적

리눅스 우분투 환경에서 기본 텍스트 편집기를 변경하고 싶을 때가 있다.. 나같은 경우는 vim을 주로 사용하기 때문에 초기설정 nano를 vim으로 변경하고 싶어서 알아냈는데 나와 같은 문제를 겪고 있는 사람들에게 이 글을 공유하고 싶어서 포스팅하게 되었다.

터미널에서 아래 명령어를 입력해주세요

```
sudo update-alternatives --config editor
```

아래와같은 결과가 나오면 정상입니다.

```
There are 5 alternatives which provide `editor’.
Selection Alternative
———————————————–
1 /usr/bin/vim
2 /bin/ed
*+ 3 /bin/nano
4 /usr/bin/vim.basic
5 /usr/bin/vim.tiny
Press enter to keep the default[*], or type selection number:
```

자신이 원하는 편집기를 번호로 선택후 엔터 누르시면 변경됩니다.
