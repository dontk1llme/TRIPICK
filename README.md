# TRIPICK
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/logo.png" width="100%" height="300px"/>


## 📖목차
- [README](#readme)
	- [🗓프로젝트 진행 기간](#-프로젝트-진행-기간)
	- [📑주제](#-주제)
	- [🎉프로젝트 기획](#-프로젝트-기획)
	- [🔑 주요 기능](#-주요-기능)
    - [📜 빅데이터](#-빅데이터)
	- [🖥 서비스 화면](#-서비스-화면)
	- [🏗️ 아키텍쳐](#-아키텍쳐)
	- [🛠 기술 스택](#-기술-스택)
	- [📂 파일 구조](#-파일-구조)
	- [📝 설계 문서](#-설계-문서)
	    - [ERD](#erd)
	    - [API](#api)
        - [FIGMA](#FIGMA)
	- [💻 구동 방법](#-구동-방법)
	- [💾 결과물](#-결과물)
	    - [UCC](#UCC)
	- [❤ 팀원 소개](#-팀원-소개)
		- [프론트](#프론트)
		- [백](#백)
<!-- <small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small> -->


---
## 🗓 프로젝트 진행 기간
`2023.08.14 ~ 2023.10.06 (약 7주)`

---
## 📑 주제
빅데이터(날씨, 환율, 물가지수, 범죄율)을 기반으로 여행지 추천 서비스 

---
## 🎉 프로젝트 기획
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/004.png" alt="기획"/>
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/005.png" alt="기획"/>
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/006.png" alt="기획"/>

---
## 🔑 주요 기능
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/007.png" alt="기획"/>

## 📜 빅데이터
<details>
<summary>빅데이터</summary>
<div markdown="1">
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/009.png" alt="기획"/>
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/010.png" alt="기획"/>
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/011.png" alt="기획"/>
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/012.png" alt="기획"/>
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/013.png" alt="기획"/>
</div>
</details>

---
## 🖥 서비스 화면

<details>
<summary>메인 페이지</summary>
<div markdown="1">       
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%9E%9C%EB%94%A9%ED%8E%98%EC%9D%B4%EC%A7%80.JPG" alt="랜딩"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%9E%9C%EB%94%A9+%EC%B6%94%EC%B2%9C1.JPG" alt="랜딩"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%9E%9C%EB%94%A9+%EC%B6%94%EC%B2%9C2.JPG" alt="랜딩"/>
</div>
</details>

<details>
<summary>날짜 선택 페이지</summary>
<div markdown="1">       
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%82%A0%EC%A7%9C+%EC%84%A0%ED%83%9D+%ED%8E%98%EC%9D%B4%EC%A7%80.JPG" alt="날짜선택"/>
</div>
</details>

<details>
<summary>여행 추천 페이지</summary>
<div markdown="1">       
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EC%A2%85%ED%95%A9%EC%B6%94%EC%B2%9C.JPG" alt="종합추천"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%82%AE%EC%9D%80%ED%99%98%EC%9C%A8.JPG" alt="낮은환율"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EC%A2%8B%EC%9D%80+%EB%82%A0%EC%94%A8.JPG" alt="좋은날씨"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EC%95%88%EC%A0%84%EC%A0%9C%EC%9D%BC.JPG" alt="안전제일"/>    
</div>
</details>


<details>
<summary>여행지 비교 페이지</summary>
<div markdown="1">       
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EC%97%AC%ED%96%89%EC%A7%80%EB%B9%84%EA%B5%90.JPG" alt="날짜선택"/>
</div>
</details>

<details>
<summary>마이페이지</summary>
<div markdown="1">       
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.JPG" alt="매칭페이지"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%802.JPG" alt="매칭페이지"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%803.JPG" alt="매칭페이지"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%804.JPG" alt="매칭페이지"/>
</div>
</details>

<details>
<summary>기록페이지</summary>
<div markdown="1">
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EA%B8%B0%EB%A1%9D%ED%8E%98%EC%9D%B4%EC%A7%80.JPG" alt="기록페이지"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EA%B8%B0%EB%A1%9D+%EC%84%A0%ED%83%9D.JPG" alt="기록페이지"/>
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EA%B8%B0%EB%A1%9D+%EC%83%81%EC%84%B8+%EC%A1%B0%ED%9A%8C.JPG" alt="기록페이지"/>
</div>
</details>

---
## 🏗️ 아키텍쳐

<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/008.png" alt="아키텍쳐"/>

---
## 🛠 기술 스택
### 백엔드
- 웹

    **Language |** java 11

    **Framework |** Spring Boot 2.7

    **Build Tool |** gradle 8.2.1

    **Database |** mariaDB 10.11.0

- 추천

    **Language |** python==3.11.4

    **Database |** mongodb== 7.0.1, pymongo==4.5.0

    **Data Processing |** scikit-learn==1.3.0, bayesian-optimization==1.4.3

    **Framework |** fastapi==0.103.1

<br></br>
### 프론트엔드

**Language |** Javascript

**Framework |** react 18.2.0
    
**Engine |** Node.js 18.16.1
    
**Library |** zustand 4.4.1, css-loader 6.8.1, styled-components 6.0.4

<br></br>
### 인프라

**Infra |** docker 24.0.6, docker-compose 2.21.0, nginx 1.18.0 (Ubuntu)

**CI/CD |** jenkins 2.414.1

**SSL certification |** certbot 0.40.0

</details>

---
## 📂 파일 구조

<details  style="margin-left: 5px;">
<summary><b>프론트 프로젝트 구조</b></summary>
<div>

```
📦 src
│  ├─ 📂 api
│  ├─ 📂asset
│  │  └─ 📂images
│  ├─ 📂components
│  │  ├─ 📂common
│  │  ├─ 📂diary
│  │  ├─ 📜index.js
│  │  ├─ 📂landing
│  │  ├─ 📂layout
│  │  ├─ 📂mypage
│  │  ├─ 📂preview
│  │  └─ 📂recommend
│  ├─ 📂hooks
│  ├─ 📂pages
│  │  ├─ 📂cart
│  │  ├─ 📂common
│  │  ├─ 📂detail
│  │  ├─ 📂diary
│  │  ├─ 📜index.js
│  │  ├─ 📂landing
│  │  ├─ 📂mbti
│  │  ├─ 📂mypage
│  │  └─ 📂recommend
│  ├─ 📂style
│  └─ 📂utils
│     ├─ index.js
│     ├─ utilsApi.js
│     └─ utilsConstant.js
│  ├─ 📜App.js
└─ └─ 📜index.js
```

</div>
</details>
<br>
<details  style="margin-left: 5px;">
<summary><b>백엔드 프로젝트 구조</b></summary>
<div>

```
📦tripick
 └─ 📂mz
   ├─ 📂common
   │  ├─ 📂config
   │  ├─ 📂entity
   │  ├─ 📂error
   │  ├─ 📂jwt
   │  └─ 📂response
   ├─ 📂member
   │  ├─ 📂controller
   │  ├─ 📂dto
   │  │  ├─ 📂request
   │  │  └─ 📂response
   │  ├─ 📂entity
   │  ├─ 📂mapper
   │  ├─ 📂repository
   │  └─ 📂service
   │     └─ 📂implement
   ├─ 📂record
   │  ├─ 📂controller
   │  ├─ 📂dto
   │  │  ├─ 📂request
   │  │  └─ 📂response
   │  ├─ 📂entity
   │  ├─ 📂mapper
   │  ├─ 📂repository
   │  └─ 📂service
   │     └─ 📂implement
   ├─ 📂trip
   │  ├─ 📂controller
   │  ├─ 📂dto
   │  │  ├─ 📂request
   │  │  └─ 📂response
   │  ├─ 📂entity
   │  ├─ 📂mapper
   │  ├─ 📂repository
   │  └─ 📂service
   │     └─ 📂implement
   └─ 📜TripickApplication.java
```

```
📦FASTAPI
└─📂app
  ├─📜dp.py
  ├─📜dummy.py
  ├─📜main.py
  └─📜recommendation.py
📂Dockerfile
📜requirements.txt
```
</div>
</details>


---
## 📝 설계 문서

### ERD
<details>
<summary>ERD</summary>
<div markdown="1">       
    <img src="https://hackmd.io/_uploads/SJKl2Mj32.png" alt="ERD 페이지"/>
</div>
</details>


### API
<details>
<summary>API 문서</summary>
<div markdown="1">       
    <img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/api.JPG" alt="전체 문서 페이지"/>
</div>
</details>


### FIGMA
<details>
<summary>FIGMA</summary>

https://www.figma.com/file/n5esjnbJmX1crDIYgQNJS9/Travel?type=design&node-id=103-445&mode=design&t=PsNE2mWlgEcwdAqN-0


</details> 
## 💻 구동 방법

1. Clone Project

```
git clone https://lab.ssafy.com/s09-bigdata-recom-sub2/S09P22A305.git

```

2. change path to /front_temp/frontend

```
npm i

```
3. create .env file

```
# .env.dev
REACT_APP_GA_ENV_TYPE=DEV
REACT_APP_NODE_ENV=DEV
REACT_APP_BASE_URL=http://localhost:3000 
REACT_APP_KAKAO_REST_API_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_GOOGLE_REST_API_KEY={YOUR_GOOGLE_REST_API_KEY}

# .env.prd
REACT_APP_GA_ENV_TYPE=PRD
REACT_APP_NODE_ENV=PRD
REACT_APP_KAKAO_REST_API_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_GOOGLE_REST_API_KEY={YOUR_GOOGLE_REST_API_KEY}
```
4.frontend start

```
npm start
```
5. change path to /server/spring/src/main/resources

```
create env.yml

MARIADB_DATABASE_URL: {YOUR_MARIADB_DATABASE_URL}
DATABASE_USERNAME: {YOUR_MARIADB_DATABASE_USERNAME}
DATABASE_PASSWORD: {YOUR_MARIADB_DATABASE_PASSWORD}
MONGODB_DATABASE_URL: {YOUR_MONGODB_DATABASE_URL}
MONGODB_DATABASE_NAME: {YOUR_MONGODB_DATABASE_NAME}
MONGODB_PORT: {YOUR_MONGODB_DATABASE_PORT}
S3_BUCKET: {YOUR_S3_BUCKET}
S3_ACCESS_KEY: {YOUR_S3_ACCESS_KEY}
S3_SECRET_KEY: {YOUR_S3_SECRET_KEY}
JWT_SECRET_KEY: {YOUR_JWT_SECRET_KEY}
KAKAO_CLIENT_ID: {YOUR_KAKAO_CLIENT_ID}
KAKAO_CLIENT_SECRET: {YOUR_KAKAO_CLIENT_SECRET}
KAKAO_REDIRECT_URI: {YOUR_KAKAO_REDIRECT_URI}
GOOGLE_CLIENT_ID: {YOUR_GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET: {YOUR_GOOGLE_CLIENT_SECRET}
GOOGLE_REDIRECT_URI: {YOUR_GOOGLE_REDIRECT_URI}\

```
6. Run TripickApplicaiton

7. change path to /server/fastAPI

```
pip install -r requirements.txt

change path to /server/fastAPI/app

uvicorn main:app --reload
```

---
## 💾 결과물
    
### UCC
https://youtu.be/Z7xU5HUj5xw

---
## ❤ 팀원 소개
<img src="https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/003.png" alt="기획"/>

### Frontend
|![](https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%ED%98%84%EC%88%98.png)|![](https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EC%98%88%EC%8A%AC.png)|
|:---------:|:--------:|
| [권현수](https://github.com/Runsoo)| [이예슬](https://github.com/dontk1llme)|


### Backend

|![](https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EC%84%B1%EC%A4%80.png)|![](https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%EC%98%A4%EC%9C%A0%EC%A0%95.png)| ![](https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%ED%95%B4%EC%A4%80.JPG)| ![](https://tripickbucket.s3.ap-northeast-2.amazonaws.com/README/%ED%97%88.png)|
|:---------:|:--------:|:---------:|:--------:|
| [박성준](https://github.com/tjdwnsmm)| [오유정](https://github.com/yj0111) | [이해준](https://github.com/haegod)| [허성백](https://github.com/sungbaekheo) |
