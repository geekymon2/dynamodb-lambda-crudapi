echo "Cleanup packages if they exist"
del .\package\dynamodb-lambda-crudapi.zip 2>nul

echo "Build Lambda CRUD API Function"
call npm install --production
echo "Package Lambda CRUD API Function"
Rem "7zip is required to create a compressed archive"
7z a -tzip ./package/dynamodb-lambda-crudapi.zip package.json index.js src/ node_modules/

echo "Upload to S3"
aws s3 cp ./package/ s3://cf-templates-998/ --recursive
