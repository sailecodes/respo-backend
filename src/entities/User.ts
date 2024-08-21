import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import Song from "./Song";
import Playlist from "./Playlist";

@ObjectType()
@Entity()
export default class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  hasConfirmedEmail: boolean;

  @Field()
  @Column({ unique: true, length: 20 })
  username: string;

  @Column()
  password: string;

  // A User can save many Songs, and a Song can be saved by many Users
  @Field(() => [Song])
  @ManyToMany(() => Song)
  @JoinTable()
  savedSongs: Song[];

  // A User can create many Playlists, and a Playlist belongs to one User
  @Field(() => [Playlist])
  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists: Playlist[];
}
