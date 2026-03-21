#!/usr/bin/env bash
# Push only admin-dashboard2 to a GitHub repo. Always use a commit message.
# Run from ao-horoscope root:
#   ./scripts/push-admin-dashboard2.sh [commit message]
#   ./scripts/push-admin-dashboard2.sh "https://github.com/user/repo.git" [commit message]
#
# Default repo: https://github.com/dipennapit123/admindashboard.git

set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_REPO="${1:-https://github.com/dipennapit123/admindashboard.git}"
COMMIT_MSG="${2:-Sync admin-dashboard2}"
BRANCH="main"
WORK_DIR="${REPO_ROOT}/.deploy-push"

# If first arg looks like a URL, use it as repo and second arg as message
if [[ "$TARGET_REPO" == https://* ]] || [[ "$TARGET_REPO" == git@* ]]; then
  COMMIT_MSG="${2:-Sync admin-dashboard2}"
else
  COMMIT_MSG="$TARGET_REPO"
  TARGET_REPO="https://github.com/dipennapit123/admindashboard.git"
fi

cd "$REPO_ROOT"
if [ ! -d "admin-dashboard2" ]; then
  echo "Error: admin-dashboard2/ not found. Run from ao-horoscope root."
  exit 1
fi

[ -d "$WORK_DIR" ] && rm -rf "$WORK_DIR"
git clone --depth 1 "$TARGET_REPO" "$WORK_DIR"
cd "$WORK_DIR"
git checkout -b "$BRANCH" 2>/dev/null || git checkout "$BRANCH" 2>/dev/null || true

# Only admin-dashboard2 in repo: remove everything except .git
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

rsync -a \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.env \
  --exclude='.env.*' \
  --exclude=.vercel \
  --exclude=.clerk \
  "$REPO_ROOT/admin-dashboard2/" .

git remote set-url origin "$TARGET_REPO"
git add -A
if git diff --staged --quiet; then
  echo "No changes to push."
  rm -rf "$WORK_DIR"
  exit 0
fi
git commit -m "$COMMIT_MSG"
git push -u origin "$BRANCH"
rm -rf "$WORK_DIR"
echo "Pushed admin-dashboard2 to $TARGET_REPO ($BRANCH)."
