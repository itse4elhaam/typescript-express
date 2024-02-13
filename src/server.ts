import express, { Response } from "express";
import cors from "cors";
// const apiRoutes = require("./routes/index");
// const morganMiddleware = require("./config/morgan-config");
require("dotenv").config();
const app = express();
app.use(cors());
// app.use(morganMiddleware);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (res: Response) => {
	res.send("Hello from your Maps Api server!");
});

app.listen(port, () => {
	console.log(`http://localhost:${port}/`);
});

// app.use("/api", apiRoutes);
