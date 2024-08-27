import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { AddArtistInput } from "./inputs/add-artist.input";
import { artistRepo } from "./artist.repo";
import { ArtistEntity } from "../../entities/artist.entity";
import { IdArgs } from "../utils/args/id.args";

/**
 * Defines the queries, mutations, and field resolvers for the Artist entity
 */
@Resolver()
export class ArtistResolver {
  /**
   * Gets an artist with the given id
   *
   * @param idArgs An object containing the Artist id
   * @returns A promise of an Artist that matches the id or null if no Artist exists with the id
   */
  @Query(() => ArtistEntity)
  async getArtist(@Args() idArgs: IdArgs): Promise<ArtistEntity | null> {
    return await artistRepo.getArtist(idArgs);
  }

  /**
   * Adds an Artist with the given information
   *
   * @param addArtistInput An object containing information about the Artist
   * @returns A promise of an Artist with the given information
   */
  @Mutation(() => ArtistEntity)
  async addArtist(@Arg("addArtistInput") addArtistInput: AddArtistInput): Promise<ArtistEntity> {
    return await artistRepo.addArtist(addArtistInput);
  }
}
