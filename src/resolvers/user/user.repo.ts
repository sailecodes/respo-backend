import { compare, genSalt, hash } from "bcrypt";
import { dataSource } from "../../dataSource";
import { PlaylistEntity } from "../../entities/playlist.entity";
import { UserEntity } from "../../entities/user.entity";
import { playlistRepo } from "../playlist/playlist.repo";
import { songRepo } from "../song/song.repo";
import { IdArgs } from "../utils/args/id.args";
import { IContext } from "../utils/interfaces/context.interface";
import { LoginUserArgs } from "./args/login-user-args";
import { UserRelationFlagArgs } from "./args/user-relation-flag.args";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import { RegisterUserInput } from "./inputs/register-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";
import {
  EMAIL_NOT_UNIQUE_ERR_MESSAGE,
  PASSWORD_INCORRECT_ERR_MESSAGE,
  PLAYLIST_NAME_NOT_UNIQUE_ERR_MESSAGE,
  PLAYLIST_NONEXISTENT_ERR_MESSAGE,
  SONG_NONEXISTENT_ERR_MESSAGE,
  SONG_NOT_UNIQUE_ERR_MESSAGE,
  UNAUTHENTICATED_ERR_MESSAGE,
  USER_NONEXISTENT_ERR_MESSAGE,
  USERNAME_NOT_UNIQUE_ERR_MESSAGE,
} from "../../constants";
import { AddSongToPlaylistInput } from "./inputs/add-song-to-playlist.input";

/**
 * See user.resolver.ts for method descriptions
 */
export const userRepo = dataSource.getRepository(UserEntity).extend({
  async registerUser({ email, username, password }: RegisterUserInput): Promise<UserEntity> {
    if (await this.existsBy({ email })) throw new Error(EMAIL_NOT_UNIQUE_ERR_MESSAGE);
    else if (await this.existsBy({ username })) throw new Error(USERNAME_NOT_UNIQUE_ERR_MESSAGE);

    const hashedPassword = await hash(password, await genSalt(10));

    const newUser = this.create({
      password: hashedPassword,
      email,
      username,
    });
    const newUserId = (await this.insert(newUser)).identifiers[0].id;

    return (await this.findOneBy({ id: newUserId }))!;
  },

  async loginUser({ username, password }: LoginUserArgs, { req }: IContext): Promise<UserEntity> {
    const loggedUser = await this.findOneBy({ username });

    if (!loggedUser) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);
    else if (!(await compare(password, loggedUser.password))) throw new Error(PASSWORD_INCORRECT_ERR_MESSAGE);

    req.session.uid = loggedUser.id;
    req.session.role = "user";

    return loggedUser;
  },

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.find();
  },

  async logoutUser({ res }: IContext): Promise<boolean> {
    res.clearCookie(process.env.COOKIE_NAME!);

    return true;
  },

  async getUser({ id }: IdArgs, { savedSongs, playlists }: UserRelationFlagArgs): Promise<UserEntity | null> {
    return await this.findOne({
      where: { id },
      relations: {
        savedSongs,
        playlists: { songs: true },
      },
    });
  },

  async updateUser(updateUserInput: UpdateUserInput, { req }: IContext): Promise<UserEntity> {
    const isUpdateSuccessful = (await this.update(req.session.uid!, updateUserInput)).affected;

    if (isUpdateSuccessful === 0) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    return (await this.findOneBy({ id: req.session.uid }))!;
  },

  async deleteUser({ req, res }: IContext): Promise<boolean> {
    const isDeleteSuccessful = (await this.delete(req.session.uid!)).affected;

    if (isDeleteSuccessful === 0) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }

        res.clearCookie(process.env.COOKIE_NAME!);

        resolve(true);
      });
    });
  },

  async saveSong({ id }: IdArgs, { req }: IContext): Promise<boolean> {
    const user = await this.findOne({
      where: { id: req.session.uid },
      relations: { savedSongs: true },
    });

    if (!user) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    const songToSave = await songRepo.findOneBy({ id });

    if (!songToSave) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);
    else if (user.savedSongs.some((savedSong) => savedSong.id === songToSave.id))
      throw new Error(SONG_NOT_UNIQUE_ERR_MESSAGE);

    user.savedSongs.push(songToSave);

    await this.save(user);

    return true;
  },

  async unsaveSong({ id }: IdArgs, { req }: IContext): Promise<boolean> {
    const user = await this.findOne({
      where: { id: req.session.uid },
      relations: { savedSongs: true },
    });

    if (!user) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    const songToSave = await songRepo.findOneBy({ id });

    if (!songToSave) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);

    const originalLength = user.savedSongs.length;
    user.savedSongs = user.savedSongs.filter((savedSong) => savedSong.id !== songToSave.id);

    await this.save(user);

    return originalLength !== user.savedSongs.length;
  },

  async createPlaylist({ name }: CreatePlaylistInput, { req }: IContext): Promise<PlaylistEntity> {
    const playlistOwner = await this.findOne({
      where: { id: req.session.uid },
      relations: { playlists: true },
    });

    if (!playlistOwner) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);
    else if (playlistOwner.playlists.some((playlist) => playlist.name === name))
      throw new Error(PLAYLIST_NAME_NOT_UNIQUE_ERR_MESSAGE);

    const newPlaylist = playlistRepo.create({
      name,
      owner: playlistOwner,
    });
    const newPlaylistId = (await playlistRepo.insert(newPlaylist)).identifiers[0].id;

    return (await playlistRepo.findOne({
      where: { id: newPlaylistId },
      relations: { owner: true, songs: true },
    }))!;
  },

  async deletePlaylist({ id }: IdArgs, { req }: IContext): Promise<boolean> {
    const playlistOwner = await this.findOneBy({ id: req.session.uid });

    if (!playlistOwner) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    const playlistToDelete = await playlistRepo.findOneBy({ id });

    if (!playlistToDelete) throw new Error(PLAYLIST_NONEXISTENT_ERR_MESSAGE);
    else if (playlistToDelete.owner.id !== req.session.uid) throw new Error(UNAUTHENTICATED_ERR_MESSAGE);

    return (await playlistRepo.delete(id)).affected === 1;
  },

  async addSongToPlaylist({ songId, playlistId }: AddSongToPlaylistInput, { req }: IContext): Promise<boolean> {
    const songToAdd = await songRepo.findOneBy({ id: songId });

    if (!songToAdd) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);

    const playlist = await playlistRepo.findOne({
      where: { id: playlistId },
      relations: {
        owner: true,
        songs: true,
      },
    });

    if (!playlist) throw new Error(PLAYLIST_NONEXISTENT_ERR_MESSAGE);
    else if (playlist.owner.id !== req.session.uid) throw new Error(UNAUTHENTICATED_ERR_MESSAGE);
    else if (playlist.songs.some((song) => song.id === songToAdd.id)) throw new Error(SONG_NOT_UNIQUE_ERR_MESSAGE);

    playlist.songs.push(songToAdd);

    await playlistRepo.save(playlist);

    return true;
  },

  async removeSongFromPlaylist({ songId, playlistId }: AddSongToPlaylistInput, { req }: IContext): Promise<boolean> {
    const songToRemove = await songRepo.findOneBy({ id: songId });

    if (!songToRemove) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);

    const playlist = await playlistRepo.findOne({
      where: { id: playlistId },
      relations: {
        owner: true,
        songs: true,
      },
    });

    if (!playlist) throw new Error(PLAYLIST_NONEXISTENT_ERR_MESSAGE);
    else if (playlist.owner.id !== req.session.uid) throw new Error(UNAUTHENTICATED_ERR_MESSAGE);

    const originalLength = playlist.songs.length;
    playlist.songs = playlist.songs.filter((song) => song.id !== songId);

    await playlistRepo.save(playlist);

    return originalLength !== playlist.songs.length;
  },
});
