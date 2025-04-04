#!/bin/bash
cd /home/ubuntu/royal-foam || exit
git pull origin main
docker compose -f compose.prod.yaml down
docker compose -f compose.prod.yaml up -d --build
