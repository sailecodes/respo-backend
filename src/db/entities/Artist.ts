import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Song from "./Song";

@Entity()
class Artist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];

  @Column()
  listens: number;

  @Column()
  verified: boolean;
}

export default Artist;
