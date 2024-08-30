import { dataSource } from "../../dataSource";
import { SongEntity } from "../../entities/song.entity";
import { artistRepo } from "../artist/artist.repo";
import { userRepo } from "../user/user.repo";
import { IdArgs } from "../utils/args/id.args";
import { IContext } from "../utils/interfaces/context.interface";
import { AddSongInput } from "./inputs/add-song.input";
import {
  SONG_NONEXISTENT_ERR_MESSAGE,
  SONG_NOT_UNIQUE_ERR_MESSAGE,
  USER_NONEXISTENT_ERR_MESSAGE,
} from "../../constants";

/**
 * See song.resolver.ts for method descriptions
 */
export const songRepo = dataSource.getRepository(SongEntity).extend({
  async getSong({ id }: IdArgs): Promise<SongEntity | null> {
    return await this.findOneBy({ id });
  },

  // FIXME: Error? if no artist was found?
  async addSong({ artistId, ...rest }: AddSongInput): Promise<SongEntity | null> {
    const songArtist = await artistRepo.findOneBy({ id: artistId });

    if (!songArtist) return null;

    const newSong = this.create({ artist: songArtist, ...rest });
    const newSongId = (await this.insert(newSong)).identifiers[0].id;

    return await this.findOne({ where: { id: newSongId }, relations: { artist: true } });
  },

  //////////////////////////////////////////////

  async saveSong({ id }: IdArgs, { req }: IContext): Promise<boolean> {
    const user = await userRepo.findOne({
      where: { id: req.session.uid },
      relations: { savedSongs: true },
    });

    if (!user) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    const songToSave = await this.findOneBy({ id });

    if (!songToSave) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);
    else if (user.savedSongs.some((savedSong) => savedSong.id === songToSave.id))
      throw new Error(SONG_NOT_UNIQUE_ERR_MESSAGE);

    user.savedSongs.push(songToSave);

    await userRepo.save(user);

    return true;
  },

  async unsaveSong({ id }: IdArgs, { req }: IContext): Promise<boolean> {
    const user = await userRepo.findOne({
      where: { id: req.session.uid },
      relations: { savedSongs: true },
    });

    if (!user) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    const songToSave = await this.findOneBy({ id });

    if (!songToSave) throw new Error(SONG_NONEXISTENT_ERR_MESSAGE);

    const originalLength = user.savedSongs.length;
    user.savedSongs = user.savedSongs.filter((savedSong) => savedSong.id !== songToSave.id);

    await userRepo.save(user);

    return originalLength !== user.savedSongs.length;
  },
});
