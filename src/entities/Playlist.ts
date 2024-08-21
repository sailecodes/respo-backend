import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import User from "./User";
import Song from "./Song";

@ObjectType()
@Entity()
export default class Playlist extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { length: 50 })
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.playlists)
  owner: User;

  // A Playlist can have many songs, and a Song can belong to many Playlists
  @Field(() => [Song])
  @ManyToMany(() => Song)
  @JoinTable()
  songs: Song[];
}
