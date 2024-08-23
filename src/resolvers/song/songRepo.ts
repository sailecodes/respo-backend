import dataSource from "../../dataSource";
import Song from "../../entities/Song";
import artistRepo from "../artist/artistRepo";
import AddSongInput from "./inputs/AddSongInput";

const songRepo = dataSource.getRepository(Song).extend({
  async addSong({ artistId, ...rest }: AddSongInput) {
    const songArtist = await artistRepo.findOneBy({ id: artistId });

    if (!songArtist) return null;

    const newSong = this.create({ artist: songArtist, ...rest });
    const newSongId = (await this.insert(newSong)).identifiers[0].id;

    return await this.findOne({ where: { id: newSongId }, relations: { artist: true } });
  },
});

export default songRepo;
