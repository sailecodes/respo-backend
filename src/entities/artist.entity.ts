import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { SongEntity } from "./song.entity";

@ObjectType()
@Entity("artist")
export class ArtistEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { unique: true })
  name: string;

  // @Field()
  // @Column({ unique: true })
  // email: string;

  // @Column({ default: false })
  // hasConfirmedEmail: boolean;

  // @Field()
  // @Column({ unique: true, length: 20 })
  // username: string;

  // @Column()
  // password: string;

  /**
   * The songs that an Artist has created or produced
   *
   * @remarks
   * Has a One to Many relation with the Song entity to indicate that an Artist can create
   * many Songs and a Song can only belong to one Artist
   */
  @Field(() => [SongEntity])
  @OneToMany(() => SongEntity, (songEntity) => songEntity.artist)
  songs: SongEntity[];

  @Field(() => Int)
  @Column("int", { default: 0 })
  listens: number;

  @Column("boolean", { default: false })
  isVerified: boolean;
}
