import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { userRepo } from "./user.repo";
import { UpdateUserInput } from "./inputs/update-user.input";
import { IdArgs } from "../utils/args/id.args";
import { UserEntity } from "../../entities/user.entity";
import { RegisterUserInput } from "./inputs/register-user.input";
import { PlaylistEntity } from "../../entities/playlist.entity";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import { UserRelationFlagArgs } from "./args/user-relation-flag.args";
import { IContext } from "../utils/interfaces/context.interface";
import { LoginUserArgs } from "./args/login-user-args";
import { AddSongToPlaylistInput } from "./inputs/add-song-to-playlist.input";

/**
 * Defines the queries, mutations, and field resolvers for the User entity and related entities
 */
@Resolver()
export class UserResolver {
  /**
   * Registers a User
   *
   * @param registerUserInput An object containing register information about a User
   * @returns A promise of a User with the given information
   * @throws An Error if the email or username already exist
   */
  @Mutation(() => UserEntity)
  async registerUser(@Arg("registerUserInput") registerUserInput: RegisterUserInput): Promise<UserEntity> {
    return await userRepo.registerUser(registerUserInput);
  }

  /**
   * Logs in a User
   *
   * @param loginUserArgs An object containing login information about a User
   * @param ctx An object containing the req field
   * @returns A promise of a User matching the given information
   * @throws An Error if no User matches the username or the password is incorrect
   */
  @Query(() => UserEntity)
  async loginUser(@Args() loginUserArgs: LoginUserArgs, @Ctx() ctx: IContext): Promise<UserEntity> {
    return await userRepo.loginUser(loginUserArgs, ctx);
  }

  /**
   * Gets an array of every User
   *
   * @hidden
   *
   * @remarks
   * - Authorized route
   * - Role-restricted route
   *
   * @returns A promise of an array of every User or an empty array if there are no Users
   */
  @Authorized("admin")
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await userRepo.getAllUsers();
  }

  /**
   * Gets a User
   *
   * @remarks
   * - Authorized route
   * - userRelationFlagArgs is a flag representation of which relations the User wants
   *
   * @param idArgs An object containing a User id
   * @returns A promise of a User that matches the given id or null if no User matches the id
   */
  @Authorized()
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
   * - Authorized route
   * - Same-user restricted route
   *
   * @param updateUserInput An object containing new information about a User
   * @returns A promise of a User with the updated information
   * @throws An Error if no User matches the given id
   */
  @Authorized()
  @Mutation(() => UserEntity)
  async updateUser(
    @Arg("updateUserInput") updateUserInput: UpdateUserInput,
    @Ctx() ctx: IContext
  ): Promise<UserEntity> {
    return await userRepo.updateUser(updateUserInput, ctx);
  }

  /**
   * Deletes a User
   *
   * @remarks
   * - Authorized route
   * - Same-user restricted route
   *
   * @param userIdArgs An object containing a User id
   * @returns A promise of a boolean true if a User with the given id was deleted or boolean false if an error occurred
   *          during the process of clearing the session cookie
   * @throws An Error if no User matches the id
   */
  @Authorized()
  @Mutation(() => Boolean)
  async deleteUser(@Ctx() ctx: IContext): Promise<boolean> {
    return await userRepo.deleteUser(ctx);
  }

  /**
   * Saves a Song
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
    return await userRepo.saveSong(idArgs, ctx);
  }

  /**
   * Unsaves a Song
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
    return await userRepo.unsaveSong(idArgs, ctx);
  }

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
    return await userRepo.createPlaylist(createPlaylistInput, ctx);
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
    return await userRepo.deletePlaylist(idArgs, ctx);
  }

  @Mutation(() => Boolean)
  async addSongToPlaylist(
    @Arg("addSongToPlaylistInput") addSongToPlaylistInput: AddSongToPlaylistInput,
    @Ctx() ctx: IContext
  ): Promise<boolean> {
    return await userRepo.addSongToPlaylist(addSongToPlaylistInput, ctx);
  }

  // @Mutation()
  // async removeSongFromPlaylist() {}
}
