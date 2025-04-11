# ===============================
# Builder Stage: Build React/Vite Frontend
# ===============================
FROM node:23.6.1-slim AS builder

WORKDIR /apps/frontend

# Copy dependencies and install
COPY apps/frontend/package.json apps/frontend/package-lock.json ./
RUN npm ci --silent

# Copy source code
COPY apps/frontend/ .

# Build
RUN npm run build || (echo "Frontend build failed!" && exit 1)

# ===============================
# Final Stage: Serve with Nginx
# ===============================
FROM nginx:1.27.3-alpine-slim

WORKDIR /usr/share/nginx/html

# Copy built assets from builder
COPY --from=builder /apps/frontend/dist .

# Copy custom Nginx config
COPY apps/docker/frontend/nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf

# ✅ Fix permissions on nginx cache, run dir, lib dir, frontend files
RUN mkdir -p /var/cache/nginx /var/run/nginx /var/lib/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx /var/lib/nginx && \
    chmod -R 755 /var/cache/nginx /var/run/nginx /var/lib/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Secure Nginx config permissions
RUN chmod 644 /etc/nginx/conf.d/default.conf

#USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
