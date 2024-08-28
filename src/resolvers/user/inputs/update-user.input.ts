import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Length(3, 20)
  username?: string;

  @Field({ nullable: true })
  @MinLength(8)
  password?: string;
}
