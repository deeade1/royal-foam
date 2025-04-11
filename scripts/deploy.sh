#!/bin/bash
docker compose -f compose.prod.yaml down
docker compose -f compose.prod.yaml up --build -d
docker system prune -fs