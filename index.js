import { database_handler } from "dynamodbutil.js";

export const lambda_handler = (event, context) => {
  return database_handler(event.key);
};
