#!/bin/bash

# Sync env files securely
sync_env() {
  scp -o StrictHostKeyChecking=no .env.prod ubuntu@$EC2_IP:~/royal-foam/.env.prod
  scp -o StrictHostKeyChecking=no .env.prod.db ubuntu@$EC2_IP:~/royal-foam/.env.prod.db
}

# Generate new secrets
generate_secrets() {
  echo "SECRET_KEY=$(openssl rand -base64 48)" >> .env.prod
  echo "POSTGRES_PASSWORD=$(openssl rand -hex 32)" >> .env.prod.db
}

# Backup current env
backup_env() {
  cp .env.prod .env.prod.bak
  cp .env.prod.db .env.prod.db.bak
  cp .env.prod.nginx
}