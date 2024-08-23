import { Field, ID, InputType } from "type-graphql";
import { IsEnum, Length } from "class-validator";
import GenreEnum from "../../utils/enum/GenreEnum";

@InputType()
export default class AddSongInput {
  @Field({ nullable: true })
  imgUrl?: string;

  @Field()
  audioUrl: string;

  @Field(() => ID)
  artistId: string;

  @Field()
  @Length(1, 100)
  title: string;

  @Field(() => GenreEnum)
  @IsEnum(GenreEnum)
  genre: GenreEnum;
}
