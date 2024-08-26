import { dataSource } from "../../dataSource";
import { SongEntity } from "../../entities/song.entity";
import { artistRepo } from "../artist/artist.repo";
import { AddSongInput } from "./inputs/add-song.input";

export const songRepo = dataSource.getRepository(SongEntity).extend({
  async getSong() {},

  async addSong({ artistId, ...rest }: AddSongInput) {
    const songArtist = await artistRepo.findOneBy({ id: artistId });

    if (!songArtist) return null;

    const newSong = this.create({ artist: songArtist, ...rest });
    const newSongId = (await this.insert(newSong)).identifiers[0].id;

    return await this.findOne({ where: { id: newSongId }, relations: { artist: true } });
  },
});
