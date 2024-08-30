import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AddSongInput } from "./inputs/add-song.input";
import { songRepo } from "./song.repo";
import { SongEntity } from "../../entities/song.entity";
import { IdArgs } from "../utils/args/id.args";
import { IContext } from "../utils/interfaces/context.interface";

/**
 * Defines the queries, mutations, and field resolvers of the Song entity
 */
@Resolver()
export class SongResolver {
  /**
   * Gets a Song with the given id
   *
   * @param idArgs An object containing the Song id
   * @returns A promise of a Song that matches the id or null if no Song exists with the id
   */
  @Query(() => SongEntity, { nullable: true })
  async getSong(@Args() idArgs: IdArgs): Promise<SongEntity | null> {
    return songRepo.getSong(idArgs);
  }

  /**
   * Adds a Song
   *
   * @remarks
   * - Authorized route
   * - Role-restricted route
   *
   * @param addSongInput An object containing information about a Song
   * @returns A promise of a Song with the given information or null if no Artist match the given id
   */
  @Authorized("artist")
  @Mutation(() => SongEntity, { nullable: true })
  async addSong(@Arg("addSongInput") addSongInput: AddSongInput): Promise<SongEntity | null> {
    return await songRepo.addSong(addSongInput);
  }

  //////////////////////////////////

  /**
   * Saves a Song under a User
   *
   * @remarks
   * - Authorized route
   * - Same-user restricted route
   *
   * @param saveSongInput An object containing User and Song ids
   * @returns A promise of a boolean true if a Song with the given id was saved
   * @throws An Error if no Song or User match the ids or a Song has already been saved
   */
  @Authorized()
  @Mutation(() => Boolean)
  async saveSong(@Args() idArgs: IdArgs, @Ctx() ctx: IContext): Promise<boolean> {
    return await songRepo.saveSong(idArgs, ctx);
  }

  /**
   * Unsaves a Song under a User
   *
   * @remarks
   * - Authorized route
   * - Same-user restricted route
   *
   * @param saveSongInput An object containing User and Song ids
   * @returns A promise of a boolean true if a Song with the given id was unsaved
   * @throws An Error if no Song or User match the ids
   */
  @Authorized()
  @Mutation(() => Boolean)
  async unsaveSong(@Args() idArgs: IdArgs, @Ctx() ctx: IContext): Promise<boolean> {
    return await songRepo.unsaveSong(idArgs, ctx);
  }
}
