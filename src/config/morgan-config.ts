import morgan from "morgan";
import colors from "colors"; // Import colors library
import { REQ_COLORS } from "../lib/constants";
import { Request } from "express";
import { HttpVerbs } from "../lib/types";

morgan.token("params", (req: Request, res) => {
  return JSON.stringify(req.params);
});

morgan.token("query", (req: Request, res) => {
  return JSON.stringify(req.query);
});

morgan.token("body", (req: Request, res) => {
  return JSON.stringify(req.body);
});

morgan.token("colored-status", (req: Request, res) => {
  const status = res.statusCode;
  const color =
    status >= 500
      ? "red"
      : status >= 400
      ? "yellow"
      : status >= 300
      ? "cyan"
      : "green";
  return colors[color](status.toString()); 
});

morgan.token("colored-method", (req, res) => {
  const method: HttpVerbs = req.method as HttpVerbs;
  const color: string = REQ_COLORS[method];
  // this is temporary
  // @ts-expect-error
  return colors[color](method.toString()); 
});

const morganMiddleware = morgan(
  (tokens, req, res) => {
    const method = tokens["colored-method"](req, res);
    const url = tokens.url(req, res);
    const status = tokens["colored-status"](req, res);
    const contentLength = tokens.res(req, res, "content-length");
    const responseTime = tokens["response-time"](req, res);
    const params = tokens.params(req, res);
    const query = tokens.query(req, res);
    const body = tokens.body(req, res);

    return `\n${method} ${url} ${status} ${contentLength} - ${responseTime} ms: \n- Params: ${params} \n- Query: ${query} \n- Body: ${body}\n`;
  },
  {
    // Stream for morgan logs (you can customize this as needed)
    stream: process.stdout,
  }
);

export default morganMiddleware;
