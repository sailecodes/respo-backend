import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Song from "./Song";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("boolean", { default: false })
  emailConfirmed: boolean;

  @Column("varchar", { unique: true })
  username: string;

  @Column("varchar")
  password: string;

  @OneToMany(() => Song, (song) => song.savedBy)
  savedSongs: Song[];
}

export default User;
