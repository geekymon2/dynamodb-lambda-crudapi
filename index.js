import { database_handler } from "dynamodbutil.js";
import { DBOperations } from "dynamodbutil.js";

export const lambda_handler = (event, context) => {
  return database_handler(DBOperations.SCAN, "donationstbl_dev");
};
