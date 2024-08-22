import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import User from "../../entities/User";
import userRepo from "./userRepo";
import AddUserInput from "./inputs/AddUserInput";
import GetUserArgs from "./args/GetUserArgs";
import UpdateUserInput from "./inputs/UpdateUserInput";

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

  @Mutation(() => User)
  async addUser(@Arg("addUserInput") addUserInput: AddUserInput) {
    return await userRepo.addUser(addUserInput);
  }

  // Has the same return logic as getUser (see above)
  @Mutation(() => User, { nullable: true })
  async updateUser(@Arg("updateUserInput") updateUserInput: UpdateUserInput) {
    return await userRepo.updateUser(updateUserInput);
  }
}
