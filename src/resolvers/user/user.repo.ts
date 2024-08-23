import { dataSource } from "../../dataSource";
import { UserEntity } from "../../entities/user.entity";
import { UserIdArgs } from "../utils/args/user-id.args";
import { AddUserInput } from "./inputs/add-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";

/**
 * See UserResolver.ts for method descriptions
 */
export const userRepo = dataSource.getRepository(UserEntity).extend({
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

  // async saveSong() {
  //   const songToSave = await songRepo.findOneBy({ id: songId });
  //   const user = await this.findOneBy({ id: userId });

  //   if (!songToSave || !user) return null;

  //   user.savedSongs.push(songToSave);
  // },
});
