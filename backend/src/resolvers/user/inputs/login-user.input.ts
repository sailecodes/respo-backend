import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginUserInput {
  @Field()
  @MinLength(1)
  username: string;

  @Field()
  @MinLength(1)
  password: string;
}
