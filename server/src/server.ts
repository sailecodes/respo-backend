import "reflect-metadata";
import "express-async-errors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";
import { dataSource } from "./dataSource";
import { ArtistResolver, PlaylistResolver, SongResolver, UserResolver } from "./resolvers/index";
import { TopLevelAuthMiddleware } from "./resolvers/utils/middleware/top-level-auth.middleware";

const main = async () => {
  // ==============================================
  // Initialization
  // ==============================================

  dotenv.config();

  const app = express();

  // TODO: Uncomment for prod in an EC2 instance under a proxy
  // app.set('trust proxy', 1);

  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4001;

  const redisClient = createClient();

  redisClient.connect().catch((err) => console.log(`[Server Redis error] ${err}`));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ArtistResolver, SongResolver, PlaylistResolver],
      validate: true,
      authChecker: TopLevelAuthMiddleware,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  // ==============================================
  // Middleware
  // ==============================================

  app.use(
    express.json(),
    cors({
      origin: ["http://localhost:4000", "http://localhost:5173"],
      credentials: true,
    }),
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      name: process.env.COOKIE_NAME,
      secret: process.env.SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  // ==============================================
  // Routes
  // ==============================================

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`[Server middleware error] ${err}`);
  });

  // ==============================================
  // Server initialization
  // ==============================================

  dataSource.initialize().then(async () => {
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`\n[Server message]\n\nGraphQL endpoint at http://localhost:${port}/graphql`);
  });
};

main().catch((err) => console.log(`[Server main error] ${err}`));
