import { IsUUID } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class GetUserArgs {
  @Field()
  @IsUUID()
  userId: string;
}
