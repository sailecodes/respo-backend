import { DataSource } from "typeorm";
import User from "./entities/User";
import Artist from "./entities/Artist";
import Song from "./entities/Song";
import Playlist from "./entities/Playlist";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "dev_respo",
  port: 5432,
  username: "test",
  password: "test",
  synchronize: true,
  entities: [User, Artist, Song, Playlist],
});

export default dataSource;
