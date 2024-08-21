import { Args, Query, Resolver } from "type-graphql";
import User from "../../entities/User";
import userRepo from "./userRepo";
import AddUserArgs from "./args/AddUserArgs";
import GetUserArgs from "./args/GetUserArgs";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await userRepo.getAllUsers();
  }

  // Fn can return null if userId is a valid UUID but is nonexistent in the database
  @Query(() => User, { nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs) {
    return await userRepo.getUser(getUserArgs);
  }

  @Query(() => User)
  async addUser(@Args() addUserArgs: AddUserArgs) {
    return await userRepo.addUser(addUserArgs);
  }
}
