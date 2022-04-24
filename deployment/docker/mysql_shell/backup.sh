#!/usr/bin/env bash

mysqldump -h $DATABASE_HOST -u $DATABASE_USER -p$DATABASE_PASSWORD --routines $DATABASE_NAME > backup.sql
gzip backup.sql
aws configure set aws_access_key_id $S3_ACCESS_KEY_ID
aws configure set aws_secret_access_key $S3_SECRET_ACCESS_KEY
aws s3 cp backup.sql.gz s3://fbpviewer/ --endpoint-url=$S3_ENDPOINT_URL
