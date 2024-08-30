import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AddArtistInput } from "./inputs/add-artist.input";
import { artistRepo } from "./artist.repo";
import { ArtistEntity } from "../../entities/artist.entity";
import { IdArgs } from "../utils/args/id.args";
import { IContext } from "../utils/interfaces/context.interface";

/**
 * Defines the queries, mutations, and field resolvers of the Artist entity
 */
@Resolver()
export class ArtistResolver {
  /**
   * Gets an artist
   *
   * @param idArgs An object containing an Artist id
   * @returns A promise of an Artist with the given id or null if no Artist exists with the id
   */
  @Authorized()
  @Query(() => ArtistEntity)
  async getArtist(@Args() idArgs: IdArgs): Promise<ArtistEntity | null> {
    return await artistRepo.getArtist(idArgs);
  }

  /**
   * Adds an Artist
   *
   * @param addArtistInput An object containing information about an Artist
   * @returns A promise of an Artist with the given information
   */
  @Authorized()
  @Mutation(() => ArtistEntity)
  async addArtist(@Arg("addArtistInput") addArtistInput: AddArtistInput, @Ctx() ctx: IContext): Promise<ArtistEntity> {
    return await artistRepo.addArtist(addArtistInput, ctx);
  }
}
