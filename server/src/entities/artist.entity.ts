import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { SongEntity } from "./song.entity";
import { UserEntity } from "./user.entity";

@ObjectType()
@Entity("artist")
export class ArtistEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.artistAccounts)
  user: UserEntity;

  @Field()
  @Column("text", { unique: true })
  name: string;

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
  @Column({ default: 0 })
  listens: number;

  @Column({ default: false })
  isVerified: boolean;
}
