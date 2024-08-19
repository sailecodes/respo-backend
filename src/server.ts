import "express-async-errors";
import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import dataSource from "./db/dataSource";
import User from "./db/entities/User";
import Song from "./db/entities/Song";
import GenreEnum from "./ts-lib/enum/GenreEnum";
import Artist from "./db/entities/Artist";

dotenv.config();

const app = express();
const port = process.env.PORT || 5401;

app.use(express.json());
app.use(cors());

//////////////////////////////// TEST ////////////////////////////////

app.use("/test/add-user", async (req: Request, res: Response) => {
  const userRepo = dataSource.getRepository(User);

  const user = await userRepo.save({
    email: "user2@gmail.com",
    username: "user2",
    password: "user2",
  });

  res.status(201).json({ data: user });
});

app.use("/test/add-artist", async (req: Request, res: Response) => {
  const artistRepo = dataSource.getRepository(Artist);

  const artist = await artistRepo.save({
    name: "artist1",
  });

  res.status(201).json({ data: artist });
});

app.use("/test/add-song", async (req: Request, res: Response) => {
  const songRepo = dataSource.getRepository(Song);
  const artistRepo = dataSource.getRepository(Artist);

  const artist = await artistRepo.findOne({
    where: {
      name: "artist1",
    },
  });

  if (artist == null) throw Error();

  const song = await songRepo.save({
    audioUrl: "/dummy/url",
    title: "song1",
    artist,
    genre: GenreEnum.CHRISTIAN_AND_GOSPEL,
  });

  res.status(201).json({ data: song });
});

//////////////////////////////// TEST ////////////////////////////////

app.use("/", (req: Request, res: Response) => res.status(200).json({ data: "[Server message] ..." }));

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
