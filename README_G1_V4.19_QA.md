# 말구씨 음악 앱 — G1 / V4.19 QA

## Scope
G1 is limited to:
- MP3/MP4 file discovery
- playlist Track ↔ File binding
- nested-folder matching
- immediate `연결됨` status
- persistent Track-ID storage and restore
- re-selection of a missing original
- folder/cache relink

G2+ functions (autoplay, playback engine, progress, lock-screen, Media Session,
screen-transition playback, random/order behavior, UI redesign) are intentionally
not redesigned in V4.19.

## Root causes addressed
1. Playlist UI previously used a raw `fileMap.has(trackId)` check, which could
   report a stale/invalid File as connected or fail to reflect the live File.
2. The selected-file add path needed an explicit Track ↔ File binding before the
   playlist was rendered.
3. Persistent track storage was dual-written but not verified by reading it back.
4. Cached root-level files could be rejected merely because their relative path
   contained no slash.
5. File resolution needed a strict priority: live File → trackId cache →
   persistent media cache → saved folder handle.
6. Matching now prefers exact path, then exact name+size, then normalized
   name+size; ambiguous duplicates are not guessed.

## Internal verification
- JavaScript syntax: PASS
- Version marker V4.19: PASS
- Service Worker version: PASS
- Manifest version: PASS
- Track live binding helper: PASS
- Track-ID persistence verification: PASS
- Immediate connected status path: PASS
- Root-level cached MP4 acceptance: PASS
- Nested path fallback: PASS
- Ambiguous duplicate protection: PASS
- ZIP integrity: PASS

## G1 device test gate
1. Set the default media folder to the phone's top-level/default folder.
2. Open Playlist Management.
3. Navigate into a nested/sub-nested folder and add one MP4.
4. **Without opening the main screen, confirm the added MP4 immediately says `연결됨`.**
5. Add one MP3 the same way and confirm `연결됨`.
6. Completely close the PWA/app and reopen it.
7. Open Playlist Management first; confirm both items still say `연결됨`.
8. If an item says `원본 없음`, select that exact original file again; confirm it
   reconnects to the existing playlist item without creating a duplicate.
9. Repeat with an MP4 located in a root-level folder and one in a nested folder.

## G1 PASS rule
All nine checks must pass. Do not proceed to G2 if any G1 check fails.

## Important limitation
Local testing cannot execute iPhone Safari/PWA file permissions, storage quota,
or the user's actual MP4 files. Those remain the device validation gate.
