import { registerEnumType } from "type-graphql";

enum GenreEnum {
  CHRISTIAN_AND_GOSPEL = "Christian & Gospel",
  CLASSICAL = "Classical",
  COUNTRY = "Country",
  HIP_HOP = "Hip-Hop",
  JAZZ = "Jazz",
  K_POP = "K-Pop",
  POP = "Pop",
  R_AND_B = "R&B",
}

registerEnumType(GenreEnum, { name: "Genre" });

export default GenreEnum;
