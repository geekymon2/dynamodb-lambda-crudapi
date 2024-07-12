#!/bin/bash

echo "Cleanup packages if they exist"
rm ../package/dynamodb-lambda-crudapi.zip 2>nul

echo "Build Lambda CRUD API Function"
npm install --production
echo "Packaging Lambda CRUD API Function"

#7zip is required to create a compressed archive
cd ..
7z a -tzip ./package/dynamodb-lambda-crudapi.zip package.json index.js src/ node_modules/