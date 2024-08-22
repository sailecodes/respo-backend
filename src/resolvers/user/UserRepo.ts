import dataSource from "../../dataSource";
import User from "../../entities/User";
import AddUserInput from "./inputs/AddUserInput";
import GetUserArgs from "./args/GetUserArgs";
import UpdateUserInput from "./inputs/UpdateUserInput";

const userRepo = dataSource.getRepository(User).extend({
  async getAllUsers() {
    return await this.find();
  },

  async getUser({ userId }: GetUserArgs) {
    const existingUser = this.findOneBy({ id: userId });

    if (!existingUser) return null;

    return existingUser;
  },

  async addUser(addUserInput: AddUserInput) {
    return await this.insert(this.create(addUserInput));
  },

  // FIXME: Find more efficient implementation
  async updateUser({ userId, ...rest }: UpdateUserInput) {
    if (!(await this.existsBy({ id: userId }))) return null;

    await this.update(userId, rest);

    return await this.findOneBy({ id: userId });
  },
});

export default userRepo;
