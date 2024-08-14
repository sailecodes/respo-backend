import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsDate, IsEmail, IsString, Length, MinLength } from "class-validator";

@Entity()
class TestUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  @IsEmail()
  email: string;

  @Column("boolean")
  @IsBoolean()
  emailConfirmed: boolean;

  @Column("varchar", { length: 15 })
  @IsString()
  @Length(1, 15)
  username: string;

  @Column("varchar", { length: 50 })
  @IsString()
  @MinLength(8)
  password: string;

  @Column("date")
  @IsDate()
  dateJoined: string;
}

export default TestUser;
