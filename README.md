말구씨 음악 앱 V3.31 — 저장된 폴더 핸들 지원 + iOS 안전 fallback

검증된 사실:
- Safari/WebKit의 Origin Private File System은 사이트 자체 저장공간이며 사용자의 음악 폴더가 아닙니다.
- Safari 26.x에서 File System WritableStream/OPFS 기능은 지원되지만, 표준 showDirectoryPicker()를 이용해 외부 폴더를 다시 여는 방식은 사용할 수 없습니다.
- 따라서 iOS 26.6의 webkitdirectory 방식에서는 앱이 외부 음악 폴더의 실제 위치/권한을 다음 실행 때 자동으로 복원할 수 없습니다.
- V3.31은 미래/지원 브라우저에서 실제 FileSystemDirectoryHandle이 제공되고 read 권한이 유지되는 경우에만 IndexedDB에 handle을 저장하고 자동 스캔합니다.
- iOS 26.6에서는 기존 안전 fallback인 '음악 폴더 한 번 확인'으로 동작합니다.
- 앱 실행만으로 파일이 없다고 판단하여 곡을 삭제하지 않습니다.
- 실제 폴더 스캔 후에만 찾지 못한 곡을 인덱스에서 삭제합니다.
- 없는 곡 재생 시 iOS에서 개별 파일 선택창을 자동으로 띄우지 않습니다.
- 음악 파일 자체는 앱 저장공간에 복사하지 않습니다.
