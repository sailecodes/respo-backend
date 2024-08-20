import "express-async-errors";
import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dataSource from "./dataSource";
import { Container } from "typedi";
import { buildSchema } from "type-graphql";

// ==============================================
// Initialization
// ==============================================

dotenv.config();

const app = express();
const port = process.env.PORT || 5401;
const schema = await buildSchema({
  resolvers: [],
});

// ==============================================
// Routes
// ==============================================

app.use(express.json());
app.use(cors());

app.use("/", (req: Request, res: Response) => res.status(200).json({ data: "[Server message] ...Functioning." }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message.includes("duplicate"))
    console.error("[Server message] QueryFailedError: duplicate email or username in the database");
  else console.error(`Error handled: ${err.message}`);
});

// ==============================================
// Server initialization
// ==============================================

dataSource.initialize().then(() =>
  app.listen(port, () => {
    console.log(`[Server message] Server listening on http://localhost:${port}.`);
  })
);
