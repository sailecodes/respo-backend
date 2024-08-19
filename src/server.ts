import "express-async-errors";
import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dataSource from "./db/dataSource";

import { testMethod } from "./db/controllers/testUserController";

dotenv.config();

const app = express();
const port = process.env.PORT || 5401;

app.use(express.json());
app.use(cors());

app.get("/test", testMethod);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message.includes("duplicate"))
    console.error("[Server message] QueryFailedError: duplicate email or username in the database");
  else console.error(`Error handled: ${err.message}`);
});

dataSource.initialize().then(() =>
  app.listen(port, () => {
    console.log(`[Server message] Server listening on http://localhost:${port}`);
  })
);
