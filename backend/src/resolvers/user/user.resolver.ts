import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { userRepo } from "./user.repo";
import { UpdateUserInput } from "./inputs/update-user.input";
import { IdArgs } from "../utils/args/id.args";
import { UserEntity } from "../../entities/user.entity";
import { RegisterUserInput } from "./inputs/register-user.input";
import { UserRelationFlagArgs } from "./args/user-relation-flag.args";
import { IContext } from "../utils/interfaces/context.interface";
import { LoginUserArgs } from "./args/login-user-args";

/**
 * Defines the queries, mutations, and field resolvers of the User and related entities
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
   * @param ctx An object containing the req and res fields
   * @returns A promise of a User matching the given information
   * @throws An Error if no User matches the username or the password is incorrect
   */
  @Query(() => UserEntity)
  async loginUser(@Args() loginUserArgs: LoginUserArgs, @Ctx() ctx: IContext): Promise<UserEntity> {
    return await userRepo.loginUser(loginUserArgs, ctx);
  }

  /**
   * Logs out a User
   *
   * @param ctx An object containing the req and res fields
   * @returns A Promise of a boolean true upon logging out
   */
  @Query(() => Boolean)
  async logoutUser(@Ctx() ctx: IContext): Promise<boolean> {
    return await userRepo.logoutUser(ctx);
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
}
