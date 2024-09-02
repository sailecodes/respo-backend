import { dataSource } from "../../dataSource";
import { PlaylistEntity } from "../../entities/playlist.entity";
import { songRepo } from "../song/song.repo";
import { AddSongToPlaylistInput } from "./inputs/add-song-to-playlist.input";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import { userRepo } from "../user/user.repo";
import { IdArgs } from "../utils/args/id.args";
import { IContext } from "../utils/interfaces/context.interface";
import {
  PLAYLIST_NAME_NOT_UNIQUE_ERR_MESSAGE,
  PLAYLIST_NONEXISTENT_ERR_MESSAGE,
  SONG_NONEXISTENT_ERR_MESSAGE,
  SONG_NOT_UNIQUE_ERR_MESSAGE,
  UNAUTHENTICATED_ERR_MESSAGE,
  USER_NONEXISTENT_ERR_MESSAGE,
} from "../../constants";

/**
 * See playlist.resolver.ts for method descriptions
 */
export const playlistRepo = dataSource.getRepository(PlaylistEntity).extend({
  async createPlaylist({ name }: CreatePlaylistInput, { req }: IContext): Promise<PlaylistEntity> {
    const playlistOwner = await userRepo.findOne({
      where: { id: req.session.uid },
      relations: { playlists: true },
    });

    if (!playlistOwner) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);
    else if (playlistOwner.playlists.some((playlist) => playlist.name === name))
      throw new Error(PLAYLIST_NAME_NOT_UNIQUE_ERR_MESSAGE);

    const newPlaylist = this.create({
      name,
      owner: playlistOwner,
    });
    const newPlaylistId = (await this.insert(newPlaylist)).identifiers[0].id;

    return (await this.findOne({
      where: { id: newPlaylistId },
      relations: {
        owner: true,
        songs: true,
      },
    }))!;
  },

  async deletePlaylist({ id }: IdArgs, { req }: IContext): Promise<boolean> {
    const playlistOwner = await userRepo.findOneBy({ id: req.session.uid });

    if (!playlistOwner) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    const playlistToDelete = await this.findOneBy({ id });

    if (!playlistToDelete) throw new Error(PLAYLIST_NONEXISTENT_ERR_MESSAGE);
    else if (playlistToDelete.owner.id !== req.session.uid) throw new Error(UNAUTHENTICATED_ERR_MESSAGE);

    return (await this.delete(id)).affected === 1;
  },

  async addSongToPlaylist({ songId, playlistId }: AddSongToPlaylistInput, { req }: IContext): Promise<boolean> {
    const songToAdd = await songRepo.findOneBy({ id: songId });

    if (!songToAdd) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);

    const playlist = await this.findOne({
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

    await this.save(playlist);

    return true;
  },

  async removeSongFromPlaylist({ songId, playlistId }: AddSongToPlaylistInput, { req }: IContext): Promise<boolean> {
    const songToRemove = await songRepo.findOneBy({ id: songId });

    if (!songToRemove) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);

    const playlist = await this.findOne({
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

    await this.save(playlist);

    return originalLength !== playlist.songs.length;
  },
});
