import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import GenreEnum from "../ts-lib/enum/GenreEnum";
import Artist from "./Artist";

@ObjectType()
@Entity()
export default class Song {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { unique: true, default: "\\" })
  imgUrl: string;

  @Field()
  @Column("varchar", { unique: true })
  audioUrl: string;

  @Field(() => Artist)
  @ManyToOne(() => Artist, (artist) => artist.songs)
  artist: Artist;

  @Field()
  @Column("varchar", { length: 100 })
  title: string;

  @Field()
  @Column("enum", { enum: GenreEnum })
  genre: GenreEnum;

  @Field(() => Int)
  @Column("int", { default: 0 })
  plays: number;
}
