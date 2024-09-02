import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { ArtistEntity } from "./entities/artist.entity";
import { SongEntity } from "./entities/song.entity";
import { PlaylistEntity } from "./entities/playlist.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "dev_respo",
  port: 5432,
  username: "test",
  password: "test",
  synchronize: true,
  entities: [UserEntity, ArtistEntity, SongEntity, PlaylistEntity],
});
