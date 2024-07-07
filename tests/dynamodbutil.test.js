// sum.test.js
import { expect, test } from "vitest";
import {
  database_handler_create,
  database_handler_get,
  database_handler_get_all,
} from "../src/dynamodbutil.js";
import "dotenv/config";
import { readFile } from "fs/promises";

test("Testing Get all data from DynamoDB Table", async () => {
  const params = {
    TableName: "donationstbl_dev",
    ProjectionExpression: "contributorname, balance, suburb, containsProfanity",
    FilterExpression: "#flag = :flag",
    ExpressionAttributeNames: {
      "#flag": "containsProfanity",
    },
    ExpressionAttributeValues: {
      ":flag": false,
    },
  };

  const response = await database_handler_get_all(params);
  console.log(response);
  console.log(response.length);
  expect(response).length > 1;
});

test("Testing Create DynamoDB Table Item", async () => {
  const response = await database_handler_create(
    "donationstbl_dev",
    '{ "id": "4", "amount": 297.05, "name": "Owen Poole", "suburb": "Loveland" }'
  );
  console.log(response);
  expect(response.includes("Owen Poole"));
});

test("Testing Get item from DynamoDB Table", async () => {
  const response = await database_handler_get("donationstbl_dev", "4");
  console.log(response);
  expect(response.id).toBe("4");
});

test("Load test data and populate DynamoDB Table", async () => {
  let data = JSON.parse(await readFile("./tests/test_data.json", "utf8"));
  console.log(`Total records in test data: ${data.length}`);

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    const response = await database_handler_create(
      "donationstbl_dev",
      JSON.stringify(obj)
    );
    console.log(response);
    expect(response.includes("Created item"));
  }
}, 300000);
