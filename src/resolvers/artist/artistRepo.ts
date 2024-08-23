import dataSource from "../../dataSource";
import Artist from "../../entities/Artist";
import AddArtistInput from "./inputs/AddArtistInput";

const artistRepo = dataSource.getRepository(Artist).extend({
  async addArtist(addArtistInput: AddArtistInput) {
    const newArtist = this.create(addArtistInput);
    const newArtistId = (await this.insert(newArtist)).identifiers[0].id;

    const ret = await this.findOneBy({ id: newArtistId });

    console.log(ret);

    return ret;
  },
});

export default artistRepo;
