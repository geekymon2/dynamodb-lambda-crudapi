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
  CREATE: "CREATE",
  READ: "READ",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  SCAN: "SCAN",
});

export const database_handler = async function (
  operation,
  tableName,
  jsonData
) {
  let body = "OK";
  let statusCode = 200;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (operation) {
      case DBOPERATION.SCAN:
        body = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = body.Items;
        break;
      case DBOPERATION.CREATE:
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: JSON.parse(jsonData),
          })
        );
        body = `Created item ${jsonData}`;
        break;
      default: {
        statusCode = 400;
        body = `Unsupported operation: "${DBOPERATION}"`;
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
