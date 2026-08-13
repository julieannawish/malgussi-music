# 말구씨 음악앱 V3.96 QA

## 변경 목적
V3.94/V3.95에서 보고된 최초 실행 시 기본 화면의 이전·재생·다음 버튼 미동작 문제를 재점검하고, V3.90에서 PASS된 재생목록 `＋ 추가` 기능 및 V3.92~V3.93의 MP4 동작을 보존합니다.

## 핵심 회귀 기준
- 최초 실행 기본 화면: 이전 / 재생 / 다음 이벤트 경로 유지
- 재생목록 `＋ 추가`: V3.68/V3.90의 iPhone 파일 선택창 호출 구현 보존
- MP4: 자동재생, 프레임 내부 기본 controls 제거, 외부 재생상태 동기화, 재생목록 진입 중 자동재생 금지

## 배포 캐시 정합성
- HTML 표시 버전: V3.96
- APP_VERSION: V3.96
- manifest start_url query: v=396
- Service Worker cache: malgussi-v396
- Service Worker registration query: v=396

## 자체 점검
- HTML 내 JavaScript 구문 검사: PASS
- Service Worker 구문 검사: PASS
- ZIP 무결성: PASS
