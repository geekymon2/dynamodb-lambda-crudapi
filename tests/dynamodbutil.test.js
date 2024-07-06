// sum.test.js
import { expect, test } from "vitest";
import { database_handler } from "../dynamodbutil.js";

test("DB Scan", async () => {
  const response = await database_handler("SCAN");
  console.log(response);
  expect(response.statusCode).toBe(200);
});
