import { Args, Query, Resolver } from "type-graphql";
import User from "../../entities/User";
import userRepo from "./userRepo";
import AddUserArgs from "./args/AddUserArgs";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await userRepo.getAllUsers();
  }

  @Query(() => User)
  async addUser(@Args() userData: AddUserArgs) {
    return await userRepo.addUser(userData);
  }
}
