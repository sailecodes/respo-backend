import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import User from "../../entities/User";
import userRepo from "./userRepo";
import AddUserInput from "./inputs/AddUserInput";
import UserIdArgs from "../utils/args/UserIdArgs";
import UpdateUserInput from "./inputs/UpdateUserInput";

/**
 * Defines the queries, mutations, and field resolvers for the User Entity
 */
@Resolver()
export default class UserResolver {
  /**
   * Gets all Users
   *
   * @returns An array with all Users or an empty array
   */
  @Query(() => [User])
  async getAllUsers() {
    return await userRepo.getAllUsers();
  }

  /**
   * Gets a User based on an id
   *
   * @param userIdArgs An object containing the User id
   * @returns The User that matches the id or null if no user exists with the id
   */
  @Query(() => User, { nullable: true })
  async getUser(@Args() userIdArgs: UserIdArgs) {
    return await userRepo.getUser(userIdArgs);
  }

  /**
   * Adds a User with the given information
   *
   * @param addUserInput An object containing the User information
   * @returns The newly created User
   */
  @Mutation(() => User)
  async addUser(@Arg("addUserInput") addUserInput: AddUserInput) {
    return (await userRepo.addUser(addUserInput))!;
  }

  /**
   * Updates a User with the given information
   *
   * @param updateUserInput An object containing new User information
   * @returns The updated User or null if no user exists with the id
   */
  @Mutation(() => User, { nullable: true })
  async updateUser(@Arg("updateUserInput") updateUserInput: UpdateUserInput) {
    return await userRepo.updateUser(updateUserInput);
  }

  /**
   * Deletes a User based on an id
   *
   * @param userIdArgs An object containing the User id
   * @returns True if a User with the id was deleted or false if no user exists with the id
   */
  @Mutation(() => Boolean)
  async deleteUser(@Args() userIdArgs: UserIdArgs) {
    return await userRepo.deleteUser(userIdArgs);
  }
}
