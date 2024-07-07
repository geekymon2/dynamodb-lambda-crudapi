echo "Cleanup packages if they exist"
del .\package\dynamodb-lambda-crudapi.zip 2>nul

echo "Build Lambda CRUD API Function"
call npm install
echo "Package Lambda CRUD API Function"
powershell Compress-Archive @('index.js', 'src', 'node_modules') package/dynamodb-lambda-crudapi.zip

echo "Upload to S3"
aws s3 cp ./package/ s3://cf-templates-998/ --recursive
