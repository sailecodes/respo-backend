import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import Song from "./Song";

@ObjectType()
@Entity()
export default class Artist {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar")
  name: string;

  // An Artist can make many Songs, and a Song belongs to one Artist
  @Field(() => [Song])
  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];

  @Field(() => Int)
  @Column("int", { default: 0 })
  listens: number;

  @Column("boolean", { default: false })
  isVerified: boolean;
}
