말구씨 음악 앱 V3.35 — PWA 자동 업데이트 안정화

V3.34에서 GitHub에 새 파일을 올렸는데 실행 화면이 이전 버전으로 남는 문제를 수정했습니다.

원인:
- V3.34 index.html에는 Service Worker를 등록/업데이트하는 코드가 없었습니다.
- 따라서 기존에 설치된 PWA/Service Worker가 새 파일을 즉시 반영하지 못할 수 있었습니다.

V3.35:
- 앱 실행 때 sw.js를 updateViaCache:none으로 확인
- 새 Service Worker가 있으면 즉시 활성화
- 기존 캐시는 새 버전 활성화 시 삭제
- 새 controller가 적용되면 한 번 자동 새로고침
- 시작 URL도 ?v=335로 갱신
- MP4 동영상 재생 기능 유지
- 음악 폴더 지정 및 자동 연결/정리 유지
