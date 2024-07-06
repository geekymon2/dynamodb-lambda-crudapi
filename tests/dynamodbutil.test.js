// sum.test.js
import { expect, test } from "vitest";
import { database_handler } from "../src/dynamodbutil.js";
import { DBOPERATION } from "../src/dynamodbutil.js";
import "dotenv/config";

test("Scan DynamoDB Table Test", async () => {
  const response = await database_handler(DBOPERATION.SCAN, "donationstbl_dev");
  console.log(response);
  expect(response.statusCode).toBe(200);
});

test("Create DynamoDB Table Item Test", async () => {
  const response = await database_handler(
    DBOPERATION.CREATE,
    "donationstbl_dev",
    '{ "id": "3", "amount": 297.05, "name": "Owen Poole", "suburb": "Loveland" }'
  );
  console.log(response);
  expect(response.statusCode).toBe(200);
});
