import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { SongEntity } from "./song.entity";
import { PlaylistEntity } from "./playlist.entity";

/**
 * Defines the GraphQL fields and PostgreSQL columns for the User entity
 */
@ObjectType()
@Entity("User")
export class UserEntity {
  /**
   * The ID (uuid) of a User
   */
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /**
   * The email of a User
   */
  @Field()
  @Column({ unique: true })
  email: string;

  /**
   * The flag indicating if a User has confirmed their email
   *
   * Note: Users with unconfirmed emails cannot use Respo
   */
  @Column({ default: false })
  hasConfirmedEmail: boolean;

  /**
   * The username of a User
   */
  @Field()
  @Column({ unique: true, length: 20 })
  username: string;

  /**
   * The password of a User
   *
   * Note: Passwords are safely hashed in the database
   */
  @Column()
  password: string;

  /**
   * A list of saved Songs by the User
   *
   * Note: Has a Many to Many relation with the Song entity to indicate that a User can save
   *       many Songs and a Song can be saved by many Users
   */
  @Field(() => [SongEntity])
  @ManyToMany(() => SongEntity)
  @JoinTable()
  savedSongs: SongEntity[];

  /**
   * A list of created Playlists by the User
   *
   * Note: Has a One to Many relation with the Playlist entity to indicate that a User can
   *       create many Playlists and a Playlist only belongs to a single User
   */
  @Field(() => [PlaylistEntity])
  @OneToMany(() => PlaylistEntity, (playlistEntity) => playlistEntity.owner)
  playlists: PlaylistEntity[];
}
