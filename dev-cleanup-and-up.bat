@echo off
echo ========================================
echo   🚀 Stopping and removing containers...
echo ========================================
docker compose -f compose.prod.yaml down -v

echo ========================================
echo   🗑️  Removed all containers and volumes!
echo ========================================
echo   🔄 Rebuilding and starting services...
echo ========================================
docker compose -f compose.prod.yaml up -d --build

echo ========================================
echo   ✅ All services are up and running!
echo ========================================
echo   💡 Don't forget: Database is FRESH & EMPTY now!
pause
