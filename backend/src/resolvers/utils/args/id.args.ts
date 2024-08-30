import { IsUUID } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class IdArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
