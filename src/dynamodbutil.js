import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

export const database_handler_get_all = async function (tableName) {
  let body = "OK";
  const params = {
    TableName: tableName,
  };

  try {
    const scanResults = [];
    let items;
    do {
      items = await dynamo.send(new ScanCommand(params));
      items.Items.forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");
    body = scanResults;
  } catch (err) {
    body = err.message;
  }

  return body;
};

export const database_handler_create = async function (
  tableName,
  createDataJson
) {
  let body = "OK";

  try {
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: JSON.parse(createDataJson),
      })
    );
    body = `Created item ${createDataJson}`;
  } catch (err) {
    body = err.message;
  }

  return body;
};

export const database_handler_get = async function (tableName, id) {
  let body = "OK";

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
    body = err.message;
  }

  return body;
};
