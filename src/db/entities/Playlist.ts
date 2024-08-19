import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import User from "./User";
import Song from "./Song";

@Entity()
export default class Playlist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @ManyToOne(() => User, (user) => user.playlists)
  owner: User;

  // Note: A Playlist can have many songs, and a Song can belong to many Playlists.
  @ManyToMany(() => Song)
  @JoinTable()
  songs: Song[];
}
