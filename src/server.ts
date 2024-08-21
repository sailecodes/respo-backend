import "reflect-metadata";
import "express-async-errors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";
import dataSource from "./dataSource";
import { User } from "./resolvers/index";

const main = async () => {
  // ==============================================
  // Initialization
  // ==============================================

  dotenv.config();

  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 5401;

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [User] }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  // ==============================================
  // Routes
  // ==============================================

  app.use("/graphql", express.json(), cors(), expressMiddleware(apolloServer));

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`[Server message] Error: ${err}`);
  });
  // ==============================================
  // Server initialization
  // ==============================================

  dataSource.initialize().then(async () => {
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`[Server message] GraphQL endpoint at http://localhost:${port}`);
  });
};

main().catch((err) => console.log(`[Server message] Error: ${err}`));
