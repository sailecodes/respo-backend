import { Arg, Mutation, Resolver } from "type-graphql";
import artistRepo from "./artistRepo";
import AddArtistInput from "./inputs/AddArtistInput";
import Artist from "../../entities/Artist";

@Resolver()
export default class ArtistResolver {
  // @Query()
  // async getArtist() {}

  @Mutation(() => Artist)
  async addArtist(@Arg("addArtistInput") addArtistInput: AddArtistInput) {
    return (await artistRepo.addArtist(addArtistInput))!;
  }

  // @Mutation()
  // async updateArtist() {}

  // @Mutation()
  // async deleteArtist() {}
}
