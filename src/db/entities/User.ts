import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
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

  @Column("varchar", { unique: true, length: 20 })
  username: string;

  @Column("varchar")
  password: string;

  // A User can save many Songs, and a Song can be saved by many Users
  @ManyToMany(() => Song)
  @JoinTable()
  savedSongs: Song[];

  // A User can create many Playlists, and a Playlist belongs to one User
  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists: Playlist[];
}
