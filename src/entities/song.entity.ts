import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import GenreEnum from "../resolvers/utils/enum/genre.enum";
import { ArtistEntity } from "./artist.entity";

@ObjectType()
@Entity("song")
export class SongEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text", { unique: true, nullable: true })
  imgUrl?: string;

  @Field()
  @Column("text", { unique: true })
  audioUrl: string;

  @Field(() => ArtistEntity)
  @ManyToOne(() => ArtistEntity, (artistEntity) => artistEntity.songs)
  artist: ArtistEntity;

  @Field()
  @Column("text")
  title: string;

  @Field(() => GenreEnum)
  @Column("enum", { enum: GenreEnum })
  genre: GenreEnum;

  @Field(() => Int)
  @Column({ default: 0 })
  plays: number;
}
