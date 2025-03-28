#!/bin/bash
set -euo pipefail

# Database initialization
if [ "${DB_ENABLED:-false}" = "true" ]; then
    echo "Waiting for database..."
    timeout 30 bash -c 'until pg_isready -h $DB_HOST -p $DB_PORT; do sleep 2; done'
    
    echo "Running migrations..."
    python manage.py migrate --no-input
    
    echo "Collecting static files..."
    python manage.py collectstatic --no-input --clear
fi

# Start Gunicorn
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers ${WORKERS:-4} \
    --threads ${THREADS:-2} \
    --timeout ${TIMEOUT:-120} \
    --log-level ${LOG_LEVEL:-info} \
    --access-logfile - \
    --error-logfile -