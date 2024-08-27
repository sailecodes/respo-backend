import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { UserEntity } from "./user.entity";
import { SongEntity } from "./song.entity";

@ObjectType()
@Entity("playlist")
export class PlaylistEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { length: 50 })
  name: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.playlists)
  owner: UserEntity;

  // A Playlist can have many songs, and a Song can belong to many Playlists
  @Field(() => [SongEntity])
  @ManyToMany(() => SongEntity)
  @JoinTable()
  songs: SongEntity[];
}
