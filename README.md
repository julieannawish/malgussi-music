말구씨 음악 앱 V3.38 — MP4 영상 표시 위치 근본 수정

V3.37의 문제를 코드 구조에서 다시 확인했습니다.
MP4 <video> 요소가 표지 이미지와 같은 카드 안이 아니라 문서 하단에 별도 위치로 들어가 있었습니다.
V3.38에서는 video 요소를 메인 표지 이미지 바로 옆의 동일한 표시 영역 안으로 이동했습니다.

- MP4는 audio가 아닌 video로 재생
- video와 cover가 같은 화면 영역을 공유
- MP4 선택 시 cover 숨김 + video 표시
- 음악 선택 시 video 숨김 + cover 표시
- iPhone playsinline / webkit-playsinline
- 기존 폴더 자동 연결 유지
