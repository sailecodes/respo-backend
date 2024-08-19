import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import Song from "./Song";
import Playlist from "./Playlist";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("boolean", { default: false })
  hasConfirmedEmail: boolean;

  @Column("varchar", { unique: true })
  username: string;

  @Column("varchar")
  password: string;

  // Note: A User can save many songs, and a Song can be saved by many Users.
  @ManyToMany(() => Song)
  savedSongs: Song[];

  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists: Playlist[];
}
