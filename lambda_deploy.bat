echo "Cleanup packages if they exist"
del .\package\dynamodb-lambda-crudapi.zip 2>nul

echo "Build Lambda CRUD API Function"
call npm install --production
echo "Package Lambda CRUD API Function"
powershell Compress-Archive @('package.json', 'index.js', 'src', 'node_modules') package/dynamodb-lambda-crudapi.zip

echo "Deploy to AWS Lambda"
aws lambda update-function-code --function-name dynamodb-lambda-crudapi --zip-file fileb://package/dynamodb-lambda-crudapi.zip