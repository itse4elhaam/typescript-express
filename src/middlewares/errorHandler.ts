import { red } from "colors";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  return internalServerErr(res, error);
}

export function internalServerErr(res: Response, error: any) {
  console.error("\n500 err => ", red(error));
  return res.status(500).json({ message: "Internal Server Error" });
}
