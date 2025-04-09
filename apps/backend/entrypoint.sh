#!/bin/bash
set -euo pipefail

# Wait for database if needed
if [ "${DB_WAIT:-false}" = "true" ]; then
    echo "Waiting for database..."
    timeout 60 bash -c 'until pg_isready -h $DB_HOST -p $DB_PORT; do sleep 2; done'
fi

# Run migrations if needed
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
    python manage.py migrate --no-input
fi

# Start Django development server with debugpy
exec python -m debugpy --listen 0.0.0.0:5678 \
    manage.py runserver 0.0.0.0:${PORT:-8000} --verbosity 2
