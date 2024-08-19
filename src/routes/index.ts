import express, { Response } from "express";
const router = express.Router();

router.get("/", (req, res: Response) => {
  res.send("Hello from your Api server!");
});

export default router;
