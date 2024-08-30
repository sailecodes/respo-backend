import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UserRelationFlagArgs {
  @Field({ nullable: true })
  savedSongs?: boolean;

  @Field({ nullable: true })
  playlists?: boolean;
}
