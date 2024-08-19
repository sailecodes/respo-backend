import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Song from "./Song";

@Entity()
export default class Artist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];

  @Column("int", { default: 0 })
  listens: number;

  @Column("boolean", { default: false })
  isVerified: boolean;
}
