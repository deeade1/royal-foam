# ========= 🔧 Stage 1: Builder =========
# Declare ARG before first FROM (global scope)
ARG PYTHON_VERSION=3.12-slim-bookworm

FROM python:${PYTHON_VERSION} AS builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    libgeos-dev \
    libproj-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only requirements for caching
#COPY requirements.txt .
COPY ./requirements.txt .


# Install pip & wheel
RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# ========= 🏃‍♂️ Stage 2: Runtime =========
FROM python:${PYTHON_VERSION}

# Environment variables for Python runtime
ENV ENVIRONMENT=production \
    PYTHONOPTIMIZE=1 \
    PATH="/home/app/.local/bin:$PATH"

# Set a non-root user
RUN addgroup --gid 1001 app && \
    adduser --disabled-password --uid 1001 --ingroup app --no-create-home --shell /usr/sbin/nologin app


# Install only runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    libgeos-c1v5 \
    libproj25 \
    postgresql-client \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory and copy files
ENV APP_HOME=/home/app/backend
WORKDIR $APP_HOME

# Copy installed wheels from builder and install
COPY --from=builder /wheels /wheels
COPY --from=builder /app/requirements.txt .

RUN pip install --no-cache-dir --no-warn-script-location /wheels/* && rm -rf /wheels

# Create static/media folders and adjust ownership
RUN mkdir -p $APP_HOME/static $APP_HOME/media && \
    chown -R app:app $APP_HOME

# Copy application code
COPY --chown=app:app . .

# Add and configure entrypoint

COPY ./entrypoint.prod.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && \
    sed -i 's/\r$//' /entrypoint.sh  # Removes Windows line endings

USER app

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:8000/health/ || exit 1

# Entrypoint
ENTRYPOINT ["/entrypoint.sh"]