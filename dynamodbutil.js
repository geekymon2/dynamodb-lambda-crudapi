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

export const DBOPERATIONS = Object.freeze({
  CREATE: Symbol("CREATE"),
  READ: Symbol("READ"),
  UPDATE: Symbol("UPDATE"),
  DELETE: Symbol("DELETE"),
  SCAN: Symbol("SCAN"),
});

export const database_handler = async function (DBOPERATIONS, tableName) {
  let body = "OK";
  let statusCode = 200;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (DBOPERATIONS.SCAN) {
      case DBOPERATIONS.SCAN:
        body = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = body.Items;
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
