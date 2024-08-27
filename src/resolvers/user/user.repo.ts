import { dataSource } from "../../dataSource";
import { UserEntity } from "../../entities/user.entity";
import { songRepo } from "../song/song.repo";
import { IdArgs } from "../utils/args/id.args";
import { RelationFlagArgs } from "./args/relation-flag.args";
import { RegisterUserInput } from "./inputs/register-user.input";
import { SaveSongInput } from "./inputs/save-song.input";
import { UpdateUserInput } from "./inputs/update-user.input";

/**
 * See user.resolver.ts for method descriptions
 */
export const userRepo = dataSource.getRepository(UserEntity).extend({
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.find();
  },

  async getUser({ id }: IdArgs, { savedSongs, playlists }: RelationFlagArgs): Promise<UserEntity | null> {
    return await this.findOne({
      where: { id },
      relations: {
        savedSongs,
        playlists,
      },
    });
  },

  async registerUser(registerUserInput: RegisterUserInput): Promise<UserEntity> {
    const newUser = this.create(registerUserInput);
    const newUserId = (await this.insert(newUser)).identifiers[0].id;

    return (await this.findOneBy({ id: newUserId }))!;
  },

  async updateUser({ userId, ...rest }: UpdateUserInput): Promise<UserEntity | null> {
    const isUpdateSuccessful = (await this.update(userId, rest)).affected;

    if (isUpdateSuccessful === 0) return null;

    return await this.findOneBy({ id: userId });
  },

  async deleteUser({ id }: IdArgs): Promise<Boolean> {
    const isDeleteSuccessful = (await this.delete(id)).affected;

    if (isDeleteSuccessful === 0) return false;

    return true;
  },

  async saveSong({ userId, songId }: SaveSongInput): Promise<Boolean> {
    const songToSave = await songRepo.findOneBy({ id: songId });

    if (!songToSave) return false;

    const user = await this.findOneBy({ id: userId });

    if (!user) return false;

    user.savedSongs.push(songToSave);

    return true;
  },
});
