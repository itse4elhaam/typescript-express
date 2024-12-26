import { Request } from "express";
import { z } from "zod";

export type HttpVerbs = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

export type RequestColors = {
  [key in HttpVerbs]: string;
};

export interface IValidateData {
  bodySchema?: z.ZodObject<any, any>;
  querySchema?: z.ZodObject<any, any>;
  paramsSchema?: z.ZodObject<any, any>;
}

// this is used for zod
export interface IParsedRequest<Body, Query, Params>
  extends Request<Params, unknown, Body, Query> {}
