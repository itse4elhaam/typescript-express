import express, { Response } from "express";
import cors from "cors";
import apiRoutes from "./routes";
import morganMiddleware from "@/config/morgan-config";
import { cyan } from "colors";
import "./env";
import { dbConnect } from "./config/db";
import { validateData } from "./middlewares";

async function bootstrapServer() {
  const app = express();
  app.use(cors());
  app.use(morganMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await dbConnect();

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(
      `\nServer is up and running at: ${cyan(`http://localhost:${port}/`)}`,
    );
  });

  app.use("/api", apiRoutes);
}

bootstrapServer().catch((err: any) => {
  console.error(err.message);
  process.exit(1);
});
