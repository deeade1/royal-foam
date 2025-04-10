# ========= 🔧 Stage 1: Builder =========
ARG PYTHON_VERSION=3.12-slim-bookworm
FROM python:${PYTHON_VERSION} AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    libgeos-dev \
    libproj-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# ========= 🏃‍♂️ Stage 2: Runtime =========
FROM python:${PYTHON_VERSION}

ENV ENVIRONMENT=production \
    PYTHONOPTIMIZE=1 \
    PATH="/home/app/.local/bin:$PATH"

RUN addgroup --gid 1001 app && \
    adduser --disabled-password --uid 1001 --ingroup app --no-create-home --shell /usr/sbin/nologin app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    libgeos-c1v5 \
    libproj25 \
    curl \
    && rm -rf /var/lib/apt/lists/*

ENV APP_HOME=/home/app/backend
WORKDIR $APP_HOME

COPY --from=builder /wheels /wheels
COPY --from=builder /app/requirements.txt .

RUN pip install --no-cache-dir --no-warn-script-location /wheels/* && rm -rf /wheels

RUN mkdir -p $APP_HOME/static $APP_HOME/media && \
    chown -R app:app $APP_HOME

COPY --chown=app:app . .

COPY entrypoint.prod.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && dos2unix /entrypoint.sh

USER app

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:8000/health/ || exit 1

ENTRYPOINT ["/entrypoint.sh"]
