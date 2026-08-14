# 말구씨 음악앱 V4.00 QA 기록

## A. 신규 수정
- [PASS 정적] 재생목록 진입 코드에서 현재 media를 pause하지 않음
- [PASS 정적] 재생목록 진입 전 `mediaActuallyPlaying` 상태를 보존
- [PASS 정적] 재생목록 종료 시 원래 재생 중이던 곡이면 동일 media를 재개
- [PASS 정적] 사용자가 재생목록에서 다른 곡을 선택한 경우에만 새 곡을 재생
- [PASS 정적] visibility/pagehide 처리에서 임의 pause 없음
- [PASS 정적] MP3/MP4 전체화면 버튼 1개를 mediaStage에 배치
- [PASS 정적] MP4는 지원 시 webkitEnterFullscreen 우선, 그 외 fullscreen API 사용

## B. 이전 PASS 회귀 보호
- [PASS 정적] 초기화면 이전/재생·잠시멈춤/다음 버튼 존재 및 beginMediaCommand 사용
- [PASS 정적] 재생목록 3개 재생 방식: 연속재생/랜덤재생/한 곡 반복
- [PASS 정적] 연속재생 기본값 order
- [PASS 정적] 재생목록 현재곡 current-playing 클래스
- [PASS 정적] 현재곡 scrollIntoView 호출
- [PASS 정적] 추가 버튼의 iPhone 파일 picker 직접 호출
- [PASS 정적] 폴더 탐색기 및 하위 폴더 재귀 탐색 코드 유지
- [PASS 정적] MP4 frame 내부 기본 controls 비활성 유지
- [PASS 정적] Media Session play/pause/previous/next 핸들러 유지
- [PASS 정적] stale 상태 메시지 정리 로직 유지

## C. 패키지 QA
- JavaScript 4개 inline script `node --check`: PASS
- 중복 HTML id: 없음
- fullscreen button id: 1개
- manifest start_url: v=400
- service worker cache: malgussi-v400
- service worker registration query: v=400
- README / QA 버전: V4.00
- ZIP integrity: build 후 테스트

## D. 실기기 최종 리뷰
- iPhone에서 MP3 재생 → 재생목록 관리 진입: 재생 지속
- MP4 재생 → 재생목록 관리 진입: 영상 상태 지속 가능 여부 확인
- 재생목록에서 다른 곡 선택: 선택곡으로 전환
- 앱 전환: MP3 백그라운드 재생
- 잠금화면: 이전/재생/다음
- MP4 전체화면
- MP4 PiP 지원 환경
