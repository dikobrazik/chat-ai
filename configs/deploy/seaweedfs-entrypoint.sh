#!/bin/sh

set -eu

: "${S3_ACCESS_KEY_ID:?Set S3_ACCESS_KEY_ID in storage.env}"
: "${S3_SECRET_ACCESS_KEY:?Set S3_SECRET_ACCESS_KEY in storage.env}"
: "${USER_FILES_BUCKET_NAME:?Set USER_FILES_BUCKET_NAME in storage.env}"
: "${GENERATED_IMAGES_BUCKET_NAME:?Set GENERATED_IMAGES_BUCKET_NAME in storage.env}"

export AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY"
export S3_BUCKET="$USER_FILES_BUCKET_NAME,$GENERATED_IMAGES_BUCKET_NAME"

exec weed mini -dir=/data -ip=seaweedfs -ip.bind=0.0.0.0 \
    -webdav=false -admin.ui=false \
    -s3.port.iceberg=0 -s3.port.lance=0
