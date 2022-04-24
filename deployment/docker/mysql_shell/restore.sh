#!/usr/bin/env bash

aws configure set aws_access_key_id $S3_ACCESS_KEY_ID
aws configure set aws_secret_access_key $S3_SECRET_ACCESS_KEY
aws s3 cp s3://fbpviewer/backup.sql.gz ./backup.sql.gz --endpoint-url=$S3_ENDPOINT_URL
gunzip ./backup.sql.gz
mysql -h $DATABASE_HOST -u $DATABASE_USER -p$DATABASE_PASSWORD -D $DATABASE_NAME < backup.sql
