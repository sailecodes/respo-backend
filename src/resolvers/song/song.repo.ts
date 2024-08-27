import { dataSource } from "../../dataSource";
import { SongEntity } from "../../entities/song.entity";
import { artistRepo } from "../artist/artist.repo";
import { IdArgs } from "../utils/args/id.args";
import { AddSongInput } from "./inputs/add-song.input";

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
});
