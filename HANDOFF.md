# 작업 인계 노트 — 2026-08-08 갱신

다음 세션에서 바로 이어갈 수 있도록 정리합니다.

---

## 1. 지금 상태 한 줄 요약

메인 개편·접근성·SEO에 더해 **문의 폼까지 동작합니다.** 미푸시 없음, 작업 트리 깨끗함.
사이트 기능상 막힌 것은 없고, 남은 건 검색 등록과 디자인 다듬기입니다.

| | |
|---|---|
| 원격 `origin/main` | `97ff04b` |
| 미푸시 커밋 | 없음 |
| 라이브 | https://lunarflux.ai |
| 문의 폼 | ✅ 동작 (Web3Forms → contact@lunarflux.ai) |

---

## 2. 문의 폼 — 2026-08-08 해결됨

**Web3Forms 경로로 붙였습니다.** 도메인 인증·DKIM 없이 액세스 키 하나로 끝나서
ZeptoMail보다 훨씬 빨랐습니다. `POST /api/contact` → `200 {"ok":true}` 확인 완료.

```
WEB3FORMS_ACCESS_KEY   production 등록됨 (Value Encrypted)
액세스 키 원본          _input/92e76d57-….txt  ← 파일명 자체가 키, 내용은 비어 있음
수신 주소               contact@lunarflux.ai (Web3Forms 계정에 등록된 주소)
```

### 여기서 걸렸던 것 — 다음에 또 만나면

**대시보드에서 등록한 줄 알았는데 실제로는 비어 있었습니다.** 배포는 정상인데
계속 `503 unconfigured` 가 나와서, 아래 명령으로 production·preview 양쪽 모두
비어 있는 것을 확인하고 나서야 원인을 잡았습니다.

```bash
npx wrangler pages secret list --project-name lunarflux
npx wrangler pages secret list --project-name lunarflux --env preview
```

대시보드 입력은 하단 **Save** 를 놓치기 쉽습니다. CLI 쪽이 결과가 명확합니다.

```bash
# 값을 명령문에 노출하지 않으려면 파일에서 읽어 파이프로 넘깁니다
(Get-Item "_input/92*.txt").BaseName | npx wrangler pages secret put WEB3FORMS_ACCESS_KEY --project-name lunarflux
```

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
# 200 {"ok":true} + 메일 도착이면 완료. 첫 발송은 스팸함에 들어갈 수 있습니다.
```

### 다른 경로도 코드에 남아 있습니다 (미사용)

`ZEPTOMAIL_TOKEN` · `RESEND_API_KEY` · `ADMIN_NOTIFY_WEBHOOK` 분기는 그대로
살아 있습니다. 시크릿만 추가하면 코드 수정 없이 병행 발송됩니다.

> **웹훅(Slack·Discord)은 의도적으로 쓰지 않기로 했습니다** (2026-08-08 결정).
> 폰 푸시 알림이 필요해지면 그때 `ADMIN_NOTIFY_WEBHOOK` 만 등록하면 됩니다.
> 그전까지는 다시 권하지 마세요.

**알아둘 점** — Web3Forms 무료 플랜은 **이메일 발송만** 됩니다. 웹훅·Slack·Discord
연동, `ccemail`, 첨부파일은 전부 PRO 기능입니다.

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
  — 제목·설명만 붙고 **이미지는 빠져 있었습니다.** 2026-08-08 에 보강했습니다(아래 참고).
- `npm audit` high 3건 해소 → `found 0 vulnerabilities` (`45d49be`)

---

## 4. 알아 두면 좋은 것

### 이 저장소에서 주의할 점

- **`globals.css` 에 전역 리셋을 다시 쓰지 마세요.** 2번 ①번 항목 참고.
- **CSS 주석 안에 별표+슬래시를 붙여 쓰면 주석이 거기서 끝납니다.**
  `p-*/px-*` 라고 적었다가 dev 서버가 500 을 냈습니다 (`9dddb0f`).
  프로덕션 빌드는 통과해서 Turbopack 만 잡아냅니다.
- **`SITE_VERIFICATION.naver` 를 지우지 마세요.** 지우면 네이버 인증이 끊깁니다.
- **`metadata.openGraph` 는 필드 단위로 합쳐지지 않고 통째로 대체됩니다.**
  페이지가 `openGraph` 를 정의하는 순간 루트 레이아웃 것은 상속되지 않습니다.
  `images` 를 빼면 홈 이미지가 상속되는 게 아니라 `og:image` 자체가 사라집니다.
  실제로 홈을 뺀 20개 페이지가 썸네일 없이 나가고 있었습니다. `lib/seo.ts` 의
  `OG_IMAGE` 를 두 헬퍼가 항상 붙이도록 해 뒀으니 새 헬퍼를 만들 때도 넣으세요.
- **라이브 `robots.txt` 앞에 Cloudflare 관리형 블록이 주입됩니다.** 저장소의
  `app/robots.ts` 결과 위에 `ClaudeBot`·`GPTBot`·`Google-Extended`·`CCBot` 등을
  `Disallow` 하는 블록이 붙습니다. Googlebot·Yeti 는 각자 그룹이 있어 검색
  색인에는 영향이 없습니다. 설정 위치는 Cloudflare → AI Crawl Control 이며
  저장소를 고쳐서는 바뀌지 않습니다.
- 구글은 **DNS TXT** 로 인증돼 있어 코드와 무관합니다. 메타태그를 더하면 중복입니다.
  `google-site-verification=QnuX6yTbHeAPL7CemB-JD07LDE5Po6sHyYqbiwgwbr8`
- 서비스 콘텐츠는 `lib/servicesData.ts` 단일 출처입니다. `Services.tsx` 가 따로
  들고 있던 중복은 제거했습니다.
- **`Services.tsx` 의 `PILLARS` 에는 수치가 문장으로 박혀 있습니다.** 축별 설명을
  채우면서 `servicesData` 의 `specs`·`highlights` 값(시그니처 51,977 · WAF 105규칙 ·
  딥페이크 95% · SOAR 50+ 등)을 문장으로 옮겨 적었습니다. 데이터에서 계산해 넣을
  수 있는 형태가 아니어서 의도적으로 중복시킨 것이니, **사양이 바뀌면 두 곳을 함께
  고쳐야 합니다.** 파일 상단 주석에도 같은 내용을 남겨 뒀습니다.
- `next dev` 가 `CLAUDE.md` 하단에 자기 안내 블록을, `next-env.d.ts` 에 dev 경로를
  자동으로 씁니다. 커밋 전에 확인하세요.
- **등장 애니메이션에 JS 를 다시 끌어들이지 마세요.** `.reveal` 을 `@supports`
  밖에서 숨기는 순간, 미지원 브라우저와 JS 실패 경로에서 본문이 영영 투명해집니다.
  예전에 그 구조였고 폴백 다섯 조각으로 떠받치고 있었습니다 (`globals.css` 주석 참고).
- `npm install` 시 `prepare` 스크립트가 `core.hooksPath` 를 `.githooks` 로 잡아
  줍니다(`scripts/setup-hooks.mjs`). git 저장소가 아니어도 설치가 깨지지 않도록
  실패를 삼킵니다 — 배포 빌드 컨테이너를 세우지 않기 위함입니다.

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

1. **다음 검색 등록** — https://register.search.daum.net (미등록 상태).
   `robots.txt` 의 `DaumOA: Allow: /` 는 확인했습니다. 등록 후 검토에 수 일~2주.
2. **Bing Webmaster Tools 등록** — `bingbot: Allow: /` 는 이미 열어 뒀는데 등록만
   안 돼 있습니다. https://www.bing.com/webmasters 에서 Search Console 가져오기로
   소유확인 없이 끝납니다.
3. **디자인 마무리** — 여백 버그 수정 이후 화면을 보고 다듬는 작업이 남았습니다.
   랙 비주얼 밝기·속도, 히어로 균형 등.
4. **Guard 미확정 2건**
   - HA·노드 이중화가 출시됐는지 (사양서엔 "로드맵" 으로 표기돼 사이트에서 뺐음)
   - 경쟁사 비교표를 넣을지 (순수 WAF 대비 차별점이 강력한데 비교 대상·값 필요)

### 마친 것 (재확인 불필요)

- **`sitemap.xml` 의 `lastmod`** (2026-08-08) — `new Date()` 를 쓰고 있어 배포할
  때마다 21개 URL 이 전부 "방금 수정됨" 으로 나갔습니다. 콘텐츠 수정일 기준으로
  바꿨습니다.

  ```
  lib/site.ts   CONTENT_LAST_MODIFIED = '2026-08-08'   ← 여기를 올립니다
  ```

  **내용을 고치는 배포에서는 이 값을 함께 올리세요.** 리팩터링·설정 변경처럼
  방문자가 보는 것이 그대로면 건드리지 않습니다. 페이지 하나만 바뀌었다면
  `STATIC_PAGES.lastModified` 나 `ServiceData.updated` 로 그 항목만 덮어씁니다
  (둘 다 선택 항목이고, 비우면 위 상수를 씁니다).

- **홈 `<h1>` 검색어화** (2026-08-08) — 서비스 18개는 `seoH1` 으로 고쳤는데(3번 ②)
  홈만 브랜드 문구로 남아 있었습니다.

  ```
  이전  AI 보안을 설계하고 / 직접 운영합니다
  현재  차세대 방화벽을 만들고 / AI 보안 관제까지 맡습니다
  ```

  배지가 `차세대 방화벽 · AI 보안 관제 · 클라우드 보안` 이라 h1 과 같은 말이
  두 번 나오게 돼, 배지는 `네트워크 · 클라우드 · AI 데이터 보안` 으로 옮겼습니다.
  **h1 은 줄당 10~11자를 넘기지 마세요** — `clamp` 최솟값 2.25rem 에서 좁은 화면이
  네 줄로 늘어집니다. `Hero.tsx` 주석에도 남겨 뒀습니다.

- **og:image 누락 수정** (2026-08-08) — 홈을 뺀 20개 페이지에 `og:image` 와
  `twitter:image` 가 아예 없어, 카톡·슬랙·블로그에 서비스 페이지를 공유하면
  썸네일이 안 떴습니다. `lib/seo.ts` 에 `OG_IMAGE` 를 두고 `serviceMetadata` ·
  `pageMetadata` 양쪽에 붙였습니다. 빌드 산출물 21개 페이지 전부에서 확인했습니다.
  원인은 4번의 `openGraph` 대체 항목 참고.

- **SEO 설정 점검** (2026-08-08) — 라이브에서 직접 확인했습니다. title·description·
  canonical 전 페이지, 네이버 소유확인 태그 생존, robots.txt 의 Googlebot·Yeti·
  bingbot·DaumOA Allow, sitemap 21개 URL, 홈 `WebSite`+`Organization`+`OfferCatalog`
  와 서비스 `Service`+`BreadcrumbList` 구조화 데이터, `trailingSlash` 와 canonical
  슬래시 일치까지 정상입니다. 남은 지적 사항은 위 5·6번입니다.

- **카테고리별 설명 보강** (2026-08-08, `97ff04b`) — 홈 "네 개의 축으로 지킵니다"
  네 카드가 제목·한 줄 요약·링크뿐이라 각 축이 무엇을 막는지 알 수 없었습니다.
  축마다 설명 문단과 핵심 3줄, 서비스 개수를 넣고 섹션 리드 문단을 추가했습니다.
  사이트맵 페이지의 6개 그룹에도 한 줄 설명을 붙였습니다.
  수치는 전부 `servicesData` 에 있던 값만 옮겼습니다 — 4번의 중복 주의 항목 참고.

- **`.reveal` JS 의존 제거** (2026-08-08) — CSS 스크롤 기반 애니메이션으로 교체.
  인라인 스크립트·`.js` 클래스·4초 타이머·IntersectionObserver·
  `suppressHydrationWarning` 이 전부 사라졌고, `app/page.tsx` 는 `'use client'` 가
  빠져 서버 컴포넌트가 됐습니다. 숨김 상태가 `@supports` 안에만 있어
  미지원 브라우저에서는 콘텐츠가 그냥 보입니다 — 실패 경로 자체가 없습니다.

- **네이버 서치어드바이저** (2026-08-08) — 소유확인 통과, `sitemap.xml` 제출,
  홈·`lunarflux-guard`·`contact` 수집 요청까지 완료. 색인 반영은 수 일 걸립니다.
  **`SITE_VERIFICATION.naver` 를 지우면 인증이 다시 끊깁니다.**
- **문의 폼** (2026-08-08) — 위 2번 참고.

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
| 문의 폼 발송 | Web3Forms (계정 `contact@lunarflux.ai`, 무료 플랜) |
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
