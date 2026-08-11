말구씨 음악 앱 V3.14 PURE INDEX
- V3.13 INDEX 기반
- 음악 파일 본문을 전혀 읽지 않는 순수 인덱스 방식
- arrayBuffer/FileReader/Blob 저장을 사용하지 않음
- localStorage에는 파일명/크기/수정일/type/id만 저장
- 현재 세션의 File 객체는 메모리에서만 사용하며 저장하지 않음
- 재생 시에만 URL.createObjectURL(file) 생성
- 재생목록/드래그 정렬/계속 듣기 유지
- 앱 저장공간의 음악 파일은 0MB를 목표로 함
- 앱 재실행 후 원본 파일은 '원본 음악 다시 연결'로 다시 선택해야 할 수 있음
