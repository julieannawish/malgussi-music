말구씨 음악 앱 V3.46 — 영상 프레임 UI 위치 + MP4 잠금화면 artwork 보강

1. MP4 영상 프레임 UI
- PiP(작은 화면) ↗ 아이콘과 AirPlay 아이콘을 영상 프레임 내부의 최상단 오른쪽에 배치
- 재생/이전/다음 버튼 영역과 완전히 분리
- AirPlay 아이콘은 WebKit AirPlay picker가 실제 제공될 때만 표시
- PiP 아이콘은 실제 PiP가 지원될 때만 표시

2. MP4 잠금화면 artwork
- 별도 숨은 video decoder보다 현재 재생 중인 실제 video element의 프레임을 우선 캡처
- loadeddata 이후 프레임 캡처하도록 순서를 조정
- 실패할 경우 별도 decoder로 재시도
- 캡처 실패 시 기존 fallback(말구씨 앱 아이콘)

3. MP3/M4A
- 내장 커버가 있으면 그 커버
- 없으면 말구씨 앱 아이콘

4. 기존 기능 유지
- 백그라운드 재생
- 잠금화면 이전/재생/다음
- 음악 폴더 자동 연결 및 없는 항목 정리
- MP4 재생
