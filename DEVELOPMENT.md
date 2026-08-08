# LunarFlux 웹사이트 개발 내역 및 프로젝트 구조

## 1. 프로젝트 개요
- **프로젝트명**: LunarFlux AI 웹사이트 (`lunarfluxai`)
- **기술 스택**: Next.js 16.x (App Router), React 18, TypeScript, Tailwind CSS v4
- **빌드 방식**: 정적 사이트 내보내기 (`output: 'export'`)

## 2. 개발 내역
- **Next.js 16 App Router 마이그레이션 및 정적 내보내기 최적화**: 
  - `generateStaticParams`를 활용한 동적 라우트 정적 생성 처리 구조화
  - Route Handlers 등 동적 서버 런타임 기능을 배제하고 정적 생성 기반으로 구현
- **서비스 카테고리 및 상세 페이지 구축**:
  - AI 보안, DB 클러스터링, 무중단 시스템, 딥페이크 탐지 등 다양한 서비스 카테고리에 대한 개별 페이지 구축 (`app/services/*`)
  - 공통 `ServiceDetailPage` 컴포넌트를 이용한 레이아웃 및 디자인 통합
- **UI/UX 및 컴포넌트 모듈화**:
  - Tailwind CSS v4 기반의 유틸리티 클래스 스타일링 전면 적용
  - Hero, Nav, Footer, About, Pricing 등 페이지를 구성하는 모듈화된 UI 컴포넌트 분리 (`components/`)
  - 사용자 편의를 위한 UI 컴포넌트(상담 위젯, ScrollTop 등) 도입
- **SEO 최적화**:
  - `next-seo` 및 메타데이터 API를 활용한 페이지별 SEO 적용 (`lib/seo.ts`)
  - 검색엔진 노출 최적화를 위한 `sitemap.ts` 및 `robots.ts` 자동 생성 로직 구현
- **자동화 환경 구성**:
  - Git Hooks(`commit-push.ps1`, `commit-push.cjs` 등) 및 스크립트를 통한 소스 변경사항 자동 커밋/푸시 파이프라인 구성

## 3. 프로젝트 폴더 구조

```text
lunarflux-site/
├── .cursor/               # Cursor 에디터 전용 설정 및 Rules (Next.js 16 원칙, Git 자동화 등)
├── .githooks/             # Git 훅 디렉토리
├── app/                   # Next.js App Router 메인 디렉토리
│   ├── globals.css        # 전역 스타일시트 (Tailwind CSS v4 임포트)
│   ├── layout.tsx         # 최상위 Root Layout
│   ├── page.tsx           # 메인 홈페이지 뷰
│   ├── robots.ts          # SEO: robots.txt 생성
│   ├── sitemap.ts         # SEO: sitemap.xml 생성
│   └── services/          # 각 서비스별 상세 페이지 (정적 라우팅)
│       ├── ai-agent/
│       ├── ai-security/
│       ├── db-cluster/
│       ├── deepfake-detection/
│       ├── managed-service/
│       ├── network-security/
│       └── ...기타 서비스 라우트
├── components/            # 공통 및 재사용 가능한 React 컴포넌트
│   ├── About.tsx          # 회사 및 서비스 소개 섹션
│   ├── EdgeSection.tsx    # 특정 기능 강조 섹션
│   ├── Footer.tsx         # 사이트 하단 푸터
│   ├── Hero.tsx           # 메인 최상단 히어로 섹션
│   ├── Nav.tsx            # 글로벌 네비게이션 바
│   ├── Pricing.tsx        # 가격 및 플랜 정책 안내
│   ├── ScrollTop.tsx      # 최상단 이동 버튼
│   ├── ServiceDetailPage.tsx # 서비스 상세 페이지 공통 레이아웃
│   └── Services.tsx       # 서비스 목록 개요 섹션
├── functions/             # Cloudflare Pages Functions (서버 측 엔드포인트)
│   └── api/contact.ts     # POST /api/contact — 문의 폼을 관리자 웹훅으로 중계
├── lib/                   # 전역 데이터, 타입 정의 및 비즈니스 로직
│   ├── app-types.ts       # 공통 TypeScript 인터페이스 선언
│   ├── seo.ts             # SEO 관련 설정 데이터
│   ├── servicesData.ts    # 서비스 목록 및 상세 내용을 담은 정적 데이터
│   └── site.ts            # 웹사이트 전역 설정 정보 (Title, URL 등)
├── public/                # 정적 에셋 파일 (이미지, 폰트, 아이콘 등)
├── scripts/               # 로컬 개발 및 배포 자동화를 돕는 스크립트 모음
│   ├── commit-push.cjs    # 자동 커밋/푸시 처리 Node 스크립트
│   ├── commit-push.ps1    # 자동 커밋/푸시 처리 PowerShell 스크립트
│   └── ensure-git-hooks.cjs # Git 훅 설정 보장 및 자동 등록 스크립트
├── package.json           # 프로젝트 의존성 모듈 및 npm 스크립트 선언
├── tailwind.config.js     # (Tailwind 설정 파일, v4 방식과 혼용 여부 확인 필요)
└── tsconfig.json          # TypeScript 컴파일러 설정 파일
```

## 4. 핵심 개발 가이드라인 (Rules)

1. **Server Component 원칙** 
   - 파일 상단에 `'use client'`가 없으면 기본적으로 서버 컴포넌트로 동작합니다.
   - 이벤트 핸들러, `useState` 등 브라우저 API가 필요한 경우에만 컴포넌트를 분리하여 `'use client'`를 선언합니다.

2. **메타데이터와 클라이언트 컴포넌트 분리**
   - `export const metadata`는 서버 컴포넌트에서만 사용 가능하므로, `'use client'` 지시어가 있는 파일 내에 함께 작성하지 않습니다.

3. **정적 내보내기 (Static Export) 최적화**
   - 현재 프로젝트는 `output: 'export'` 환경입니다.
   - 동적 라우트(`[slug]` 등)는 반드시 `generateStaticParams()`를 통해 빌드 시 사전에 정적으로 렌더링되도록 처리해야 합니다.

4. **스타일링 (Tailwind CSS v4)**
   - Tailwind 유틸리티 클래스를 주력으로 사용하여 스타일링합니다.
   - hover 효과 및 반응형 동작 등은 JS 이벤트 대신 가급적 Tailwind의 변형(variant) 속성을 활용합니다.
