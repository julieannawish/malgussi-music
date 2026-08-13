# 말구씨 음악앱 V3.98 QA

## 기능별 기준
- 최초 실행 이전/재생/다음: V3.97 PASS 보호
- 재생목록 + 추가: V3.90 PASS 보호
- MP4 프레임 기본 컨트롤 제거: PASS 보호
- MP3→MP4 실제 자동재생/외부 상태 동기화: V3.98 수정 대상
- 재생목록 진입 시 현재 재생 곡 자동 스크롤/하이라이트: V3.98 추가
- 재생 방식: 연속재생 기본값, 랜덤재생, 한 곡 반복

## 배포 정합성
- 앱 표시 버전: V3.98
- APP_VERSION: V3.98
- manifest start_url: v=398
- Service Worker cache: malgussi-v398
- README: V3.98

## 자동/정적 점검
- JavaScript syntax: PASS
- Service Worker syntax: PASS
- duplicate ID scan: PASS
- legacy version scan: 반드시 V3.98 외 잔존 배포버전 문자열이 없어야 함
- ZIP integrity: PASS
