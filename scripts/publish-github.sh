#!/usr/bin/env bash
set -euo pipefail

readonly expected_owner='sedelval17'
readonly expected_repo='sedelval17/comadrejasalsacongress'
readonly expected_remote='https://github.com/sedelval17/comadrejasalsacongress.git'
readonly project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
readonly personal_config="${XDG_CONFIG_HOME:-$HOME/.config}/gh-comadreja-personal"
readonly gh_bin="${COMADREJA_GH_BIN:-gh}"

cd "$project_dir"
# Only the isolated personal login is used; never inherit another account's token.
unset GH_TOKEN GITHUB_TOKEN GH_ENTERPRISE_TOKEN GITHUB_ENTERPRISE_TOKEN
export GH_CONFIG_DIR="$personal_config"
export GIT_TERMINAL_PROMPT=0

actual_owner="$($gh_bin api user --jq .login)"
if [[ "$actual_owner" != "$expected_owner" ]]; then
  printf 'Publicación detenida: la sesión es %s; solo se permite %s.\n' "$actual_owner" "$expected_owner" >&2
  exit 1
fi
if [[ "$(git remote get-url origin)" != "$expected_remote" ]]; then
  printf 'Publicación detenida: el remoto no es el repositorio personal autorizado.\n' >&2
  exit 1
fi
if [[ -n "$(git status --porcelain)" ]]; then
  printf 'Publicación detenida: hay cambios sin incluir en el commit.\n' >&2
  exit 1
fi

if ! "$gh_bin" api "repos/$expected_repo" --silent 2>/dev/null; then
  "$gh_bin" repo create "$expected_repo" --public --description 'Revisión de Comadreja Salsa Congress 2026'
fi

git -c credential.helper= -c "credential.helper=!\"$gh_bin\" auth git-credential" push -u origin main

if ! "$gh_bin" api "repos/$expected_repo/pages" --silent 2>/dev/null; then
  "$gh_bin" api --method POST "repos/$expected_repo/pages" -f build_type=workflow
fi

# Enabling Pages after the first push may require an explicit workflow launch.
"$gh_bin" workflow run deploy.yml --repo "$expected_repo" --ref main
printf 'Workflow solicitado únicamente para %s.\n' "$expected_repo"
printf 'Verificar el resultado con: gh run list --repo %s --workflow deploy.yml\n' "$expected_repo"
