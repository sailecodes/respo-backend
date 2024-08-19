import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import GenreEnum from "../../ts-lib/enum/GenreEnum";
import Artist from "./Artist";

@Entity()
export default class Song {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { unique: true, default: "\\" })
  imgUrl: string;

  @Column("varchar", { unique: true })
  audioUrl: string;

  @ManyToOne(() => Artist, (artist) => artist.songs)
  artist: Artist;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("enum", { enum: GenreEnum })
  genre: GenreEnum;

  @Column("int", { default: 0 })
  plays: number;
}
