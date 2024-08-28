import { MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class LoginUserArgs {
  @Field()
  @MinLength(1)
  username: string;

  @Field()
  @MinLength(1)
  password: string;
}
