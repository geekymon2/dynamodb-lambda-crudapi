import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);
export const database_handler = async function (key) {
  let body = "OK";
  let statusCode = 200;

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (key) {
      case "SCAN":
        body = await dynamo.send(
          new ScanCommand({ TableName: "donationstbl_dev" })
        );
        body = body.Items;
        break;
      default:
        throw new Error(`Unsupported route: "${key}"`);
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
