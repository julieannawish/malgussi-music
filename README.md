말구씨 음악 앱 V3.45 — MP4 작은 화면 + AirPlay 최종 UI

V3.45는 현재까지 확정된 기능을 하나로 묶은 최종 테스트 버전입니다.

영상 프레임 우측 상단:
- ↗ : 작은 화면(PiP)
- ⌁ : TV로 보내기(AirPlay)

AirPlay
- iPhone Safari/WebKit의 HTML5 video AirPlay API를 사용
- 실제 AirPlay picker API가 제공되는 환경에서만 아이콘 표시
- 아이콘을 누르면 iPhone의 AirPlay 대상 선택창 호출
- Apple TV 등 AirPlay 지원 기기로 영상 전송 가능
- 아이폰 화면 전체 미러링과는 별개이며, 현재 MP4 영상 재생을 TV로 보내는 기능

PiP
- 실제 지원되는 환경에서만 ↗ 아이콘 표시
- 지원되지 않는 홈 화면 PWA에서는 버튼을 표시하지 않음

커버
- MP3/M4A 내장 앨범 커버가 있으면 잠금화면 artwork로 사용
- 없으면 말구씨 앱 아이콘
- MP4는 실제 영상 프레임을 잠금화면 artwork로 사용하고 실패하면 앱 아이콘

기존 기능 유지
- 백그라운드 재생
- 잠금화면 이전/재생/다음
- 음악 폴더 자동 연결
- 없는 파일 자동 정리
- MP4 인앱 재생
