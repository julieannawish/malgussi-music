말구씨 음악 앱 V3.41 — 잠금화면 미디어 제어 보강 + MP4 작은 화면

1. 음악 백그라운드 재생
- Media Session 재생/일시정지/이전/다음 핸들러 유지
- 첫 실제 재생 시 Media Session 핸들러와 현재 곡 정보를 다시 등록해 iPhone 잠금화면/제어센터 연동을 보강

2. MP4 작은 화면(PiP)
- MP4 재생 시 [작은 화면] 버튼 표시
- Safari에서 지원되는 경우 WebKit presentation mode의 Picture-in-Picture 사용
- 표준 requestPictureInPicture도 지원하면 fallback
- 현재 환경에서 지원되지 않으면 버튼을 표시하지 않고, 시도 시 안내 문구 표시

주의:
iOS 홈 화면에 설치한 standalone PWA에서는 Picture-in-Picture가 Safari와 다르게 제한되는 WebKit 이슈가 현재 보고되어 있습니다. 따라서 지원 여부를 기능 탐지하여 안전하게 처리합니다.
