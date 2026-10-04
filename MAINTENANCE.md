# 홈페이지 리뉴얼 모드 — 복구 안내

현재 사이트는 **리뉴얼 모드**입니다. 되돌리는 방법을 적어 둡니다.
리뉴얼이 끝나면 **이 파일도 함께 지우세요.**

| | |
|---|---|
| 적용일 | 2026-08-09 (`8f54447`, `e5df611`) |
| 상태 | 21개 페이지 전부 = 리뉴얼 안내 한 장 + `noindex` |
| 공개 연락처 | `contact@lunarflux.ai` 하나 (전화·주소·사업자등록번호 비공개) |

---

## 복구는 한 줄이면 됩니다

### 1. 플래그 끄기

```ts
// lib/site.ts
export const MAINTENANCE = false   // true → false
```

이 한 줄이 아래를 한꺼번에 되돌립니다. **개별 파일을 손댈 필요가 없습니다.**

| 파일 | 돌아오는 것 |
|---|---|
| `app/page.tsx` | 홈 본문(Hero·Flagship·Services·ClosingCta)과 JSON-LD |
| `components/ServiceDetailPage.tsx` | 서비스 상세 18개 전부 |
| `app/contact/page.tsx` | 문의 폼·전화번호 |
| `app/sitemap-page/page.tsx` | 전체 서비스 목록 |
| `app/layout.tsx` | 원래 제목·설명·키워드, canonical, `index, follow`, 상담 위젯 |
| `lib/seo.ts` | 페이지별 제목·설명·canonical·OG |
| `app/robots.ts` | `robots.txt` 의 사이트맵 선언 |
| `app/sitemap.ts` | `sitemap.xml` 의 21개 URL |

> **차단은 코드로 합니다. Cloudflare 설정에 기대지 마세요.**
> 처음에는 `public/_redirects` 로 막으려 했고 두 번 실패했습니다.
>
> - `302` 리다이렉트 — 검색엔진이 "임시 이동" 으로 읽어 **원래 URL 을 색인에
>   그대로 유지**합니다. 리다이렉트 응답에는 HTML 이 없어 `noindex` 를 읽을
>   기회조차 없습니다. 내리려고 넣은 규칙이 오히려 붙잡아 뒀습니다.
> - `200` 재작성 — **정적 파일이 우선이라 아예 무시됩니다.** 실제 서비스 페이지
>   HTML 이 그대로 응답돼 상세 내용이 전부 열렸습니다.
>
> 지금은 각 페이지 컴포넌트가 리뉴얼 안내를 반환합니다. 서비스 내용이 HTML 에
> 담기지 않으므로 주소를 직접 쳐도 볼 수 없고, 같은 URL 이 `200` + `noindex` 로
> 응답해 색인에서도 내려갑니다. `npm run dev` 에서도 똑같이 동작합니다.

### 2. 콘텐츠 수정일 올리기

```ts
// lib/site.ts
export const CONTENT_LAST_MODIFIED = '2026-08-09'   // 복구한 날짜로
```

`sitemap.xml` 의 `lastmod` 입니다. 내용이 실제로 바뀌는 배포이므로 함께 올립니다.

### 3. 배포

```bash
npm run build          # 로컬 확인
git add -A && git commit -m "feat: 리뉴얼 모드 해제, 사이트 원상 복구"
git push origin main   # Cloudflare Pages 자동 배포, 1~3분
```

---

## 복구 후 확인

아래 다섯 가지가 복구 상태의 기준입니다. **실제로 끄고 빌드해 확인한 값**입니다.

```bash
npm run build && cd out

grep -o '<title>[^<]*</title>' index.html      # 차세대 방화벽 · AI 보안 관제 …
grep -o 'content="index, follow"' index.html   # noindex 가 아니어야 함
grep -c 'application/ld+json' index.html       # 1  (구조화 데이터 복귀)
grep -c '<url>' sitemap.xml                    # 21
grep -c '홈페이지 리뉴얼 중입니다' services/lunarflux-guard/index.html   # 0
```

라이브에서는 이것만 봐도 됩니다.

- https://lunarflux.ai — 원래 메인
- https://lunarflux.ai/services/lunarflux-guard/ — 리뉴얼 안내가 아니라 상세가 뜨는지
- https://lunarflux.ai/contact/ — 문의 폼이 뜨는지

> `404/index.html` 과 `_not-found/index.html` 에는 복구 후에도 `noindex` 가
> 남습니다. Next.js 가 not-found 에 기본으로 넣는 것이라 **정상입니다.**

---

## 검색 노출 되돌리기 (코드 밖의 일)

코드를 되돌려도 검색 결과는 바로 돌아오지 않습니다. 리뉴얼 기간에 `noindex` 를
읽은 검색엔진이 색인에서 내렸기 때문입니다. 재수집을 **요청**해야 빨라집니다.

1. **네이버 서치어드바이저** — https://searchadvisor.naver.com
   `sitemap.xml` 재제출 → 홈·`lunarflux-guard`·`contact` 수집 요청
2. **구글 서치콘솔** — https://search.google.com/search-console
   `sitemap.xml` 재제출 → URL 검사에서 홈 색인 요청

반영까지 수일~수주 걸립니다. 조급해하지 않아도 됩니다.

### 리뉴얼 중에 노출을 더 빨리 없애려면

기다리면 자연히 빠지지만(구글 수일~수주, 네이버 1~4주), 급하면 요청할 수
있습니다. **둘 다 복구 때 되돌리는 품이 드니** 꼭 필요할 때만 쓰세요.

- **구글 서치콘솔 → 삭제 → 임시 삭제** — 약 6개월간 결과에서 가립니다.
  색인 자체를 지우는 것이 아니라 가리는 것이라, 복구 후에는 요청을 취소해야
  합니다.
- **네이버 서치어드바이저 → 요청 → 웹 페이지 검색 제외** — 아래 주의 참고.

> **네이버에 "웹 페이지 검색 제외" 를 요청했다면 반드시 확인하세요.**
> 리뉴얼 중 노출을 빨리 없애려고 `요청 → 웹 페이지 검색 제외` 를 넣었을 수
> 있습니다. 그 경우 `noindex` 를 떼는 것만으로는 다시 올라오지 않습니다 —
> 같은 URL 에 **수집 요청을 다시** 넣어야 제외가 풀립니다. 복구했는데
> 네이버에만 안 나온다면 거의 이것입니다.
>
> 2026-08-09 시점에는 아직 요청하지 않은 상태입니다. 나중에 넣게 되면
> 날짜와 URL 을 여기에 적어 두세요.

---

## 건드리지 말 것

- **`SITE_VERIFICATION.naver`** — 리뉴얼 중에도 일부러 남겨 뒀습니다. 지우면
  네이버 소유확인이 끊겨 복구가 훨씬 번거로워집니다.
- **`components/Maintenance.tsx`** — 복구 후 당장은 안 쓰이지만, 다음에 또
  리뉴얼할 때 그대로 재사용합니다. 지우려면 `app/page.tsx` 의 import 도 함께
  정리해야 합니다.

## 리뉴얼 기간에 알아 둘 것

- **`robots.txt` 로 크롤링을 막지 않았습니다. 일부러입니다.** 검색 결과에서
  내려가게 하는 일은 `noindex` 가 합니다. `Disallow: /` 를 걸면 크롤러가
  페이지에 들어오지 못해 그 `noindex` 를 읽을 수 없고, 이미 색인된 URL 이
  제목만 남은 채 검색 결과에 계속 머무릅니다. 빼려고 막는 것이 못 빼게
  만듭니다. 리뉴얼이 길어져도 이 설정은 그대로 두세요.
- **`_redirects` 는 로컬에서 검증되지 않습니다.** Cloudflare Pages 기능이라
  `npm run dev` 나 정적 서버에서는 동작하지 않습니다. 배포 후에 확인하세요.
- **상담 위젯(Zoho SalesIQ)은 리뉴얼 중 꺼져 있습니다.** 안내 화면이 이메일로
  연락을 청하는데 채팅창까지 띄우면 말이 엇갈리고, 아무도 보지 않는 채팅은
  없는 것보다 나쁩니다. 플래그를 끄면 자동으로 돌아옵니다.
- **21개 라우트는 계속 빌드됩니다.** 다만 전부 같은 리뉴얼 안내를 담습니다.
  라우트를 없앤 것이 아니라 내용을 바꾼 것이므로, 주소는 404 가 아니라 200 으로
  응답합니다. 검색엔진이 그 자리에서 `noindex` 를 읽어야 색인에서 내려갑니다.
- **리뉴얼 중에는 `canonical` 을 내보내지 않습니다.** 21개 주소가 모두 같은
  내용을 응답하는데 canonical 이 `/` 를 가리키면 "이 URL 은 색인하지
  말고(noindex) 저 URL 을 보라(canonical)" 는 모순된 지시가 됩니다. 구글이
  함께 쓰지 말라고 안내하는 조합이라 `noindex` 만 남겼습니다.
- **페이지별 제목·설명도 내보내지 않습니다.** `lib/seo.ts` 의 두 헬퍼가 빈 객체를
  반환해 루트 레이아웃의 리뉴얼 제목이 쓰입니다. 본문이 안내 한 장인데 제목만
  서비스명으로 남으면 검색 결과와 공유 카드가 실제 내용과 어긋납니다.
