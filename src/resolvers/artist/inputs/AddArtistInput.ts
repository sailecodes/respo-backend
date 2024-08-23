import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsArtistFieldUnique } from "../../utils/decorators/IsArtistFieldUnique";
import { IS_NAME_UNIQUE_ERR_MESSAGE } from "../../../constants";

@InputType()
export default class AddArtistInput {
  @Field()
  @MinLength(1)
  @IsArtistFieldUnique("name", { message: IS_NAME_UNIQUE_ERR_MESSAGE })
  name: string;
}
