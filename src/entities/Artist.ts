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

  /**
   * The songs that an Artist has created or produced
   *
   * Note:
   *  - Must be nullable in both decorators because if an Artist has no references to a Song
   *    in this relation, then the database returns null, and if the @Field decorator is not
   *    given true for the nullable option, then GraphQL assumes that songs cannot be null
   *  - Has a One to Many relation with the Song entity to indicate that an Artist can create
   *    many Songs and a Song can only belong to one Artist
   */
  // An Artist can make many Songs, and a Song belongs to one Artist
  @Field(() => [Song], { nullable: true })
  @OneToMany(() => Song, (song) => song.artist, { nullable: true })
  songs?: Song[];

  @Field(() => Int)
  @Column("int", { default: 0 })
  listens: number;

  @Column("boolean", { default: false })
  isVerified: boolean;
}
