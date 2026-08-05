# 작업 인계 노트 — 2026-08-05 갱신

다음 세션에서 바로 이어갈 수 있도록 작업과 남은 일을 정리합니다.

---

## 1. 지금 상태 한 줄 요약

문의 폼의 Cloudflare Pages Functions 이전까지 **배포 완료**(`40996f0`). 미푸시 커밋 없음, 작업 트리 깨끗함.

### ⚠️ 남은 것 — 대시보드에서 사람이 직접

`ADMIN_NOTIFY_WEBHOOK` **Secret이 아직 등록되지 않았습니다.** 그래서 지금 라이브 폼은 접수되지 않고 "온라인 접수 준비 중, 이메일로 보내주세요"를 표시합니다 — 거짓 성공을 띄우지 않도록 의도한 동작입니다.

```
Cloudflare Pages → lunarflux → Settings → Environment variables
ADMIN_NOTIFY_WEBHOOK = <웹훅 URL>   (Type: Secret, Production)
```

등록 후 **재배포해야 반영**됩니다. 재배포 뒤 확인:

```bash
curl -X POST https://lunarflux.ai/api/contact -H "Content-Type: application/json" \
  -d '{"name":"테스트","email":"a@b.com","message":"등록 확인"}'
# 503 unconfigured → 200 {"ok":true} 로 바뀌고 관리자 채널에 메시지가 떠야 정상
```

---

## 2. 오늘 배포 완료된 것 (커밋 4건, 모두 푸시됨)

| 커밋 | 내용 |
|---|---|
| `5178a9d` | `vercel.json` 삭제, 실제 배포처(Cloudflare Pages)에 맞게 문서 정정 |
| `d4f5d44` | Cursor 설정(`.cursorrules`, `.cursor/`)을 `CLAUDE.md`로 통합 후 제거 |
| `df85ba6` | 문의 폼 전송 연결, 관련 서비스 추천 로직 개선, Footer 저작권 2026 |
| `526d8e9` | 다크 테마 전면 개편 + 인라인 스타일 → Tailwind 전환 (12개 파일) |
| `918e3e5` | 좌우 정렬 불균형 수정 — 공통 컨테이너 `.container-page` 도입 |

원격 `origin/main` = `918e3e5`, 라이브 반영 확인 완료.

### 발견해서 고친 실제 버그

1. **문의 폼이 아무것도 전송하지 않았음** — `handleSubmit`이 1초 대기 후 무조건 성공 메시지를 띄우고 있었습니다. 그동안 들어온 문의는 유실됐을 가능성이 있습니다.
2. **관련 서비스 추천이 고정** — 모든 서비스 페이지가 배열 앞 4개를 똑같이 보여줬습니다. 카테고리·태그 점수화(`getRelatedServices`)로 교체했습니다.
3. **화면이 넓을수록 콘텐츠가 좁아짐** — `max-width`로 잘린 박스 안에서 `padding`을 `%`로 주고 있었습니다(2560px에서 콘텐츠 844px). Nav는 `max-width`가 없어 본문과 기준선이 어긋났습니다.

---

## 3. 완료 — 문의 폼 웹훅을 Pages Functions로 이전 (`40996f0`)

### 왜 옮겼는가

`NEXT_PUBLIC_` 환경변수는 **브라우저 번들에 그대로 박힙니다.** 누구나 개발자 도구로 웹훅 URL을 꺼내 스팸을 보낼 수 있고, Slack 웹훅은 브라우저에서 직접 호출하면 CORS로 차단됩니다. Pages Functions는 서버에서 호출하므로 두 문제가 모두 없어집니다.

### 검증 결과 — 로컬 wrangler·프로덕션 양쪽 통과

| 케이스 | 응답 |
|---|---|
| 정상 전송 (웹훅 설정됨) | `200 {"ok":true}` |
| 웹훅 미설정 | `503 {"reason":"unconfigured"}` |
| 잘못된 JSON | `400 {"reason":"invalid_json"}` |
| 필수 필드 누락 | `400 {"reason":"missing_field","field":...}` |
| 16KB 초과 본문 | `413 {"reason":"too_large"}` |
| 웹훅이 5xx 반환 | `502` — 응답에 웹훅 URL 미노출 확인 |
| GET | `404` |

정적 페이지 회귀도 확인했습니다 (`/`, `/contact/`, `/services/aidc/`, `/sitemap.xml`, `/robots.txt` 모두 200).

**초안의 기대값과 달랐던 두 가지 — 둘 다 정상 동작입니다.**

1. **GET은 405가 아니라 404.** Pages Functions는 매칭되는 메서드 핸들러가 없으면 정적 에셋 조회로 폴백하는데, `/api/contact` 정적 파일이 없으니 404가 됩니다. (배포 전 구 버전은 405를 반환했으므로, 405가 보이면 아직 Function이 안 올라간 것입니다 — 배포 확인용 신호로 쓸 수 있습니다.)
2. **400 계열은 웹훅이 설정돼야 도달합니다.** 함수가 본문을 파싱하기 전에 웹훅 설정 여부부터 확인하므로, 미설정 상태에서는 무엇을 보내든 503입니다. 검증하려면 `.dev.vars`에 더미 웹훅이 필요합니다.

### 해소된 가정

루트 `functions/` 디렉터리가 Cloudflare Pages 빌드에 자동 인식되는지 미검증이었으나, `40996f0` 배포에서 **인식됨을 확인**했습니다. 빌드 출력이 `out`이어도 루트 `functions/`는 별도로 수집됩니다. 푸시 후 반영까지 약 3분 걸렸습니다.

### 로컬에서 다시 검증할 때

`npm run dev`(Next 개발 서버)는 `/api/contact`를 서빙하지 않습니다. 반드시 빌드 후 wrangler로 띄우세요.

```bash
echo 'ADMIN_NOTIFY_WEBHOOK=https://discord.com/api/webhooks/...' > .dev.vars   # .gitignore 처리됨
npm run build
npx wrangler pages dev out --port 8788
```

---

## 4. 그 밖에 남은 일 (우선순위 순)

1. **`ADMIN_NOTIFY_WEBHOOK` Secret 등록** — 위 1번. 사람이 대시보드에서 해야 합니다.
2. **`npm audit` high 3건** — `npm install` 시 보고됨. 아직 확인 안 함.
3. **`.reveal` 섹션의 JS 의존** — `app/page.tsx`의 `IntersectionObserver`가 `.visible`을 붙여야 본문이 보입니다. JS가 막히면 콘텐츠가 안 보입니다. 기존부터 있던 동작이라 손대지 않았습니다.
4. **`package.json`에 `prepare` 스크립트 없음** — `scripts/ensure-git-hooks.cjs`는 `prepare`에서 실행되도록 작성됐지만 해당 항목이 없어 훅이 자동 등록되지 않습니다. 저장소를 새로 클론하면 `git config core.hooksPath .githooks` 를 수동 실행해야 합니다.

---

## 5. 환경 정보

| 항목 | 값 |
|---|---|
| 저장소 | `studios77/lunarflux-site` (main 브랜치) |
| 배포 | Cloudflare Pages 프로젝트 `lunarflux` |
| Account ID | `0b60a547abf5ee6413207b3c7ca2e7cc` |
| 도메인 | lunarflux.ai, lunarflux.pages.dev |
| 대시보드 | https://dash.cloudflare.com/0b60a547abf5ee6413207b3c7ca2e7cc/pages/view/lunarflux |
| wrangler 인증 | OAuth 로그인 완료 (`npx wrangler whoami` 로 확인) |
| 커밋 이메일 | `studios77@gmail.com` (전역 설정) |

`main`에 푸시하면 **곧바로 프로덕션 배포**됩니다. `.githooks/pre-push`가 푸시 전에 `npm run build`로 검증합니다.

### 디자인 토큰 (`app/globals.css`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-canvas` | `#070b14` | 페이지 배경 |
| `--color-elev` | `#0d1424` | 섹션 대비층 |
| `--color-surface` | `#121b2e` | 카드 |
| `--color-accent` | `#34d399` | 주 강조 (에메랄드) |
| `--color-accent-2` | `#22d3ee` | 보조 강조 (시안) |
| `--color-fg` / `-muted` / `-subtle` | `#e8eef7` / `#9fb0c8` / `#6b7f9c` | 텍스트 3단계 |

여백을 조절하려면 `.container-page` 의 `max-width`(현재 1200px) 한 곳만 고치면 전체에 반영됩니다.

⚠️ `.container-page`는 Tailwind 레이어 **밖**의 일반 CSS라 `max-w-*` 유틸리티를 덮어씁니다. 좁은 폭이 필요하면 중첩 구조로 쓰세요.

```jsx
<div className="container-page">
  <div className="mx-auto max-w-xl">…</div>
</div>
```

---

## 6. tmux로 이어서 작업하기

**주의: Windows에는 tmux가 없습니다.** WSL(Ubuntu)에 tmux 3.6이 설치되어 있어 그쪽에서만 쓸 수 있습니다. 그런데 WSL에는 Node가 없고, `node_modules`도 Windows용 네이티브 바이너리(Next.js SWC)로 설치되어 있어 WSL에서 그대로 실행되지 않습니다.

그래서 **WSL의 tmux로 창만 관리하고, 명령은 Windows 쪽에서 실행**하는 방식으로 스크립트를 만들어 두었습니다. 추가 설치가 필요 없습니다.

```bash
wsl bash /mnt/c/Users/admin/lunarflux-site/scripts/dev-tmux.sh
```

창 구성:

| 창 | 용도 |
|---|---|
| `dev` | `npm run dev` — http://localhost:3000 |
| `pages` | `wrangler pages dev out` — http://localhost:8788 (Functions 검증용) |
| `shell` | 자유 작업용 (git, 빌드 등) |

| 조작 | 키 |
|---|---|
| 창 이동 | `Ctrl+b` → `0` `1` `2` |
| 세션 분리 (백그라운드 유지) | `Ctrl+b` → `d` |
| 다시 붙기 | `wsl tmux attach -t lunarflux` |
| 세션 종료 | `wsl tmux kill-session -t lunarflux` |

`pages` 창은 `npm run build`를 먼저 돌려 `out/`이 있어야 동작합니다.

**더 깔끔한 방법을 원한다면** WSL에 Node를 설치하고 WSL 안에서 저장소를 다시 클론해 `npm install` 하는 쪽이 정석입니다(윈도우/리눅스 `node_modules`가 섞이지 않음). 다만 `/mnt/c` 경로는 파일 I/O가 느리므로 WSL 홈(`~/`)에 클론하는 편이 좋습니다.
