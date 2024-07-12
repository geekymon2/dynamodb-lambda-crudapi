#!/bin/bash
ENV=$1

if [ -z "$ENV" ]; then
    echo "Usage: ./stack_create.sh <ENV> <Optional flag to copy lambdas to bucket. Y/N>"
    exit 1
fi

LAMBDA_BUCKET=cf-templates-900
STACK_NAME="dynamo-crud-api-$ENV"

echo "Deploying a new stack for Environment: $ENV, Stack Name: $STACK_NAME"

aws s3 cp ../cloudformation/template.yaml s3://$LAMBDA_BUCKET/template.yaml
if [$2 == Y] lambda_upload.sh

aws cloudformation create-stack --stack-name $STACK_NAME --template-url https://$LAMBDA_BUCKET.s3.ap-southeast-2.amazonaws.com/template.yaml --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM --parameters ParameterKey=Env,ParameterValue=$ENV

goto :done

:error
echo "Please specify environment code e.g. dev, test, prod"
exit

:done
echo "Done"