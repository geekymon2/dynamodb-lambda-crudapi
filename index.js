import { database_handler_get_all } from "./src/dynamodbutil.js";
import { database_handler_create } from "./src/dynamodbutil.js";
import { headers } from "./src/dynamodbutil.js";

export const DBOPERATION = Object.freeze({
  CREATE: "CREATE",
  READ: "READ",
  SCAN: "SCAN",
});

const tableName = process.env.TABLE_NAME;

export const lambda_handler = async function (event, context) {
  console.log("Running Lambda Handler for DynamoDB CRUD Operations");
  console.log(`Operation Key: ${event.key}`);

  if (event.key === undefined) {
    console.log(
      `key is undefined, setting default value to ${DBOPERATION.SCAN}`
    );
    event.routeKey = DBOPERATION.SCAN;
  }

  try {
    switch (event.key) {
      case DBOPERATION.SCAN:
        await database_handler_get_all(tableName);
        break;
      case DBOPERATION.CREATE:
        await database_handler_create(tableName, JSON.stringify(event.data));
        break;
      default: {
        statusCode = 400;
        body = `Unsupported operation: "${event.key}"`;
      }
    }
  } catch (err) {
    console.log(err);
    statusCode = 500;
    body = err.message;
  }

  return {
    statusCode,
    body,
    headers,
  };
};
