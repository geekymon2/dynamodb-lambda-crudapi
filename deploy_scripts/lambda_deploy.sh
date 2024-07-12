#!/bin/bash
ENV=$1

if [ -z "$ENV" ]; then
    echo "Usage: ./lambda_deploy.sh <ENV>"
    exit 1
fi

sh ./lambda_package.sh

echo "Deploy to AWS Lambda"
aws lambda update-function-code --function-name dynamodb-lambda-crudapi-$ENV --zip-file fileb://../package/dynamodb-lambda-crudapi.zip