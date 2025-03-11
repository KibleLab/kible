# Kible

QR코드를 스캔하여 모바일로 주문하는 시스템 (일반음식점용)

<br />

**POS (v1)** [`@release/pos-v1`](https://github.com/KibleLab/kible/tree/@release/pos-v1) <br />
<img src="https://img.shields.io/badge/React-181717?style=flat-square&logo=React" />
<img src="https://img.shields.io/badge/React Router-181717?style=flat-square&logo=React Router" />
<img src="https://img.shields.io/badge/Redux-181717?style=flat-square&logo=Redux" />
<img src="https://img.shields.io/badge/ReduxSaga-181717?style=flat-square&logo=Redux-Saga" />
<img src="https://img.shields.io/badge/MUI-181717?style=flat-square&logo=MUI" />
<img src="https://img.shields.io/badge/Axios-181717?style=flat-square&logo=Axios" />
<img src="https://img.shields.io/badge/Socket.IO Client-181717?style=flat-square&logo=Socket.io" />
<img src="https://img.shields.io/badge/TypeScript-181717?style=flat-square&logo=TypeScript" />
<img src="https://img.shields.io/badge/npm-181717?style=flat-square&logo=npm" />

**Mobile (v1)** [`@release/mobile-v1`](https://github.com/KibleLab/kible/tree/@release/mobile-v1) <br />
<img src="https://img.shields.io/badge/React-181717?style=flat-square&logo=React" />
<img src="https://img.shields.io/badge/React Router-181717?style=flat-square&logo=React Router" />
<img src="https://img.shields.io/badge/Redux-181717?style=flat-square&logo=Redux" />
<img src="https://img.shields.io/badge/ReduxSaga-181717?style=flat-square&logo=Redux-Saga" />
<img src="https://img.shields.io/badge/MUI-181717?style=flat-square&logo=MUI" />
<img src="https://img.shields.io/badge/Axios-181717?style=flat-square&logo=Axios" />
<img src="https://img.shields.io/badge/Socket.IO Client-181717?style=flat-square&logo=Socket.io" />
<img src="https://img.shields.io/badge/TypeScript-181717?style=flat-square&logo=TypeScript" />
<img src="https://img.shields.io/badge/npm-181717?style=flat-square&logo=npm" />

**Back-end (v1)** [`@release/be-v1`](https://github.com/KibleLab/kible/tree/@release/be-v1) <br />
<img src="https://img.shields.io/badge/Express-181717?style=flat-square&logo=Express" />
<img src="https://img.shields.io/badge/TypeORM-181717?style=flat-square&logo=TypeORM" />
<img src="https://img.shields.io/badge/Socket.IO-181717?style=flat-square&logo=Socket.io" />
<img src="https://img.shields.io/badge/MariaDB-181717?style=flat-square&logo=MariaDB" />
<img src="https://img.shields.io/badge/TypeScript-181717?style=flat-square&logo=TypeScript" />
<img src="https://img.shields.io/badge/npm-181717?style=flat-square&logo=npm" />

<br />

## Overview

### 프로젝트명

Kible - QR코드를 스캔하여 모바일로 주문하는 시스템 (일반음식점용)

### 제작기간

2021.01 ~ 2021.11 (v1)

### 팀원 및 역할

<table border="1">
  <tr>
    <td align="center"><a href="https://github.com/RegistryHJ"><img height="100px" width="100px" src="https://avatars.githubusercontent.com/u/55695897?v=4" alt="이현준 GitHub"/></a></td>
    <td align="left">이현준 (팀장)</br>UI/UX설계, FullStack, 문서화</td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Vulpes94"><img height="100px" width="100px" src="https://avatars.githubusercontent.com/u/74402423?v=4" alt="김준기 GitHub"/></a></td>
    <td align="left">김준기 (팀원)</br>ERD설계, FullStack, 자료조사</td>
  </tr>
</table>

## Background

### 현황

- 대다수의 패스트푸드점이나 카페 같은 곳에서는 COVID-19를 기점으로 Kiosk를 확충함.
- 일반음식점은 테이블에서 태블릿을 활용하여 주문하는 시스템이 보급되고 있음.

### 기존 시스템의 문제점

- 테이블에서 태블릿을 활용하여 주문하는 시스템의 경우, 점주의 입장에서 관리 및 비용적인 부분에 많은 투자를 필요로 함.
- 네이버 주문과 같은 서비스의 경우 이 프로젝트와 맥락은 같으나, 식사를 하면서 추가 주문을 하고, 최종적으로 결제를 하게 되는 일반음식점의 환경과 맞지 않음.

### 목표

- QR코드를 스캔하여 모바일로 주문할 수 있는 Mobile 환경 제작
- 주문을 실시간으로 수신하고, 관리할 수 있는 POS 시스템 제작
- Mobile과 POS 간의 양방향 실시간 통신 및 데이터 관리를 위한 Back-end 제작

<br/>

## Timeline (2021-v1)

### 선행 연구 (1~2월)

- React Library
- Express Framework
- Object Relational Mapping

### 프로젝트 설계 (3~4월)

- UI/UX 설계
- ERD 설계
- Back-end Architecture 설계
- Front-end Architecture 설계

### 프로젝트 구현 (5~8월)

- 목업 데이터 구현
- Front-end(POS, Mobile) 구현
- Back-end 구현
- FE, BE 간 HTTP 통신 구현
- Logging 구현

### 실시간 통신 구현 및 배포 (9~10월)

- 실시간 통신 (WebSocket, Socket.IO) 선행 연구
- FE, BE 간 Socket.IO 통신 구현
- AWS EC2에 NGINX로 Reverse Proxy 및 SSL 적용하여 배포
- DataBase를 Docker를 사용하여 AWS EC2에 배포

### 유지보수 및 관리 (11월~)

- QA 및 버그 수정
- 의존성 업데이트 관리
- 배포 서버 보안 관리

## <br />

Copyright © 2021 KibleLab
