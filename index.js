import { database_handler_get_all } from "./src/dynamodbutil.js";
import { database_handler_create } from "./src/dynamodbutil.js";

export const DBOPERATION = Object.freeze({
  CREATE: "CREATE",
  READ: "READ",
  SCAN: "SCAN",
});

const headers = {
  "Content-Type": "application/json",
};

const tableName = process.env.TABLE_NAME;

export const lambda_handler = async function (event, context) {
  let statusCode = 200;
  let body = "OK";

  console.log("Running Lambda Handler for DynamoDB CRUD Operations");
  console.log(`Operation Key: ${event.key}`);

  if (event.key === undefined) {
    console.log(
      `Operation key is undefined, setting default value to ${DBOPERATION.SCAN}`
    );
    event.key = DBOPERATION.SCAN;
  }

  try {
    switch (event.key) {
      case DBOPERATION.SCAN:
        body = await database_handler_get_all(tableName);
        break;
      case DBOPERATION.CREATE:
        body = await database_handler_create(
          tableName,
          JSON.stringify(event.data)
        );
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
