#!/usr/bin/env bash

set -euo pipefail

if (( $# < 1 || $# > 4 )); then
    echo "Usage: $0 <github@host> [frontend-env] [backend-env] [storage-env]" >&2
    exit 1
fi

remote="$1"
remote_dir="/home/github/chat-ai"
frontend_env="${2:-.env}"
backend_env="${3:-../chat-ai-backend/.env.prod}"
storage_env="${4:-../chat-ai-backend/storage.env}"

for env_file in "$frontend_env" "$backend_env" "$storage_env"; do
    if [[ ! -f "$env_file" ]]; then
        echo "Env file not found: $env_file" >&2
        exit 1
    fi
done

if [[ "$(ssh "$remote" "id -un")" != "github" ]]; then
    echo "Remote SSH user must be github" >&2
    exit 1
fi

ssh "$remote" "mkdir -p '$remote_dir' && chmod 700 '$remote_dir'"
scp "$frontend_env" "$remote:$remote_dir/frontend.env"
scp "$backend_env" "$remote:$remote_dir/backend.env"
scp "$storage_env" "$remote:$remote_dir/storage.env"
ssh "$remote" "chmod 600 '$remote_dir/frontend.env' '$remote_dir/backend.env' '$remote_dir/storage.env'"

echo "Environment files copied to $remote:$remote_dir"
