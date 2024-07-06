import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  CreateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

export const DBOPERATION = Object.freeze({
  CREATE: Symbol("CREATE"),
  READ: Symbol("READ"),
  UPDATE: Symbol("UPDATE"),
  DELETE: Symbol("DELETE"),
  SCAN: Symbol("SCAN"),
});

export const database_handler = async function (
  DBOPERATION,
  tableName,
  jsonData
) {
  let body = "OK";
  let statusCode = 200;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (DBOPERATION.SCAN) {
      case DBOPERATION.SCAN:
        body = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = body.Items;
        break;
      case DBOPERATION.CREATE:
        response = await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: jsonData,
          })
        );
        console.log(response);
        body = `Created item ${jsonData}`;
        break;
      default: {
        statusCode = 400;
        body = `Unsupported operation: "${key}"`;
      }
    }
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
