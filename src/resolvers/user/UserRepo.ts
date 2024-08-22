import dataSource from "../../dataSource";
import User from "../../entities/User";
import AddUserInput from "./inputs/AddUserInput";
import UserIdArgs from "../utils/args/UserIdArgs";
import UpdateUserInput from "./inputs/UpdateUserInput";

const userRepo = dataSource.getRepository(User).extend({
  async getAllUsers() {
    return await this.find();
  },

  async getUser({ userId }: UserIdArgs) {
    return await this.findOneBy({ id: userId });
  },

  async addUser(addUserInput: AddUserInput) {
    const newUser = this.create(addUserInput);
    const newUserId = (await this.insert(newUser)).identifiers[0].id;

    return this.findOneBy({ id: newUserId });
  },

  async updateUser({ userId, ...rest }: UpdateUserInput) {
    const isUpdateSuccessful = (await this.update(userId, rest)).affected;

    if (isUpdateSuccessful === 0) return null;

    return await this.findOneBy({ id: userId });
  },

  async deleteUser({ userId }: UserIdArgs) {
    const isDeleteSuccessful = (await this.delete(userId)).affected;

    if (isDeleteSuccessful === 0) return false;

    return true;
  },
});

export default userRepo;
