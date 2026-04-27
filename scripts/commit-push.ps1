# 사용: .\scripts\commit-push.ps1
#       .\scripts\commit-push.ps1 "커밋 메시지 한 줄"
param(
  [Parameter(Mandatory = $false, Position = 0)]
  [string] $Message = ""
)
if ($Message) {
  node "$PSScriptRoot\commit-push.cjs" $Message
} else {
  node "$PSScriptRoot\commit-push.cjs"
}
