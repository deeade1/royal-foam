#!/bin/bash
set -euo pipefail

# Environment variables with defaults
DB_HOST=${PGHOST:-royal-db}
DB_PORT=${PGPORT:-5432}
PORT=${PORT:-8000}

echo "==> Starting Backend Setup..."

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."


# Wait for database if needed
if [ "${DB_WAIT:-false}" = "true" ]; then
    echo "Waiting for database at $PGHOST:$PGPORT..."
    until nc -z "$PGHOST" "$PGPORT"; do
        sleep 2
    done
    
    echo "Database is ready!"
fi


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
