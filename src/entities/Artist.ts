import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import Song from "./Song";

@Entity()
export default class Artist extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  // An Artist can make many Songs, and a Song belongs to one Artist
  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];

  @Column("int", { default: 0 })
  listens: number;

  @Column("boolean", { default: false })
  isVerified: boolean;
}
