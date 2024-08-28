import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePlaylistInput {
  @Field()
  @Length(1, 35)
  name: string;
}
