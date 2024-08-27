import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { userRepo } from "./user.repo";
import { UpdateUserInput } from "./inputs/update-user.input";
import { IdArgs } from "../utils/args/id.args";
import { UserEntity } from "../../entities/user.entity";
import { RegisterUserInput } from "./inputs/register-user.input";
import { SaveSongInput } from "./inputs/save-song.input";
import { PlaylistEntity } from "../../entities/playlist.entity";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import { UserRelationFlagArgs } from "./args/user-relation-flag.args";
import { IContext } from "../utils/interfaces/context.interface";

/**
 * Defines the queries, mutations, and field resolvers for the User entity
 */
@Resolver()
export class UserResolver {
  /**
   * Registers a User
   *
   * @param registerUserInput An object containing information about the User
   * @returns A promise of a User with the given information
   */
  @Mutation(() => UserEntity)
  async registerUser(@Arg("registerUserInput") registerUserInput: RegisterUserInput): Promise<UserEntity> {
    return await userRepo.registerUser(registerUserInput);
  }

  /**
   * Logs in a User
   */
  @Query(() => _)
  async loginUser(@Ctx() ctx: IContext): _ {
    return await userRepo.loginUser(ctx);
  }

  /**
   * Gets an array of every User
   *
   * @hidden
   *
   * @privateRemarks
   * Restricted route authenticated by top-level role
   *
   * @returns A promise of an array of every User or an empty array
   */
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await userRepo.getAllUsers();
  }

  /**
   * Gets a User
   *
   * @remark
   * userRelationFlagArgs is a flag representation of which relations the User wants
   *
   * @param idArgs An object containing the User id
   * @returns A promise of a User that matches the id or null if no user exists with the id
   */
  @Query(() => UserEntity, { nullable: true })
  async getUser(
    @Args() idArgs: IdArgs,
    @Args() userRelationFlagArgs: UserRelationFlagArgs
  ): Promise<UserEntity | null> {
    return await userRepo.getUser(idArgs, userRelationFlagArgs);
  }

  /**
   * Updates a User
   *
   * @remarks
   * Restricted route authenticated by session data
   *
   * @param updateUserInput An object containing new information about the User
   * @returns A promise of a User with updated information or null if no user exists with the id
   */
  @Mutation(() => UserEntity, { nullable: true })
  async updateUser(@Arg("updateUserInput") updateUserInput: UpdateUserInput): Promise<UserEntity | null> {
    return await userRepo.updateUser(updateUserInput);
  }

  /**
   * Deletes a User
   *
   * @remarks
   * Restricted route authenticated by session data
   *
   * @param userIdArgs An object containing the User id
   * @returns A promise of a Boolean true if a User with the given id was deleted or false if no user exists with
   *          the id
   */
  @Mutation(() => Boolean)
  async deleteUser(@Args() idArgs: IdArgs): Promise<Boolean> {
    return await userRepo.deleteUser(idArgs);
  }

  /**
   * Saves a Song
   *
   * @param saveSongInput An object containing the User and Song ids
   * @returns A promise of a Boolean true if a Song with the given id was saved or false if the ids are nonexistent
   */
  @Mutation(() => Boolean)
  async saveSong(@Arg("saveSongInput") saveSongInput: SaveSongInput): Promise<Boolean> {
    return await userRepo.saveSong(saveSongInput);
  }

  /**
   * Unsaves a Song
   *
   * @param saveSongInput An object containing a User and Song id
   * @returns A promise of a Boolean true if a Song with the given id was unsaved or false if the ids are nonexistent
   */
  @Mutation(() => Boolean)
  async unsaveSong(@Arg("saveSongInput") saveSongInput: SaveSongInput): Promise<Boolean> {
    return await userRepo.unsaveSong(saveSongInput);
  }

  /***
   * Creates a Playlist
   *
   * @remarks
   * Returned PlaylistEntity includes the playlists relation for immediate frontend routing to the playlist page
   *
   * @params createPlaylistInput An object containing a User id and Playlist name
   * @returns A promise of a Playlist with the given name or null if no User exists with the given id or name already
   *          exists
   */
  @Mutation(() => PlaylistEntity, { nullable: true })
  async createPlaylist(
    @Arg("createPlaylistInput") createPlaylistInput: CreatePlaylistInput
  ): Promise<PlaylistEntity | null> {
    return await userRepo.createPlaylist(createPlaylistInput);
  }

  // @Mutation()
  // async deletePlaylist() {}

  // @Mutation()
  // async addSongToPlaylist() {}

  // @Mutation()
  // async removeSongFromPlaylist() {}
}
