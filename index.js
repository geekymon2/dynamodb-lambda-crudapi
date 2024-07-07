import { database_handler_get_all } from "./src/dynamodbutil.js";
import { database_handler_create } from "./src/dynamodbutil.js";
import { headers } from "./src/dynamodbutil.js";

export const DBOPERATION = Object.freeze({
  CREATE: "CREATE",
  READ: "READ",
  SCAN: "SCAN",
});

export const lambda_handler = async function (event, context) {
  console.log("Running Lambda Handler for DynamoDB CRUD Operations");
  try {
    switch (event.key) {
      case DBOPERATION.SCAN:
        await database_handler_get_all("donationstbl_dev");
        break;
      case DBOPERATION.CREATE:
        await database_handler_create(
          "donationstbl_dev",
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
