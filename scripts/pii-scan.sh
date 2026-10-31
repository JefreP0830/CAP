#!/usr/bin/env bash
# Blocks cadet data from entering the repo.
# Usage: scripts/pii-scan.sh            -> scans staged changes (pre-commit)
#        scripts/pii-scan.sh --all      -> scans every tracked file
#        scripts/pii-scan.sh --history  -> scans every commit ever made
set -euo pipefail
# Email addresses (excluding obvious placeholders) and 6-digit CAPID-like values
# in a data context (key/value, CSV-ish, or JSON).
EMAIL='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
EMAIL_OK='(example\.(com|org)|noreply@|@cap\.gov|users\.noreply\.github\.com|anthropic\.com)'
CAPID='("?capid"?[[:space:]]*[:=][[:space:]]*"?[0-9]{6}\b|^[0-9]{6},|,[0-9]{6},)'
BAD_EXT='\.(csv|xlsx?|xlsm|pdf)$'
BIN_EXT='\.(png|jpe?g|gif|ico|webp|woff2?)$'   # images/fonts: not scanned as text

fail=0
check_text() { # $1 = label, $2 = text  (no pipes into this function: a
  # subshell would lose the fail flag, which is the bug this replaced)
  local hits
  hits=$(printf '%s\n' "$2" | grep -nEi "$EMAIL" | grep -viE "$EMAIL_OK" || true)
  [ -n "$hits" ] && { echo "BLOCKED ($1): email address found"; echo "$hits" | head -5 | sed -E 's/'"$EMAIL"'/<email>/g'; fail=1; }
  return 0
}
mode=${1:-staged}
case "$mode" in
  staged)
    files=$(git diff --cached --name-only --diff-filter=ACM)
    for f in $files; do
      echo "$f" | grep -qiE "$BAD_EXT" && { echo "BLOCKED: data file type staged: $f"; fail=1; continue; }
      echo "$f" | grep -qiE "$BIN_EXT" && continue
      check_text "$f" "$(git show ":$f")"
      git show ":$f" | grep -qiE "$CAPID" && { echo "BLOCKED ($f): CAPID-like value found"; fail=1; }
    done ;;
  --all)
    for f in $(git ls-files); do
      echo "$f" | grep -qiE "$BAD_EXT" && { echo "BLOCKED: data file tracked: $f"; fail=1; continue; }
      echo "$f" | grep -qiE "$BIN_EXT" && continue
      check_text "$f" "$(cat "$f")"
      grep -qiE "$CAPID" "$f" && { echo "BLOCKED ($f): CAPID-like value found"; fail=1; }
    done ;;
  --history)
    check_text "history" "$(git log --all -p --no-color)"
    git log --all --name-only --pretty=format: | grep -iE "$BAD_EXT" && { echo "BLOCKED: data file in history"; fail=1; } || true
    git log --all -p --no-color | grep -qiE "$CAPID" && { echo "BLOCKED (history): CAPID-like value found"; fail=1; } || true ;;
esac
[ $fail -eq 0 ] && echo "pii-scan: clean ($mode)" || { echo "pii-scan: commit refused. Remove cadet data and try again."; exit 1; }
