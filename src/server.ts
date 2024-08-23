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
import { SongResolver, UserResolver, ArtistResolver } from "./resolvers/index";

const main = async () => {
  // ==============================================
  // Initialization
  // ==============================================

  dotenv.config();

  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4001;

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver, SongResolver, ArtistResolver], validate: true }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  // ==============================================
  // Routes
  // ==============================================

  app.use("/graphql", express.json(), cors(), expressMiddleware(apolloServer));

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`[Server message] ${err}`);
  });
  // ==============================================
  // Server initialization
  // ==============================================

  dataSource.initialize().then(async () => {
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`\n[Server message]\n\nGraphQL endpoint at http://localhost:${port}/graphql`);
  });
};

main().catch((err) => console.log(`[Server message] Error: ${err}`));
