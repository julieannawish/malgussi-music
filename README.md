# 말구씨 음악앱 V4.21

## V4.21 — 버전 표기 상향(배포 확인용) + 저장 견고성 유지

- 배포된 버전이 이전과 다른지 화면에서 바로 확인할 수 있도록 버전만 V4.20 → V4.21로 올렸다.
- V4.20의 저장 구조(대용량은 Cache Storage 스트리밍 저장, 소용량은 IndexedDB 이중화)와
  재생목록 관리 화면의 `앱에 저장됨(재실행 복원 가능): N / M곡` 진단 표시를 그대로 유지한다.
- 기능 로직 변경은 없다.

## V4.20 — iPhone 재실행 후 재생목록 `원본 없음` 근본 수정

증상: 설정에서 아이폰 최상위 폴더를 지정하고 재생목록 관리에서 MP3·MP4를 각각
추가한 뒤 앱을 완전히 종료했다가 다시 열면, 재생목록의 곡 수(2곡)는 복원되지만
파일이 모두 `원본 없음`으로 표시되고 자동 재생도 되지 않는다.

원인: iOS/WebKit은 `<input>`으로 고른 File을 IndexedDB/Cache Storage에 저장할 때
실제 바이트가 아니라 임시 파일에 대한 **참조**로 저장할 수 있다. 세션 중에는
읽기·검증이 통과하지만(그래서 추가 시 에러가 없음) PWA를 종료하면 임시 파일이
사라져, 재실행 시 저장 블롭이 빈 값으로 읽힌다. 크기와 무관하므로 MP3·MP4가
모두 `원본 없음`이 된다.

### 수정 내용
- 저장 직전 File을 `arrayBuffer()`로 읽어 실제 바이트 Blob으로 복제(materialize)한 뒤
  IndexedDB와 Cache Storage에 저장한다. 재실행 후에도 바이트가 그대로 남는다.
  (`saveTrackFile`, `saveTrackFileToCacheAPI`, `cacheMediaFiles`)
- 대용량 파일은 동일 바이트를 한 곳에만 저장해 아이폰 저장 용량 압박을 줄인다(25MB 기준).
- 재생목록 관리 화면 진입 시 저장된 폴더 핸들의 읽기 권한을 재요청하도록 보완
  (데스크톱 브라우저 재시작 후 권한 리셋 대응, iOS에는 영향 없음).

## V4.19 — 기본 폴더 하위 폴더 MP4 재연결/캐시 구조 수정

이번 버전의 핵심은 **기본 폴더를 휴대폰 최상위 폴더로 지정하고 그 아래 하위·하위하위 폴더의 MP4를 재생목록에 넣은 뒤 앱을 다시 실행했을 때 `원본 없음`으로 바뀌는 문제**입니다.

### 수정 내용
- 기본 폴더 전체를 한 번에 IndexedDB에 복사하던 방식을 제거하고, **재생목록에 실제 포함된 파일만 trackId 기준으로 캐시**합니다.
- 한 개의 큰 MP4가 저장 용량/트랜잭션 문제를 일으켜도 다른 파일의 캐시가 함께 실패하지 않도록 **파일별 독립 저장**으로 변경했습니다.
- IndexedDB 저장에 실패하는 경우 Cache Storage를 **2차 캐시**로 사용합니다.
- 앱 재실행 시 `trackId → IndexedDB → Cache Storage → 기본 폴더 Handle 재귀 탐색 → 파일명/크기/경로 매칭` 순서로 복구합니다.
- 하위 폴더/하위하위 폴더는 계속 재귀 탐색합니다.
- 자동 재연결에서 `원본 없음` 항목을 삭제하지 않습니다.
- 폴더 전체를 스캔해도 재생목록에 없는 파일을 캐시하기 위해 대용량 저장공간을 불필요하게 사용하지 않습니다.
- MP4를 다시 선택하면 기존 trackId에 원본을 재연결합니다.
- V4.13까지의 3종 버튼, 프로그레스바, 현재곡 하이라이트, 연속/랜덤/한곡반복, 재생목록 이동 중 재생 유지 로직을 유지합니다.

### QA 핵심 회귀 시나리오
1. 최상위 폴더 선택
2. `하위/하위/영상.mp4`를 재생목록에 추가
3. 기본화면에서 MP4 연결 및 재생 확인
4. 앱 종료/새로고침
5. 재생목록에서 같은 MP4가 `원본 없음`이 아닌 `MP4 · 연결됨`인지 확인
6. MP3와 MP4가 섞인 목록에서 이전/재생/다음 확인
7. 마지막곡/첫곡 경계 확인
8. 재생 중 재생목록 관리 화면 이동 후 재생 지속 확인

V4.19는 V4.13까지의 회귀 방지 기준을 유지하면서, 재생 상태 보존·백그라운드/잠금화면 기반 동작·전체화면·재생목록 이동 동작을 보완한 버전입니다.

## 이번 버전 핵심 수정
- 재생 중 `재생목록 관리`로 이동해도 현재 MP3/MP4 재생을 **중지하지 않음**
- 재생목록 화면에서 현재 재생곡 자동 스크롤/하이라이트 유지
- 재생 중 재생목록을 열었다 닫아도 동일 곡의 재생 상태를 유지
- 재생목록에서 다른 곡을 명시적으로 선택한 경우에만 해당 곡으로 전환
- 백그라운드/앱 전환 시 코드에서 임의로 `pause()`하지 않도록 보호
- Media Session 상태 및 잠금화면 이전/재생/다음 핸들러 유지
- MP4 전체화면 진입 버튼 추가
- MP3도 동일한 전체화면 버튼으로 커버/재생 영역을 크게 볼 수 있도록 추가
- iPhone에서는 MP4의 경우 지원되는 환경에서 native video fullscreen을 우선 시도
- 연속재생/랜덤재생/한 곡 반복 3버튼 균등 배치 및 연속재생 기본값 유지
- MP4 프레임 내부 기본 컨트롤/시간바 제거 유지
- MP3→MP4 실제 재생 상태와 외부 3종 세트 상태 동기화 유지
- 기본 미디어 하위 폴더 재귀 탐색 및 재생목록 원본 동기화 유지
- 정상 상태에서 stale `음악 폴더를 선택해 주세요.` 메시지가 남지 않도록 유지

## 기존 기능 회귀 보호
- V3.68 기준 재생목록 추가 흐름의 파일 선택 동작
- V3.85~V3.90 하위폴더/탐색기 흐름
- 멀티셀렉트 / 일괄삭제 / 중복삭제 / 순서변경
- V3.97 최초 실행 시 초기화면 3종 세트 동작
- V3.98 MP4 자동재생 상태 동기화
- V3.99 현재 재생곡 스크롤/하이라이트 및 상태 메시지 정리

## 테스트 원칙
이번 버전부터 기능을 추가할 때마다 **신규 기능 테스트와 함께 이전 PASS 기능 회귀 테스트를 다시 수행**하는 것을 기준으로 합니다. 버전별 기준은 `VERSION_REGRESSION_MATRIX.md`에 기록합니다.

## 실제 iPhone 최종 확인이 필요한 항목
- iOS/WebKit의 실제 백그라운드 MP3 재생 지속 여부
- 실제 잠금화면 미디어 컨트롤 노출 여부
- iPhone 홈 화면 PWA에서 MP4 fullscreen/PiP 지원 범위
- Files 권한 및 폴더 핸들 복원

개발 환경에서는 위 iOS 전용 동작을 완전히 재현할 수 없으므로, 이 항목은 최종 실기기 리뷰 대상으로 명시합니다.


## V4.13 핵심 보완
- 멀티태스크/백그라운드 이동 시 앱 코드가 재생을 임의로 중지하지 않도록 유지.
- 잠금화면 Media Session의 재생 명령을 실제 재생 로직과 연결.
- 잠금화면 커버 보강: MP3/MP4 내장 artwork 우선, 없으면 MP4 첫 프레임 fallback.
- MP4 프레임 내부의 중복 실행 버튼 제거. 재생 제어는 프레임 외부 3종 세트로 일원화.
- 앱 시작/자동 폴더 재연결에서는 누락 파일을 재생목록에서 자동 삭제하지 않음.
- 명시적인 폴더 선택/스캔에서만 누락 항목 정리를 허용.

## V4.13 핵심 보완
- 앱 부팅/캐시 복원에서 재생목록을 자동 삭제하지 않음.
- 초기화면 3종 세트가 boot 완료 후 실제 source 연결 상태에서 동작하도록 보완.
- 첫/중간/마지막 곡의 이전/재생/다음 경로 통합.
- 연속재생에서 마지막 곡 다음은 첫 재생 가능 곡으로 순환.
- 원본이 아직 연결되지 않은 재생목록이 있을 때 잘못된 빈 라이브러리 안내를 줄임.
- MP4 프레임 내부 실행 버튼 제거 유지.
- 전체화면은 연결된 MP4에서만 표시.
- 잠금화면 이전/다음도 화면과 동일한 navigation 경로 사용.

## V4.13
- 현재곡을 Track ID 기준으로 관리하여 마지막→첫 경계에서 기본화면과 재생목록 하이라이트/스크롤이 동일 곡을 가리키도록 보완.
- 재생목록 순서 변경 후에도 현재곡 identity 유지.

## V4.13
- 원본없음 기존 항목 재선택 시 기존 Track ID에 File 객체 재연결.
- 휴대폰 전체 기본 폴더 재귀 재연결.
- 잠금화면 이전/다음 navigation 통합.

## V4.13
- 비정리(non-cleanup) 재연결에서 기존 fileMap을 보존하여 새로 추가한 파일이 사라지지 않도록 수정.
- 휴대폰 전체 기본 폴더의 디렉터리 핸들 재연결도 하위 폴더까지 재귀 탐색.
- 빈 재생목록에서 파일을 추가하면 첫 추가곡을 현재곡으로 즉시 확정.
- 랜덤 모드에서도 기본화면 재생 버튼이 현재 커서 곡을 재생하도록 보완.

## V4.13
- 재생목록을 IndexedDB에도 백업하여 버전업/앱 재실행 시 복원.
- 파일 추가 직후 현재곡 media source를 준비해 기본화면 3종 버튼이 즉시 동작.
- 랜덤 모드에서도 재생 버튼은 현재 커서 곡을 재생.

## V4.13
- 기본화면 3종 버튼을 앱 전체 부팅/폴더 스캔과 분리.
- 첫 추가곡 currentTrackId/index 확정.

## V4.13
- Persistent exact trackId-to-file mapping added to prevent playlist/fileMap divergence.
- Main transport controls restore exact cached media without waiting for boot.

## V4.13
- Unified track file resolver and non-destructive relink.
- Re-selecting an existing file reconnects its playlist track instead of ignoring it.


## V4.19 QA
- Fixed main-screen transport controls racing asynchronous boot/relink.
- Boot now waits for source mapping before declaring playback ready.
- Play/Previous/Next no longer depend on visiting playlist management or dragging rows to give boot time to finish.

## V4.19
- MP4 playlist status is immediately shown as connected after adding.
- Live File binding is established before playlist rendering.
- Existing playlist, playback, progress, lock-screen, and media handling retained.

## V4.19 G1
- G1: file matching, Track-ID binding, persistence verification, and immediate connected status.
