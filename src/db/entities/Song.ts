import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Artist from "./Artist";
import GenreEnum from "../../ts-lib/enum/GenreEnum";
import User from "./User";

@Entity()
class Song {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { unique: true, default: "\\" })
  imgUrl: string;

  @Column("varchar", { unique: true })
  audioUrl: string;

  @ManyToOne(() => Artist, (artist) => artist.songs)
  artist: Artist;

  @Column("varchar")
  name: string;

  @Column("enum", { enum: GenreEnum })
  genre: GenreEnum;

  @Column("int", { default: 0 })
  plays: number;

  @ManyToOne(() => User, (user) => user.savedSongs)
  savedBy: User;
}

export default Song;
