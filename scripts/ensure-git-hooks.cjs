/**
 * npm install 시 prepare에서 실행됩니다.
 * 이 저장소의 Git 훅 경로를 .githooks 로 설정합니다 (CI·비 Git 환경에서는 무시).
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
if (process.env.CI === 'true' || process.env.CI === '1') process.exit(0)
if (!fs.existsSync(path.join(root, '.git'))) process.exit(0)

try {
  execSync('git config core.hooksPath .githooks', { cwd: root, stdio: 'inherit' })
  console.log('[prepare] Git hooksPath → .githooks')
} catch {
  // git 없거나 권한 문제 시 설치는 계속되도록 종료만
}
