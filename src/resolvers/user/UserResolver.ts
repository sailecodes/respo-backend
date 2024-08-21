import { Query, Resolver } from "type-graphql";
import User from "../../entities/User";
import UserRepository from "./UserRepo";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await UserRepository.getAllUsers();
  }
}
