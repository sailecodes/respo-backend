import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { userRepo } from "./user.repo";
import { AddUserInput } from "./inputs/add-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";
import { IdArgs } from "../utils/args/user-id.args";
import { UserEntity } from "../../entities/user.entity";

/**
 * Defines the queries, mutations, and field resolvers for the User Entity
 */
@Resolver()
export class UserResolver {
  /**
   * Gets an array of every User
   *
   *  ---------------------------------------------
   *  --- Purely for admin and testing purposes ---
   *  ---------------------------------------------
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
   * @param userIdArgs An object containing the User id
   * @returns A promise of a User that matches the id or null if no user exists with the id
   */
  @Query(() => UserEntity, { nullable: true })
  async getUser(@Args() idArgs: IdArgs): Promise<UserEntity | null> {
    return await userRepo.getUser(idArgs);
  }

  /**
   * Adds a User with the given information
   *
   *  ---------------------------------------------
   *  --- Purely for admin and testing purposes ---
   *  ---------------------------------------------
   *
   * @param addUserInput The User information
   * @returns A promise of User with the given information
   */
  @Mutation(() => UserEntity)
  async addUser(
    @Arg("addUserInput") addUserInput: AddUserInput,
  ): Promise<UserEntity> {
    return await userRepo.addUser(addUserInput);
  }

  /**
   * Updates a User with the given information
   *
   * [Authorized]
   *
   * @param updateUserInput An object containing new User information
   * @returns A promise of a User with updated information or null if no user exists with the id
   */
  @Mutation(() => UserEntity, { nullable: true })
  async updateUser(
    @Arg("updateUserInput") updateUserInput: UpdateUserInput,
  ): Promise<UserEntity | null> {
    return await userRepo.updateUser(updateUserInput);
  }

  /**
   * Deletes a User with the given id
   *
   * [Authorized]
   *
   * @param userIdArgs An object containing the User id
   * @returns A promise of a Boolean true if a User with the given id was deleted or false if no user exists with
   *          the id
   */
  @Mutation(() => Boolean)
  async deleteUser(@Args() idArgs: IdArgs): Promise<Boolean> {
    return await userRepo.deleteUser(idArgs);
  }

  // @Mutation()
  // async saveSong() {}

  // @Mutation()
  // async unsaveSong() {}

  // @Mutation()
  // async createPlaylist() {}

  // @Mutation()
  // async deletePlaylist() {}

  // @Mutation()
  // async addSongToPlaylist() {}

  // @Mutation()
  // async removeSongFromPlaylist() {}
}
