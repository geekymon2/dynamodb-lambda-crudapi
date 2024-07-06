// sum.test.js
import { expect, test } from "vitest";
import { database_handler } from "../dynamodbutil.js";
import { DBOPERATIONS } from "../dynamodbutil.js";

test("Scan DynamoDB Table Test", async () => {
  const response = await database_handler(
    DBOPERATIONS.SCAN,
    "donationstbl_dev"
  );
  console.log(response);
  expect(response.statusCode).toBe(200);
});
