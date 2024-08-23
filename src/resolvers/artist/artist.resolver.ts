import { Arg, Mutation, Resolver } from "type-graphql";
import { AddArtistInput } from "./inputs/add-artist.input";
import { artistRepo } from "./artist.repo";
import { ArtistEntity } from "../../entities/artist.entity";

@Resolver()
export class ArtistResolver {
  // @Query()
  // async getArtist() {}

  @Mutation(() => ArtistEntity)
  async addArtist(@Arg("addArtistInput") addArtistInput: AddArtistInput) {
    return (await artistRepo.addArtist(addArtistInput))!;
  }

  // @Mutation()
  // async updateArtist() {}

  // @Mutation()
  // async deleteArtist() {}
}
