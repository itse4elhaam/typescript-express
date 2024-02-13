export type HttpVerbs = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

export type RequestColors = {
  [key in HttpVerbs]: string;
};
