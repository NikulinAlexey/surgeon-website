#!/usr/bin/env sh
set -eu
umask 077

: "${RESTORE_DATABASE_URL:?Set RESTORE_DATABASE_URL to an empty target database}"
: "${BACKUP_PATH:?Set BACKUP_PATH to a backup directory}"
RESTORE_UPLOADS_DIR=${RESTORE_UPLOADS_DIR:-}

[ -f "$BACKUP_PATH/database.dump" ] || { echo "database.dump not found" >&2; exit 1; }
TABLE_COUNT=$(psql "$RESTORE_DATABASE_URL" -tAc "SELECT count(*) FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
[ "$TABLE_COUNT" = "0" ] || { echo "Target database is not empty; refusing to restore" >&2; exit 1; }

pg_restore --no-owner --no-privileges --dbname="$RESTORE_DATABASE_URL" "$BACKUP_PATH/database.dump"

if [ -n "$RESTORE_UPLOADS_DIR" ] && [ -f "$BACKUP_PATH/uploads.tar.gz" ]; then
  mkdir -p "$RESTORE_UPLOADS_DIR"
  [ -z "$(find "$RESTORE_UPLOADS_DIR" -mindepth 1 -maxdepth 1 | head -n 1)" ] || {
    echo "Target uploads directory is not empty; refusing to restore files" >&2
    exit 1
  }
  if tar -tzf "$BACKUP_PATH/uploads.tar.gz" | grep -E '(^/|(^|/)\.\.(/|$))' >/dev/null; then
    echo "Unsafe paths in uploads archive" >&2
    exit 1
  fi
  tar -xzf "$BACKUP_PATH/uploads.tar.gz" -C "$RESTORE_UPLOADS_DIR"
fi

printf 'Restore completed without dropping existing objects.\n'
