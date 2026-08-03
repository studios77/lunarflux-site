#!/usr/bin/env bash
# WSL의 tmux로 개발 세션을 띄웁니다.
#
# Windows에는 tmux가 없고, WSL에는 Node가 없습니다. node_modules도 Windows용
# 네이티브 바이너리로 설치되어 있어 WSL에서 직접 실행할 수 없습니다.
# 그래서 창 관리만 tmux가 하고, 실제 명령은 powershell.exe로 Windows 쪽에서 실행합니다.
#
#   실행:      wsl bash /mnt/c/Users/admin/lunarflux-site/scripts/dev-tmux.sh
#   다시 붙기:  wsl tmux attach -t lunarflux
#   종료:      wsl tmux kill-session -t lunarflux
set -e

SESSION=lunarflux
WIN_DIR='C:\Users\admin\lunarflux-site'

if ! command -v tmux >/dev/null; then
  echo "tmux가 없습니다. WSL에서 설치하세요:  sudo apt install -y tmux" >&2
  exit 1
fi

# powershell.exe를 해당 디렉터리에서 실행하고, 명령이 끝나도 창을 유지합니다.
run_win() {
  echo "powershell.exe -NoLogo -NoExit -Command \"Set-Location '${WIN_DIR}'; $1\""
}

if tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "기존 세션에 연결합니다."
  exec tmux attach -t "$SESSION"
fi

tmux new-session  -d -s "$SESSION" -n dev
tmux send-keys    -t "$SESSION:dev"   "$(run_win 'npm run dev')" C-m

tmux new-window   -t "$SESSION" -n pages
tmux send-keys    -t "$SESSION:pages" \
  "$(run_win 'if (-not (Test-Path out)) { npm run build }; npx wrangler pages dev out --port 8788')" C-m

tmux new-window   -t "$SESSION" -n shell
tmux send-keys    -t "$SESSION:shell" "$(run_win 'git status -sb')" C-m

tmux select-window -t "$SESSION:dev"

cat <<'EOF'

  창 이동      Ctrl+b → 0(dev) 1(pages) 2(shell)
  세션 분리    Ctrl+b → d
  다시 붙기    wsl tmux attach -t lunarflux

EOF

exec tmux attach -t "$SESSION"
