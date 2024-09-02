import { Arg, Args, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { PlaylistEntity } from "../../entities/playlist.entity";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import { IContext } from "../utils/interfaces/context.interface";
import { IdArgs } from "../utils/args/id.args";
import { AddSongToPlaylistInput } from "./inputs/add-song-to-playlist.input";
import { playlistRepo } from "./playlist.repo";

/**
 * Defines the queries, mutations, and field resolvers of the Playlist entity
 */
@Resolver()
export class PlaylistResolver {
  /***
   * Creates a Playlist
   *
   * @remarks
   * - Authorized route
   * - Same-user restricted route
   *
   * @params createPlaylistInput An object containing a User id and Playlist name
   * @returns A promise of a Playlist matching the given name
   * @throws An Error if no User matches the id or the Playlist name is already used
   */
  @Authorized()
  @Mutation(() => PlaylistEntity)
  async createPlaylist(
    @Arg("createPlaylistInput") createPlaylistInput: CreatePlaylistInput,
    @Ctx() ctx: IContext
  ): Promise<PlaylistEntity> {
    return await playlistRepo.createPlaylist(createPlaylistInput, ctx);
  }

  /**
   * Deletes a Playlist
   *
   * @remarks
   * - Authorized route
   * - Same-user restricted route
   *
   * @param idArgs An object containing a Playlist id
   * @returns A Promise of a boolean true if a Playlist with the given id was deleted
   * @throws An Error if no Playlist or User match the ids or a User is accessing a Playlist they did not create
   */
  @Authorized()
  @Mutation(() => Boolean)
  async deletePlaylist(@Args() idArgs: IdArgs, @Ctx() ctx: IContext): Promise<boolean> {
    return await playlistRepo.deletePlaylist(idArgs, ctx);
  }

  /**
   * Adds a Song to a Playlist
   *
   * @param addSongToPlaylistInput An object containing Song and Playlist ids
   * @param ctx An object containing the req and res fields
   * @returns A boolean true if a Song was added to a Playlist, where both match the given ids
   * @throws An Error if no Playlist or Song match the ids, a User is adding to a Playlist they did not create, or the
   *         Song has already been added to the Playlist
   */
  @Mutation(() => Boolean)
  async addSongToPlaylist(
    @Arg("addSongToPlaylistInput") addSongToPlaylistInput: AddSongToPlaylistInput,
    @Ctx() ctx: IContext
  ): Promise<boolean> {
    return await playlistRepo.addSongToPlaylist(addSongToPlaylistInput, ctx);
  }

  /**
   * Removes a Song from a Playlist
   *
   * @param addSongToPlaylistInput An object containing Song and Playlist ids
   * @param ctx An object containing the req and res fields
   * @returns A boolean true if a Song was removed from a Playlist, where both match the given ids, or false if no Song
   *          was removed
   * @throws An Error if no Playlist or Song match the ids or a User is removing from a Playlist they did not create
   */
  @Mutation(() => Boolean)
  async removeSongFromPlaylist(
    @Arg("addSongToPlaylistInput") addSongToPlaylistInput: AddSongToPlaylistInput,
    @Ctx() ctx: IContext
  ): Promise<boolean> {
    return await playlistRepo.removeSongFromPlaylist(addSongToPlaylistInput, ctx);
  }
}
