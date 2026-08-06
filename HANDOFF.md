# 작업 인계 노트 — 2026-08-07 갱신

다음 세션에서 바로 이어갈 수 있도록 정리합니다.

---

## 1. 지금 상태 한 줄 요약

메인 개편·접근성·SEO까지 **31개 커밋 전부 배포 완료**. 미푸시 없음, 작업 트리 깨끗함.
남은 것은 **문의 폼 전달 경로 등록 하나뿐**입니다.

| | |
|---|---|
| 원격 `origin/main` | `aed4b03` |
| 미푸시 커밋 | 없음 |
| 라이브 | https://lunarflux.ai |

---

## 2. ⚠️ 아침에 가장 먼저 — 문의 폼이 아직 접수되지 않습니다

**코드는 배포 끝났고 시크릿만 없습니다.** 지금 폼을 제출하면 `503` 이 돌아오고
"온라인 접수 준비 중, 이메일로 보내주세요" 안내가 뜹니다. 전달되지 않은 문의를
접수된 것처럼 보이게 하지 않으려고 의도한 동작입니다.

```
$ npx wrangler pages secret list --project-name lunarflux
The "production" environment ... has access to the following secrets:
   (비어 있음)
```

### 선택지 — 셋 중 하나만 등록해도 동작합니다

**A. 웹훅 (가장 빠름, 1~2분)** ← 8/6 밤에 여기까지 진행하다 중단

Discord: 채널 우클릭 → 채널 편집 → 연동 → 웹후크 → 새 웹후크 → URL 복사
Slack: api.slack.com/apps → Create New App → Incoming Webhooks 켜기 → URL 복사

```bash
npx wrangler pages secret put ADMIN_NOTIFY_WEBHOOK --project-name lunarflux
```

URL 로 Slack·Discord·범용을 자동 판별합니다.

**B. 이메일 — ZeptoMail (Zoho)**

`lunarflux.ai` 가 이미 Zoho 에 인증돼 있어(DNS 에 `zoho-verification` TXT 확인)
도메인 등록이 짧게 끝납니다. DKIM 레코드만 Cloudflare DNS 에 추가하면 됩니다.

1. https://www.zoho.com/zeptomail/ 가입 → 도메인 추가 → DKIM 등록
2. Mail Agent 생성 → Send Mail Token 발급

```bash
npx wrangler pages secret put ZEPTOMAIL_TOKEN   --project-name lunarflux
npx wrangler pages secret put CONTACT_TO_EMAIL  --project-name lunarflux   # contact@lunarflux.ai
```

`CONTACT_FROM_EMAIL` 은 생략 가능(기본 `LunarFlux AI <noreply@lunarflux.ai>`).
다른 주소를 쓰려면 등록하되 ZeptoMail 에서 인증한 도메인이어야 합니다.

**C. Resend** — `RESEND_API_KEY` + `CONTACT_TO_EMAIL`. 대안일 뿐 우선순위 낮음.

> 여럿 등록하면 모두로 전달됩니다. 중복 발송이 유실보다 낫다는 판단입니다.

### 등록 뒤 반드시 재배포

Pages Functions 는 **등록 시점 이후 배포부터** 시크릿을 읽습니다. 등록만 하고
재배포를 안 하면 계속 503 입니다.

```bash
git commit --allow-empty -m "chore: 시크릿 반영 재배포" && git push origin main
```

### 검증

```bash
curl -X POST https://lunarflux.ai/api/contact -H "Content-Type: application/json" \
  -d '{"name":"테스트","email":"a@b.com","message":"등록 확인"}'
# 503 unconfigured → 200 {"ok":true} 로 바뀌고 채널·메일에 도착하면 완료
```

---

## 3. 오늘 배포한 것 (커밋 31건, 전부 푸시됨)

### 발견한 실제 버그 — 이게 오늘의 핵심입니다

**① 전역 리셋이 Tailwind 여백을 전부 무효화하고 있었음** (`48bfff0`)

`globals.css` 가 Tailwind 레이어 **밖**에서 리셋을 다시 선언하고 있었습니다.

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
```

캐스케이드에서 레이어 밖 규칙은 레이어 안 규칙을 항상 이깁니다. Tailwind v4 의
`p-*` / `px-*` / `py-*` / `m-*` 는 전부 `@layer utilities` 안이라, 이 한 줄이
**사이트 전체의 모든 여백 유틸리티를 덮어쓰고** 있었습니다.

버튼이 텍스트에 딱 붙고 카드 안쪽 여백이 없던 것, 그리고 여백을 세 번이나
넓혔는데 화면이 그대로였던 것이 전부 이 때문입니다.
**preflight 가 이미 `@layer base` 에서 같은 일을 하므로 다시 쓰면 안 됩니다.**

**② seoH1 18개가 정의만 되고 렌더되지 않았음** (`390514e`)

`servicesData` 에 SEO 용 제목이 18개 있는데 JSON-LD 에만 쓰이고, 실제 `<h1>` 은
짧은 브랜드명이었습니다. 검색엔진이 가장 무겁게 보는 자리에 검색어가 없었습니다.

```
이전 h1  Lunarflux Guard · NGFW
현재 h1  차세대 방화벽 NGFW · WAF · AI 보안 통합 어플라이언스
```

**③ 네이버 소유확인 태그가 3개월간 유실돼 있었음** (`734ff86`)

```
2026-04-25  197fd97  메타태그 추가
2026-05-01  d3b0ad3  SEO 정리 중 유실
이후 3개월  태그 없이 배포 → 네이버 재검증에서 미인증으로 떨어졌을 가능성
```

git 이력에 남아 있던 원래 코드를 복구했습니다. 등록은 살아 있어 재등록 불필요.

**④ 사이트에 부정확한 수치가 올라가 있었음** (`740dde0`)

관리 콘솔 실화면과 대조한 결과 사양서 값이 달랐습니다.

```
IDS 시그니처   6만+    → 51,977   (과장이었음)
WAF 규칙       101규칙 → 105규칙  (그새 늘었음)
```

**⑤ 그 밖에** — 메가메뉴가 키보드·터치로 안 열림, JS 실패 시 홈 본문 전체 비가시,
앵커 이동 시 섹션 상단이 헤더에 가림, 서비스 14개 페이지에 Footer 없음.

### 기능

- 문의 폼을 Cloudflare Pages Functions 로 이전 (`40996f0`)
  `NEXT_PUBLIC_` 웹훅 URL 이 브라우저 번들에 박히던 문제 해결
- 이메일 접수 경로 추가 — ZeptoMail·Resend (`7de48a1`, `11e361e`)
- **Lunarflux Guard** NGFW 서비스 추가 (`2527ddb`, 슬러그 `d9313af`)
- 클라우드 보안 2종 신설 → 서비스 15개 → **18개** (`caf841d`)
- 보안 카테고리 4분류 재편: 네트워크 / 클라우드 / AI·데이터 / 운영
- 사용자용 사이트맵 페이지 `/sitemap-page/` (`4a30685`)

### 디자인

- 타이포 스케일 4단계 도입, 12px 미만 텍스트 32곳 → 0곳 (`bd7b3b7`)
- 자간 `0.01em` 도입 — body 에 letter-spacing 이 아예 없어 한글이 붙어 나왔음 (`690cf48`)
- 메인 축약: 본문 3,905자 → 1,218자 (`c5d3f57`)
- 히어로를 **관제 중심(C안)** 으로 개편 — LIVE 티커 + 인시던트 보드 (`534e9c6`)
- 히어로 우측 **CSS 3D IDC 통로** 비주얼 (`4d4aaae` → `208e96a`)
- 이모지 → SVG 아이콘 세트 (`ServiceIcon.tsx`)
- 로고·파비콘·OG 이미지 생성 (`0a81749`)

### 접근성 · SEO

- P0 4건: 메가메뉴 키보드/터치, JS 실패 폴백, ChatBot 전역화, Footer 누락 (`47cf1cb`)
- P1 4건: focus-visible, skip link, 터치 타겟 44px, contact canonical (`f5c15c1`)
- 제목·설명·구조화 데이터를 주력 서비스로 교체 (`a61ad0c`)
- 페이지별 OpenGraph, BreadcrumbList, Organization 기업정보 (`390514e`)
- `npm audit` high 3건 해소 → `found 0 vulnerabilities` (`45d49be`)

---

## 4. 알아 두면 좋은 것

### 이 저장소에서 주의할 점

- **`globals.css` 에 전역 리셋을 다시 쓰지 마세요.** 2번 ①번 항목 참고.
- **CSS 주석 안에 별표+슬래시를 붙여 쓰면 주석이 거기서 끝납니다.**
  `p-*/px-*` 라고 적었다가 dev 서버가 500 을 냈습니다 (`9dddb0f`).
  프로덕션 빌드는 통과해서 Turbopack 만 잡아냅니다.
- **`SITE_VERIFICATION.naver` 를 지우지 마세요.** 지우면 네이버 인증이 끊깁니다.
- 구글은 **DNS TXT** 로 인증돼 있어 코드와 무관합니다. 메타태그를 더하면 중복입니다.
  `google-site-verification=QnuX6yTbHeAPL7CemB-JD07LDE5Po6sHyYqbiwgwbr8`
- 서비스 콘텐츠는 `lib/servicesData.ts` 단일 출처입니다. `Services.tsx` 가 따로
  들고 있던 중복은 제거했습니다.
- `next dev` 가 `CLAUDE.md` 하단에 자기 안내 블록을, `next-env.d.ts` 에 dev 경로를
  자동으로 씁니다. 커밋 전에 확인하세요.

### 디자인 시안

claude.ai/design → **LunarFlux AI — 디자인 시스템** 프로젝트에 올려 뒀습니다.

- 파운데이션 (색·타이포 토큰)
- 메인 시안 A/B/C — **C안(관제 중심) 채택**
- ServerRack 컴포넌트 (CSS 3D 통로, 의도 주석 포함)

### `_input/` 폴더 (gitignore 처리됨)

- `ngfw_spec.md` — Lunarflux Guard V1.2 제품 사양서
- `ngfw_1~3.png` — 관리 콘솔 캡처
- `lunarfluxai_메인 *.png` — 개편 전 메인 캡처
- `lunarfluxai_logo.png` — 원본 로고 (흑백, 알파 없음)
- `0001·0002·0004·0015.jpg` — IDC 실사 (톤이 안 맞아 사이트에는 미사용)

### 관리 콘솔

Lunarflux Guard 관리 콘솔은 **관리자 IP 화이트리스트로 격리**돼 있어 외부에서는
웹 포트가 닫혀 있습니다. 자격증명과 주소는 이 문서에 남기지 않습니다.
콘솔 내용을 사이트에 반영할 때는 **관리 IP·공격자 IP·내부 VM 이름·계정이
함께 노출되지 않도록** 주의하세요 (그래서 스크린샷 대신 `ConsolePreview.tsx` 로
UI 를 재현했습니다).

---

## 5. 남은 과제 (우선순위 순)

1. **문의 폼 전달 경로 등록** — 위 2번. 이것만 하면 사이트가 온전히 동작합니다.
2. **네이버 서치어드바이저 마무리** — 인증 복구가 배포됐으니
   ① 사이트 관리 › 검증에서 소유확인 상태 확인
   ② 요청 › 사이트맵 제출 (`sitemap.xml`, URL 21개로 늘었고 바뀐 주소 있음)
   ③ 요청 › 웹페이지 수집으로 홈·`lunarflux-guard`·`contact` 수동 요청
3. **다음 검색 등록** — https://register.search.daum.net (미등록 상태)
4. **디자인 마무리** — 여백 버그 수정 이후 화면을 보고 다듬는 작업이 남았습니다.
   랙 비주얼 밝기·속도, 히어로 균형 등.
5. **Guard 미확정 2건**
   - HA·노드 이중화가 출시됐는지 (사양서엔 "로드맵" 으로 표기돼 사이트에서 뺐음)
   - 경쟁사 비교표를 넣을지 (순수 WAF 대비 차별점이 강력한데 비교 대상·값 필요)
6. `.reveal` 섹션의 JS 의존 — 폴백을 넣어 완화했지만 구조 자체는 그대로.
7. `package.json` 에 `prepare` 스크립트 없음 — 새로 클론하면
   `git config core.hooksPath .githooks` 를 수동 실행해야 합니다.

---

## 6. 환경 정보

| 항목 | 값 |
|---|---|
| 저장소 | `studios77/lunarflux-site` (main) |
| 배포 | Cloudflare Pages 프로젝트 `lunarflux` |
| Account ID | `0b60a547abf5ee6413207b3c7ca2e7cc` |
| 도메인 | lunarflux.ai, lunarflux.pages.dev |
| 대시보드 | https://dash.cloudflare.com/0b60a547abf5ee6413207b3c7ca2e7cc/pages/view/lunarflux |
| 메일 | Zoho (도메인 인증 완료, SPF 설정됨) |
| wrangler | OAuth 로그인 완료 (`npx wrangler whoami`) |

`main` 에 푸시하면 곧바로 프로덕션 배포됩니다. `.githooks/pre-push` 가 푸시 전에
`npm run build` 로 검증합니다. 배포 반영까지 대략 1~3분.

### 개발 서버

```bash
npm run dev                                  # http://localhost:3000

# Pages Functions(/api/contact) 검증은 wrangler 로만 가능합니다.
# npm run dev 는 이 경로를 서빙하지 않습니다.
npm run build && npx wrangler pages dev out --port 8788
```

> dev 서버가 옛 CSS 를 서빙하는 일이 몇 번 있었습니다. 값을 고쳤는데 화면이
> 그대로면 `.next` 를 지우고 다시 띄우세요 — Turbopack 캐시 문제입니다.

### 디자인 토큰 (`app/globals.css`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-canvas` | `#070b14` | 페이지 배경 |
| `--color-elev` | `#0d1424` | 섹션 대비층 |
| `--color-surface` | `#121b2e` | 카드 |
| `--color-accent` | `#34d399` | 주 강조 (에메랄드) |
| `--color-accent-2` | `#22d3ee` | 보조 강조 (시안) |
| `--color-fg-subtle` | `#8698b3` | surface 위 5.9:1 (이전 `#6b7f9c` 는 4.2:1 로 AA 미달) |
| `--text-label` | 12px / 1.65 | 라벨·뱃지. 더 줄이지 않습니다 |
| `--text-meta` | 13px / 1.75 | 표 셀·보조 설명 |
| `--text-body` | 15px / 1.8 | 카드 본문 |
| `--text-lead` | 17px / 1.85 | 섹션 도입 문단 |

여백은 `.container-page` 의 `max-width`(1200px) 한 곳에서 조절합니다.
`.container-page` 는 Tailwind 레이어 밖이라 `max-w-*` 를 덮어씁니다 —
좁은 폭이 필요하면 중첩 구조로 쓰세요.
