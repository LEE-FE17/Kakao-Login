Kakao OAuth Login

카카오 OAuth 2.0을 활용한 로그인 기능 구현 프로젝트입니다.

📌 프로젝트 소개

카카오 계정을 이용하여 로그인하고, 사용자 정보를 가져와 화면에 표시하는 기능을 구현했습니다.

🛠️ 사용 기술

JavaScript (Vanilla)

Node.js

Express

Axios

Kakao OAuth API

🔑 주요 기능

카카오 로그인 인증 (OAuth 2.0)

인가 코드(Authorization Code) 기반 토큰 요청

사용자 정보 조회 (닉네임, 프로필 이미지)

로그인 상태 유지 (localStorage)

로그아웃 기능 구현

🔄 로그인 흐름

카카오 로그인 버튼 클릭

카카오 인증 서버로 이동

로그인 후 인가 코드(code) 발급

프론트에서 서버로 code 전달

서버에서 access token 요청

사용자 정보 API 호출

프론트에서 사용자 정보 화면 출력

⚠️ 보안 처리

Client Secret 및 민감 정보는 .env 파일로 관리

토큰 요청 및 사용자 정보 요청은 서버에서 처리

🚀 실행 방법
npm install
node server.js

프론트: Live Server 실행 (http://127.0.0.1:5500)

서버: http://localhost:3000

📷 결과

로그인 시 사용자 닉네임 및 프로필 이미지 표시

새로고침 시 로그인 상태 유지

로그아웃 시 상태 초기화

📌 느낀 점

OAuth 인증 흐름(인가 코드 → 토큰 → 사용자 정보)을 직접 구현하며 인증 과정의 구조를 이해할 수 있었습니다.