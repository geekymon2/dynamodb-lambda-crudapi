#!/bin/bash
sh ./lambda_package.sh

echo "Deploy to AWS Lambda"
aws lambda update-function-code --function-name dynamodb-lambda-crudapi --zip-file fileb://../package/dynamodb-lambda-crudapi.zip