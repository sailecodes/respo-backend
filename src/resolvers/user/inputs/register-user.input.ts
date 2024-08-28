import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsUserFieldUnique } from "../../utils/decorators/is-user-field-unique.decorator";
import { IS_EMAIL_UNIQUE_ERR_MESSAGE, IS_USERNAME_UNIQUE_ERR_MESSAGE } from "../../../constants";

@InputType()
export class RegisterUserInput {
  @Field()
  @IsEmail()
  @IsUserFieldUnique("email", { message: IS_EMAIL_UNIQUE_ERR_MESSAGE })
  email: string;

  @Field()
  @Length(3, 20)
  @IsUserFieldUnique("username", { message: IS_USERNAME_UNIQUE_ERR_MESSAGE })
  username: string;

  @Field()
  @MinLength(8)
  password: string;
}
