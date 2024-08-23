import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { ArtistEntity } from "./artist.entity";
import GenreEnum from "../resolvers/utils/enum/genre.enum";

@ObjectType()
@Entity("Song")
export class SongEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { unique: true, nullable: true })
  imgUrl?: string;

  @Field()
  @Column("varchar", { unique: true })
  audioUrl: string;

  @Field(() => ArtistEntity)
  @ManyToOne(() => ArtistEntity, (artistEntity) => artistEntity.songs)
  artist: ArtistEntity;

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
