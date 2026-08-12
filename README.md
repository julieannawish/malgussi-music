말구씨 음악 앱 V3.49 — MP4 내장커버 추출 오류 수정

중요 수정:
V3.48에서 MP4의 covr/data atom을 찾았지만 data atom 안의 실제 이미지 시작 위치를 잘못 해석했습니다.

QuickTime/iTunes MP4 artwork data 구조:
- version/flags 4바이트
- artwork type 4바이트
- locale/reserved 4바이트
- 실제 JPEG/PNG 이미지 데이터

V3.49에서는 실제 이미지 시작을 +12바이트부터 읽고,
artwork type 13=JPEG, 14=PNG도 함께 인식합니다.

잠금화면 규칙:
- MP3/M4A: 내장커버 → 없으면 앱 아이콘
- MP4: 내장커버 → 없으면 앱 아이콘
- MP4 영상 프레임은 잠금화면 artwork로 사용하지 않음

앱 안의 MP4 영상 재생은 그대로 유지합니다.
