import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class ArtistResolver {
  @Query()
  async getArtist() {}

  // FIXME: Delete
  @Mutation()
  async addArtist() {}

  @Mutation()
  async updateArtist() {}

  @Mutation()
  async deleteArtist() {}
}
