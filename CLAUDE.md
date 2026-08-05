# LunarFlux AI — 프로젝트 가이드

Next.js 16.x / App Router / `output: 'export'` (정적 내보내기) 기반 회사 웹사이트입니다.
서버 런타임이 없으므로 모든 페이지는 빌드 시점에 정적 생성됩니다.

## 명령어

```bash
npm run dev     # 개발 서버 (http://localhost:3000)
npm run build   # 프로덕션 빌드 → out/ 생성
```

`npm start`는 정적 내보내기 환경에서 사용하지 않습니다.

## 아키텍처

```
app/                  App Router 라우트 (page.tsx, layout.tsx, robots.ts, sitemap.ts)
  services/<slug>/    서비스별 상세 페이지 — 각 디렉터리에 page.tsx
components/           재사용 UI 컴포넌트 (Hero, Nav, Footer, ServiceDetailPage 등)
lib/
  servicesData.ts     서비스 목록·상세 내용 정적 데이터 (콘텐츠의 단일 출처)
  app-types.ts        공통 타입 선언
  seo.ts              SEO 설정 데이터
  site.ts             사이트 전역 설정 (title, URL 등)
public/               정적 에셋
```

서비스 상세 페이지는 각 라우트가 공통 `ServiceDetailPage` 컴포넌트에 데이터를 넘기는 구조입니다.
서비스 콘텐츠를 바꿀 때는 개별 `page.tsx`가 아니라 `lib/servicesData.ts`를 먼저 확인하세요.

## Framework 규칙

- **App Router 전용.** `pages/` 디렉터리, `getServerSideProps`, `getStaticProps`는 사용하지 않으며 새로 추가하지 않습니다.
- 기본은 **Server Component.** `'use client'`는 `useState` / `useEffect` / `useRef` / 브라우저 API / 이벤트 핸들러가 필요할 때만 추가합니다.
- **`export const metadata`와 `'use client'`는 같은 파일에 둘 수 없습니다.** 메타데이터는 서버 컴포넌트(`page.tsx`)에, 인터랙션은 별도 클라이언트 컴포넌트로 분리합니다.

```tsx
// ❌ 빌드 실패
'use client'
export const metadata = { title: '...' }

// ✅ 분리
// page.tsx (Server Component)
export const metadata = { title: '...' }
import ClientSection from './ClientSection'
export default function Page() { return <ClientSection /> }

// ClientSection.tsx
'use client'
export default function ClientSection() { /* useState 등 */ }
```

## 정적 내보내기 제약

`output: 'export'` 환경에서 아래를 위반하면 **빌드가 실패합니다.**

- 동적 라우트(`[slug]`)는 `generateStaticParams()`를 반드시 정의
- `useSearchParams()`는 `<Suspense>`로 감싸기
- Route Handlers(`route.ts`)와 Middleware는 동작하지 않음 — 사용 금지
- `next/image` 최적화 불가 (`images.unoptimized: true`) — 일반 `<img>` 또는 외부 이미지 CDN 사용

## TypeScript

- `strict: true`. 공개 API와 컴포넌트 props에는 타입을 명시합니다.
- 경로 별칭은 `@/*` → 저장소 루트.
- 서비스 슬러그를 임의의 `string`으로 다루지 말고 `lib/app-types` · `lib/servicesData`의 `ServiceSlug`, `SERVICE_SLUGS`, `getServiceBySlug` / `findServiceBySlug`를 사용합니다.

## 스타일링

- **Tailwind CSS v4** 유틸리티 클래스가 기본 수단. `app/globals.css`에서 `@import "tailwindcss"`로 임포트됩니다.
- `:root` CSS 변수는 Tailwind와 병행 사용 가능합니다.
- hover / focus 효과는 JS 이벤트 핸들러 대신 Tailwind `hover:` 변형을 사용합니다.
- 계산된 동적 값에는 인라인 `style` prop을 써도 됩니다 (예: `style={{ width: progress + '%' }}`).

## 라우팅

- 내부 이동: `next/link`의 `<Link href="...">`
- 프로그래밍 방식 이동: `next/navigation`의 `useRouter()` (`next/router` 아님)
- 외부 링크: `<a target="_blank" rel="noopener noreferrer">`

## SEO

페이지마다 메타데이터를 정의합니다. `app/sitemap.ts`와 `app/robots.ts`가 빌드 시 자동 생성됩니다.

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '페이지 제목 | LunarFlux AI',
  description: '페이지 설명',
  keywords: ['키워드1', '키워드2'],
  openGraph: { title: '...', description: '...', images: ['/og.png'] },
}
```

## 배포

```
로컬 → git push origin main → GitHub(studios77/lunarflux-site) → Cloudflare Pages(lunarflux) → lunarflux.ai
```

- `main` 브랜치에 푸시하면 **Cloudflare Pages가 자동으로 빌드·배포**합니다. 빌드는 Cloudflare 서버에서 수행되며, 로컬 빌드 산출물(`out/`)은 업로드되지 않습니다.
- 빌드 명령과 출력 디렉터리 설정은 저장소가 아니라 [Cloudflare 대시보드](https://dash.cloudflare.com/0b60a547abf5ee6413207b3c7ca2e7cc/pages/view/lunarflux)에 있습니다.
- `.githooks/pre-push`가 푸시 전에 `npm run build`를 실행해 빌드 실패를 미리 잡습니다. 훅이 동작하려면 `core.hooksPath`가 `.githooks`로 설정되어 있어야 합니다.

```bash
git config core.hooksPath .githooks   # 저장소를 새로 클론한 경우 1회 실행
```

- 커밋 메시지: 타입 접두사는 영문(`feat:` / `fix:` / `chore:` / `docs:`), 본문은 한국어. 예: `feat: 각 서비스 페이지 구조화된 데이터 삽입`

## 환경 변수

`.env.example` 참고. 현재 선택 항목 하나뿐이며 없어도 개발·빌드가 동작합니다.

- `ADMIN_NOTIFY_WEBHOOK` — 설정 시 문의 접수를 Slack/Discord 웹훅으로 전달

**`NEXT_PUBLIC_` 접두사를 붙이지 마세요.** 웹훅 URL은 비밀이며, `NEXT_PUBLIC_`은 값을 브라우저 번들에 그대로 노출시킵니다. 운영 값은 저장소가 아니라 Cloudflare Pages → lunarflux → Settings → Environment variables 에 **Secret**으로 등록합니다.

## Pages Functions

정적 내보내기라 Next.js Route Handler는 쓸 수 없지만, 저장소 루트의 `functions/` 디렉터리는 **Cloudflare Pages Functions**로 배포되어 서버 측 엔드포인트 역할을 합니다.

```
functions/api/contact.ts   POST /api/contact — 문의 폼을 관리자 웹훅으로 중계
```

`npm run dev`(Next 개발 서버)는 이 경로를 서빙하지 않습니다. 로컬 검증은 빌드 후 wrangler로 합니다.

```bash
npm run build
npx wrangler pages dev out --port 8788     # 비밀값은 .dev.vars 에 (gitignore 처리됨)
```

## 참고 문서

- Next.js 공식 문서: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app
- 정적 내보내기: https://nextjs.org/docs/app/guides/static-exports
