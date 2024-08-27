import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { userRepo } from "./user.repo";
import { UpdateUserInput } from "./inputs/update-user.input";
import { IdArgs } from "../utils/args/id.args";
import { UserEntity } from "../../entities/user.entity";
import { RegisterUserInput } from "./inputs/register-user.input";
import { SaveSongInput } from "./inputs/save-song.input";
import { RelationFlagArgs } from "./args/relation-flag.args";

/**
 * Defines the queries, mutations, and field resolvers for the User entity
 */
@Resolver()
export class UserResolver {
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
   * Gets a User with the given id
   *
   * @remark
   * relationFlagArgs is a flag representation of which relations the User wants
   *
   * @param idArgs An object containing the User id
   * @returns A promise of a User that matches the id or null if no user exists with the id
   */
  @Query(() => UserEntity, { nullable: true })
  async getUser(@Args() idArgs: IdArgs, @Args() relationFlagArgs: RelationFlagArgs): Promise<UserEntity | null> {
    return await userRepo.getUser(idArgs, relationFlagArgs);
  }

  /**
   * Registers a User with the given information
   *
   * @param registerUserInput An object containing information about the User
   * @returns A promise of a User with the given information
   */
  @Mutation(() => UserEntity)
  async registerUser(@Arg("registerUserInput") registerUserInput: RegisterUserInput): Promise<UserEntity> {
    return await userRepo.registerUser(registerUserInput);
  }

  /**
   * Updates a User with the given information
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
   * Deletes a User with the given id
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
   * Saves a Song with the given id
   *
   * @param saveSongInput An object containing the User and Song ids
   * @returns A promise of a Boolean true if a Song with the given id was saved or false if the ids are nonexistent
   */
  @Mutation(() => Boolean)
  async saveSong(@Arg("saveSongInput") saveSongInput: SaveSongInput): Promise<Boolean> {
    return await userRepo.saveSong(saveSongInput);
  }

  @Mutation(() => Boolean)
  async unsaveSong(@Arg("saveSongInput") saveSongInput: SaveSongInput): Promise<Boolean> {
    return await userRepo.unsaveSong(saveSongInput);
  }

  // @Mutation()
  // async createPlaylist() {}

  // @Mutation()
  // async deletePlaylist() {}

  // @Mutation()
  // async addSongToPlaylist() {}

  // @Mutation()
  // async removeSongFromPlaylist() {}
}
