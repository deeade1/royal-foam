#!/bin/bash
set -euo pipefail

# Environment variables with defaults
DB_HOST=${PGHOST:-royal-db}
DB_PORT=${PGPORT:-5432}
PORT=${PORT:-8000}

# Wait for database if needed
if [ "${DB_WAIT:-false}" = "true" ]; then
    echo "Waiting for database at $PGHOST:$PGPORT..."
    until nc -z "$PGHOST" "$PGPORT"; do
        sleep 2
    done
    
    echo "Database is ready!"
fi

# Run makemigrations if needed
if [ "${MAKE_MIGRATIONS:-false}" = "true" ]; then
    echo "Running makemigrations..."
    python manage.py makemigrations --no-input
fi

# Run migrations if needed
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
    echo "Running migrations..."
    python manage.py migrate --no-input
fi

# Collect static files if needed
if [ "${COLLECT_STATIC:-false}" = "true" ]; then
    echo "Collecting static files..."
    python manage.py collectstatic --no-input
fi

# Start Django development server with debugpy
echo "Starting Django server on port $PORT..."
exec python -m debugpy --listen 0.0.0.0:5678 \
    manage.py runserver 0.0.0.0:"$PORT" --noreload --verbosity 2
