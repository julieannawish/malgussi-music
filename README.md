말구씨 음악 앱 V3.48 — MP4 잠금화면은 내장 커버 우선

핵심 규칙
- MP3/M4A: 내장 앨범커버가 있으면 사용, 없으면 말구씨 앱 아이콘
- MP4: 파일 내부의 covr(내장 artwork)를 찾아 사용, 없으면 말구씨 앱 아이콘
- MP4 영상 프레임을 잠금화면 artwork로 사용하지 않음
- 앱 안의 MP4 영상 화면은 기존처럼 정상 재생

MP4 artwork 처리
- MP4/M4A 컨테이너의 moov/udta/meta/ilst/covr/data 구조를 탐색
- JPEG/PNG 내장 커버 추출
- 잠금화면 Media Session에는 추출된 artwork의 Blob URL을 전달

UI
- MP4 영상 우측 상단 ↗ PiP 아이콘
- AirPlay 아이콘
- 기존 백그라운드/잠금화면 이전·재생·다음 유지
