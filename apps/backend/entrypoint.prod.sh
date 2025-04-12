#!/bin/bash
set -euo pipefail

echo "==> Starting Backend Setup..."

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."

until pg_isready -h "${DB_HOST:-royal-db}" -p "${DB_PORT:-5432}" -U "${POSTGRES_USER:-royal-foam}"; do
  sleep 2
done


# Run Django setup commands
echo "Running Django migrations..."
python manage.py migrate --no-input

echo "Collecting static files..."
python manage.py collectstatic --no-input --clear

echo "==> Launching Gunicorn Server..."
exec gunicorn backend.wsgi:application \
  --bind 0.0.0.0:${PORT:-8000} \
  --workers ${GUNICORN_WORKERS:-4} \
  --threads ${GUNICORN_THREADS:-2} \
  --timeout ${TIMEOUT:-120} \
  --log-level ${LOG_LEVEL:-info} \
  --access-logfile - \
  --error-logfile -
