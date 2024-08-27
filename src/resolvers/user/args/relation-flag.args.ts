import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class RelationFlagArgs {
  @Field({ nullable: true })
  savedSongs?: boolean;

  @Field({ nullable: true })
  playlists?: boolean;
}
