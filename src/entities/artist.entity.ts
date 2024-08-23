import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { SongEntity } from "./song.entity";

@ObjectType()
@Entity("Artist")
export class ArtistEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { unique: true })
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
  @Field(() => [SongEntity], { nullable: true })
  @OneToMany(() => SongEntity, (songEntity) => songEntity.artist, { nullable: true })
  songs?: SongEntity[];

  @Field(() => Int)
  @Column("int", { default: 0 })
  listens: number;

  @Column("boolean", { default: false })
  isVerified: boolean;
}
