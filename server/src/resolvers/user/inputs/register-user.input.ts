import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUserInput {
  @Field()
  @Length(3, 20)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
