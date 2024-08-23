import { IsUUID } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class UserIdArgs {
  @Field(() => ID)
  @IsUUID()
  userId: string;
}
