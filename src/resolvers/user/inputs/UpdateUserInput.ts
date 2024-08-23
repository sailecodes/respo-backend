import { IsEmail, IsUUID, Length, MinLength } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { IsUserFieldUnique } from "../../utils/decorators/IsUserFieldUnique";
import { IS_EMAIL_UNIQUE_ERR_MESSAGE, IS_USERNAME_UNIQUE_ERR_MESSAGE } from "../../../constants";

@InputType()
export default class UpdateUserInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsUserFieldUnique("email", { message: IS_EMAIL_UNIQUE_ERR_MESSAGE })
  email?: string;

  @Field({ nullable: true })
  @Length(3, 15)
  @IsUserFieldUnique("username", { message: IS_USERNAME_UNIQUE_ERR_MESSAGE })
  username?: string;

  @Field({ nullable: true })
  @MinLength(1) // FIXME: Change min password length for prod
  password?: string;
}
