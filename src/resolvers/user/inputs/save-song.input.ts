import { IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class SaveSongInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => ID)
  @IsUUID()
  songId: string;
}
