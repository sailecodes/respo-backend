import { dataSource } from "../../dataSource";
import { ArtistEntity } from "../../entities/artist.entity";
import { AddArtistInput } from "./inputs/add-artist.input";

export const artistRepo = dataSource.getRepository(ArtistEntity).extend({
  async addArtist(addArtistInput: AddArtistInput) {
    const newArtist = this.create(addArtistInput);
    const newArtistId = (await this.insert(newArtist)).identifiers[0].id;

    return await this.findOneBy({ id: newArtistId });
  },
});
