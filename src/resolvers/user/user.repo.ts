import { dataSource } from "../../dataSource";
import { PlaylistEntity } from "../../entities/playlist.entity";
import { UserEntity } from "../../entities/user.entity";
import { playlistRepo } from "../playlist/playlist.repo";
import { songRepo } from "../song/song.repo";
import { IdArgs } from "../utils/args/id.args";
import { UserRelationFlagArgs } from "./args/user-relation-flag.args";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import { RegisterUserInput } from "./inputs/register-user.input";
import { SaveSongInput } from "./inputs/save-song.input";
import { UpdateUserInput } from "./inputs/update-user.input";

/**
 * See user.resolver.ts for method descriptions
 */
export const userRepo = dataSource.getRepository(UserEntity).extend({
  async registerUser(registerUserInput: RegisterUserInput): Promise<UserEntity> {
    const newUser = this.create(registerUserInput);
    const newUserId = (await this.insert(newUser)).identifiers[0].id;

    return (await this.findOneBy({ id: newUserId }))!;
  },

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.find();
  },

  async getUser({ id }: IdArgs, { savedSongs, playlists }: UserRelationFlagArgs): Promise<UserEntity | null> {
    return await this.findOne({
      where: { id },
      relations: {
        savedSongs,
        playlists,
      },
    });
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

    const user = await this.findOne({
      where: { id: userId },
      relations: { savedSongs: true },
    });

    // TODO: Should I return an error with a more descriptive reason?
    if (!user || user.savedSongs.some((savedSong) => savedSong.id === songToSave.id)) return false;

    user.savedSongs.push(songToSave);

    await this.save(user);

    return true;
  },

  async unsaveSong({ userId, songId }: SaveSongInput): Promise<Boolean> {
    const songToSave = await songRepo.findOneBy({ id: songId });

    if (!songToSave) return false;

    const user = await this.findOne({
      where: { id: userId },
      relations: { savedSongs: true },
    });

    if (!user) return false;

    const originalLength = user.savedSongs.length;
    user.savedSongs = user.savedSongs.filter((savedSong) => savedSong.id !== songToSave.id);

    await this.save(user);

    return user.savedSongs.length !== originalLength;
  },

  async createPlaylist({ userId, name }: CreatePlaylistInput): Promise<PlaylistEntity | null> {
    const playlistOwner = await this.findOne({
      where: { id: userId },
      relations: { playlists: true },
    });

    // TODO: Second conditional: should it be here or in a decorator?
    if (!playlistOwner || playlistOwner.playlists.some((playlist) => playlist.name === name)) return null;

    const newPlaylist = playlistRepo.create({ name, owner: playlistOwner });
    const newPlaylistId = (await playlistRepo.insert(newPlaylist)).identifiers[0].id;

    return (await playlistRepo.findOne({
      where: { id: newPlaylistId },
      relations: { owner: true, songs: true },
    }))!;
  },
});
