import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { AddSongInput } from "./inputs/add-song.input";
import { songRepo } from "./song.repo";
import { SongEntity } from "../../entities/song.entity";
import { IdArgs } from "../utils/args/id.args";

/**
 * Defines the queries, mutations, and field resolvers for the Song entity
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
   * Restricted route authenticated by the `ARTIST` and `ADMIN` roles
   *
   * @param addSongInput An object containing information about the Song
   * @returns A promise of a Song with the given information or null if no Artist can be found
   */
  @Mutation(() => SongEntity, { nullable: true })
  async addSong(@Arg("addSongInput") addSongInput: AddSongInput): Promise<SongEntity | null> {
    return await songRepo.addSong(addSongInput);
  }
}
