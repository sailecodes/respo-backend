import dataSource from "../../dataSource";
import User from "../../entities/User";
import AddUserArgs from "./args/AddUserArgs";
import GetUserArgs from "./args/GetUserArgs";

const userRepo = dataSource.getRepository(User).extend({
  async getAllUsers() {
    return await this.find();
  },

  async getUser({ userId }: GetUserArgs) {
    const existingUser = this.findOne({
      where: {
        id: userId,
      },
    });

    // TODO: Update error
    if (!existingUser) throw Error("User does not exist.");

    return existingUser;
  },

  async addUser(addUserArgs: AddUserArgs) {
    const createdUser = this.create(addUserArgs);

    return await this.save(createdUser);
  },
});

export default userRepo;
