말구씨 음악 앱 V3.39 — MP4 선택 시 앨범 이미지 숨김 수정

V3.38 테스트에서 MP4 영상은 실제로 표시되었지만 앨범 이미지도 위에 함께 남는 문제가 확인되었습니다.

원인:
CSS의 .art { display:block }이 HTML hidden 속성보다 우선되어 앨범 이미지가 숨겨지지 않았습니다.

V3.39 수정:
- .art[hidden] { display:none!important } 추가
- MP4 선택 시 앨범 이미지 완전히 숨김
- MP4 video만 기존 앨범 이미지 영역에 표시
- 음악 선택 시 video 숨김 + 앨범 이미지 표시
- 기존 iPhone playsinline / webkit-playsinline 유지
- 기존 폴더 자동 연결 기능 유지
- Service Worker/manifest 버전 V3.39
