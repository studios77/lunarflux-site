/**
 * git 훅 경로를 `.githooks` 로 지정합니다. `npm install` 시 자동 실행됩니다.
 *
 * `.githooks/pre-push` 가 푸시 전에 `npm run build` 로 빌드 실패를 잡아 주는데,
 * `core.hooksPath` 는 저장소별 로컬 설정이라 클론할 때마다 다시 지정해야 합니다.
 * 이 스크립트가 없으면 새로 클론한 사람은 검증 없이 프로덕션에 푸시하게 됩니다
 * (main 푸시가 곧 배포입니다).
 *
 * 실패해도 설치를 막지 않습니다. git 저장소가 아닌 환경(배포 빌드 컨테이너,
 * tarball 설치 등)에서도 `npm install` 은 그대로 성공해야 하기 때문입니다.
 * 훅은 로컬 편의 장치일 뿐이라, 없다고 설치를 세울 이유가 없습니다.
 */
import { execFileSync } from 'node:child_process'

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { stdio: 'ignore' })
} catch {
  // git 이 없거나 저장소가 아닙니다. 훅 검증 없이 진행합니다.
}
