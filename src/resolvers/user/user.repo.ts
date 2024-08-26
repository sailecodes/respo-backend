import { dataSource } from "../../dataSource";
import { UserEntity } from "../../entities/user.entity";
import { IdArgs } from "../utils/args/user-id.args";
import { AddUserInput } from "./inputs/add-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";

/**
 * See UserResolver.ts for method descriptions
 */
export const userRepo = dataSource.getRepository(UserEntity).extend({
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.find();
  },

  async getUser({ id }: IdArgs): Promise<UserEntity | null> {
    return await this.findOneBy({ id });
  },

  async addUser(addUserInput: AddUserInput): Promise<UserEntity> {
    const newUser = this.create(addUserInput);
    const newUserId = (await this.insert(newUser)).identifiers[0].id;

    return (await this.findOneBy({ id: newUserId }))!;
  },

  async updateUser({
    userId,
    ...rest
  }: UpdateUserInput): Promise<UserEntity | null> {
    const isUpdateSuccessful = (await this.update(userId, rest)).affected;

    if (isUpdateSuccessful === 0) return null;

    return await this.findOneBy({ id: userId });
  },

  async deleteUser({ id }: IdArgs): Promise<Boolean> {
    const isDeleteSuccessful = (await this.delete(id)).affected;

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
