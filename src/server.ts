import express, { Response } from "express";
import cors from "cors";
// import apiRoutes from "./routes/index" ;
import morganMiddleware from "./config/morgan-config";
require("dotenv").config();
const app = express();
app.use(cors());
app.use(morganMiddleware);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res: Response) => {
  res.send("Hello from your Api server!");
});

app.listen(port, () => {
  console.log(`Your server is up and runnings at: http://localhost:${port}/`);
});

// app.use("/api", apiRoutes);
