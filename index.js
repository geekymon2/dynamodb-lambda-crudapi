import { database_handler } from "./src/dynamodbutil.js";
import { DBOperations } from "./src/dynamodbutil.js";

export const lambda_handler = (event, context) => {
  return database_handler(DBOperations.SCAN, "donationstbl_dev");
};
