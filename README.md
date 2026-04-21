# LunarFlux — AI Security & Streaming Infrastructure

공식 홈페이지: [lunarflux.al](https://lunarflux.al)

## 기술 스택
- **Framework**: Next.js 14 (Static Export)
- **Language**: TypeScript
- **Hosting**: Cloudflare Pages
- **Fonts**: Syne + IBM Plex Mono + Noto Sans KR

## 로컬 개발

```bash
npm install
npm run dev
# http://localhost:3000
```

## 빌드 & 배포

```bash
npm run build
# out/ 폴더 생성됨
```

Cloudflare Pages 설정:
- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Build output directory: `out`

## 프로젝트 구조

```
lunarflux-site/
├── app/
│   ├── layout.tsx      # 루트 레이아웃 + 메타데이터
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # 전역 스타일
├── components/
│   ├── Nav.tsx         # 네비게이션
│   ├── Hero.tsx        # 히어로 섹션
│   ├── Services.tsx    # 서비스 소개
│   ├── Pricing.tsx     # 요금제
│   ├── About.tsx       # 회사 소개 + 터미널
│   ├── Contact.tsx     # 문의 폼
│   └── Footer.tsx      # 푸터
├── public/             # 정적 파일
├── next.config.js      # Cloudflare Pages 정적 출력 설정
└── package.json
```

## 업데이트 방법

```bash
# 파일 수정 후
git add .
git commit -m "update: 변경 내용"
git push origin main
# → Cloudflare Pages 자동 배포 (1~2분)
```
