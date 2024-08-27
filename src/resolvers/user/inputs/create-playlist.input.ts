import { IsUUID, Length } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreatePlaylistInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field()
  @Length(1, 35)
  name: string;
}
