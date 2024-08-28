import { IsEmail, IsUUID, Length, MinLength } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

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
