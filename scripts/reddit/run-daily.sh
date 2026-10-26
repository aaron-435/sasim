#!/bin/bash
# Daily entry point, run by the Claude scheduled task "reddit-digest-daily" (launchd cannot read ~/Desktop).
# Runs the full digest once, logs to marketing/reddit/state/, and posts a macOS notification with the result.
# Extra args pass through, e.g. run-daily.sh --dry-run.
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/bin:/bin"
cd "$(dirname "$0")/../.." || exit 1
mkdir -p marketing/reddit/state
log="marketing/reddit/state/daily-$(date +%F).log"
{
  echo "=== $(date '+%F %T') start $*"
  npm run --silent reddit:digest -- "$@"
  code=$?
  echo "=== $(date '+%F %T') exit $code"
} >>"$log" 2>&1
file=$(grep -o 'marketing/reddit/digest/[^ ]*\.md' "$log" | tail -1)
if [ "${code:-1}" -eq 0 ]; then msg="요약 완료: ${file##*/}"; else msg="실패(exit $code), 로그: ${log##*/}"; fi
osascript -e "display notification \"$msg\" with title \"레딧 요약\"" >/dev/null 2>&1
exit "${code:-1}"
