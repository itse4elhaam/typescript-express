import { RequestColors } from "./types";

export const MAX_BODY_LENGTH_MORGAN_LOGS = 1000;

export const REQ_COLORS: RequestColors = {
  GET: "green",
  POST: "yellow",
  DELETE: "red",
  PATCH: "magenta",
  PUT: "blue",
};