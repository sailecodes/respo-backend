import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class AddArtistInput {
  @Field()
  @MinLength(1)
  name: string;
}
