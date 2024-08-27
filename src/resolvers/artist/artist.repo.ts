import { IdArgs } from "./../utils/args/id.args";
import { dataSource } from "../../dataSource";
import { ArtistEntity } from "../../entities/artist.entity";
import { AddArtistInput } from "./inputs/add-artist.input";

/**
 * See artist.resolver.ts for method descriptions
 */
export const artistRepo = dataSource.getRepository(ArtistEntity).extend({
  async getArtist({ id }: IdArgs): Promise<ArtistEntity | null> {
    return await this.findOne({ where: { id }, relations: { songs: true } });
  },

  async addArtist(addArtistInput: AddArtistInput): Promise<ArtistEntity> {
    const newArtist = this.create(addArtistInput);
    const newArtistId = (await this.insert(newArtist)).identifiers[0].id;

    return (await this.findOneBy({ id: newArtistId }))!;
  },
});
