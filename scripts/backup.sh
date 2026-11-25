#!/usr/bin/env sh
set -eu
umask 077

: "${DATABASE_URL:?DATABASE_URL is required}"
BACKUP_DIR=${BACKUP_DIR:-/data/backups}
UPLOADS_DIR=${LOCAL_STORAGE_DIR:-/data/uploads}
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
TARGET="$BACKUP_DIR/$STAMP"

mkdir -p "$TARGET"
pg_dump --format=custom --no-owner --no-privileges --file="$TARGET/database.dump" "$DATABASE_URL"
if [ -d "$UPLOADS_DIR" ] && [ "$(find "$UPLOADS_DIR" -mindepth 1 -maxdepth 1 | head -n 1)" ]; then
  tar -czf "$TARGET/uploads.tar.gz" -C "$UPLOADS_DIR" .
fi
(
  cd "$TARGET"
  sha256sum ./* > SHA256SUMS
)
printf 'Backup created: %s\n' "$TARGET"
