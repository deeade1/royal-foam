#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_FILE="/backups/db_${DATE}.dump"

docker exec royal-db pg_dump -U $POSTGRES_USER -Fc $POSTGRES_DB > $BACKUP_FILE
aws s3 cp $BACKUP_FILE s3://your-bucket/db-backups/
find /backups -type f -mtime +7 -delete