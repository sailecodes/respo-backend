import { IsEmail, Length, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";
import { IsFieldUnique } from "../../../utils/decorators/IsFieldUnique";
import { IS_EMAIL_UNIQUE_ERR_MESSAGE, IS_USERNAME_UNIQUE_ERR_MESSAGE } from "../../../utils/constants";

@ArgsType()
export default class AddUserArgs {
  @Field()
  @IsEmail()
  @IsFieldUnique("email", { message: IS_EMAIL_UNIQUE_ERR_MESSAGE })
  email: string;

  @Field()
  @Length(3, 15)
  @IsFieldUnique("username", { message: IS_USERNAME_UNIQUE_ERR_MESSAGE })
  username: string;

  @Field()
  @MinLength(1) // FIXME: Change min password length for prod
  password: string;
}
