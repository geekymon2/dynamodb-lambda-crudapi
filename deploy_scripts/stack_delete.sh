#!/bin/bash
ENV=$1

if [ -z "$ENV" ]; then
    echo "Usage: ./stack_delete.sh <ENV>"
    exit 1
fi

aws cloudformation delete-stack --stack-name dynamo-crud-api-$ENV