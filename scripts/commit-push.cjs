/**
 * 변경을 모두 스테이징한 뒤 커밋하고 푸시합니다.
 * 사용: node scripts/commit-push.cjs "커밋 메시지"
 * 메시지 생략 시: chore: update <ISO 날짜시간>
 */
const { spawnSync } = require('child_process')
const path = require('path')

const root = path.join(__dirname, '..')
process.chdir(root)

function git(args, inherit = true) {
  return spawnSync('git', args, {
    stdio: inherit ? 'inherit' : 'pipe',
    encoding: 'utf8',
    cwd: root,
  })
}

let message = process.argv.slice(2).join(' ').trim()
if (!message) {
  message = `chore: update ${new Date().toISOString().slice(0, 16)}`
}

let r = git(['add', '-A'])
if (r.status !== 0) process.exit(r.status ?? 1)

r = git(['status', '--porcelain'], false)
if (!r.stdout.trim()) {
  console.log('Nothing to commit, working tree clean.')
} else {
  r = git(['commit', '-m', message])
  if (r.status !== 0) process.exit(r.status ?? 1)
}

r = git(['push'])
if (r.status !== 0) {
  r = git(['push', '-u', 'origin', 'HEAD'])
  if (r.status !== 0) process.exit(r.status ?? 1)
}
