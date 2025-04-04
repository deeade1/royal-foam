# Production optimized multi-stage build
ARG PYTHON_VERSION=3.13.2-slim-bookworm 

# Builder stage
FROM python:${PYTHON_VERSION} as builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HOME=/home/apps \
    APP_HOME=/home/apps/backend

WORKDIR $APP_HOME

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        python3-dev \
        libpq-dev \
        libgeos-dev \
        libproj-dev \
        && rm -rf /var/lib/apt/lists/*

# Create wheels for all dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip wheel && \
    pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt

# Runtime stage
FROM python:${PYTHON_VERSION}-slim as runtime

ENV ENVIRONMENT=production \
    WORKERS=${WORKERS:-4} \
    THREADS=${THREADS:-2} \
    LOG_LEVEL=info \
    PATH="/home/apps/.local/bin:${PATH}" \
    PYTHONOPTIMIZE=1

WORKDIR $APP_HOME

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libpq5 \
        libgeos-c1v5 \
        libproj25 \
        && rm -rf /var/lib/apt/lists/*

# Copy and install wheels
COPY --from=builder /wheels /wheels
COPY --from=builder $APP_HOME/requirements.txt .
RUN pip install --no-cache-dir /wheels/* && \
    rm -rf /wheels

# Create non-root user and directories
RUN addgroup --gid 1001 app && \
    adduser --uid 1001 --ingroup app --no-create-home --shell /bin/false app && \
    mkdir -p $APP_HOME/static $APP_HOME/media && \
    chown -R app:app $APP_HOME

# Copy application code
COPY --chown=app:app . .

# Production entrypoint
COPY docker/prod-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && \
    dos2unix /entrypoint.sh

USER app

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:8000/health/ || exit 1

ENTRYPOINT ["/entrypoint.sh"]