import "express-async-errors";
import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
import db from "./db/connection";

dotenv.config();

const app = express();
const port = process.env.PORT || 5401;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error handled: ${err}`);
});

db.initialize().then(() =>
  app.listen(port, () => {
    console.log(`[Server message] Server listening on port ${port}`);
  })
);
