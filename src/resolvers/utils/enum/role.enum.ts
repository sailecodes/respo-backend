import { registerEnumType } from "type-graphql";

enum RoleEnum {
  USER = "USER",
  ARTIST = "ARTIST",
  ADMIN = "ADMIN",
}

registerEnumType(RoleEnum, { name: "Role" });

export default RoleEnum;
