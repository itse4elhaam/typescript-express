import { IValidateData } from "@/lib/types";
import { internalServerErr } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export default function validateData({
  bodySchema,
  querySchema,
  paramsSchema,
}: IValidateData) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!bodySchema && !querySchema && !paramsSchema) {
        throw new Error(
          "At least one of bodySchema, querySchema, or paramsSchema must be defined.",
        );
      }
      bodySchema && bodySchema.parse(req.body);
      querySchema && querySchema.parse(req.query);
      paramsSchema && paramsSchema.parse(req.params);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      }
      return internalServerErr(res, error);
    }
  };
}
