#!/bin/bash
sh ./lambda_package.sh

echo "Upload to S3"
aws s3 cp ../package/ s3://cf-templates-900/ --recursive
