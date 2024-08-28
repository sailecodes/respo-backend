import { IsUUID } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class AddSongToPlaylistInput {
  @Field(() => ID)
  @IsUUID()
  songId: string;

  @Field(() => ID)
  @IsUUID()
  playlistId: string;
}
