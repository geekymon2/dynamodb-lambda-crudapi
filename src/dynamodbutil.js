import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

export const headers = {
  "Content-Type": "application/json",
};

export const database_handler_get_all = async function (tableName) {
  let body = "OK";
  let statusCode = 200;

  try {
    body = await dynamo.send(new ScanCommand({ TableName: tableName }));
    body = body.Items;
  } catch (err) {
    statusCode = 500;
    body = err.message;
  }

  return {
    statusCode,
    body,
    headers,
  };
};

export const database_handler_create = async function (
  tableName,
  createDataJson
) {
  let body = "OK";
  let statusCode = 200;

  try {
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: JSON.parse(createDataJson),
      })
    );
    body = `Created item ${createDataJson}`;
  } catch (err) {
    statusCode = 500;
    body = err.message;
  }

  return {
    statusCode,
    body,
    headers,
  };
};

export const database_handler_get = async function (tableName, id) {
  let body = "OK";
  let statusCode = 200;

  try {
    let response = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          id: id,
        },
      })
    );
    body = response.Item;
  } catch (err) {
    statusCode = 500;
    body = err.message;
  }

  return {
    statusCode,
    body,
    headers,
  };
};
