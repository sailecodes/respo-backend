import dataSource from "../../dataSource";
import Song from "../../entities/Song";
import AddSongInput from "./inputs/AddSongInput";

const songRepo = dataSource.getRepository(Song).extend({
  async addSong(addSongInput: AddSongInput) {
    const newSong = this.create(addSongInput);

    return (await this.insert(newSong)).identifiers.length > 0;
  },
});

export default songRepo;
