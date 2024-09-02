import { IdArgs } from "./../utils/args/id.args";
import { dataSource } from "../../dataSource";
import { ArtistEntity } from "../../entities/artist.entity";
import { AddArtistInput } from "./inputs/add-artist.input";
import { IContext } from "../utils/interfaces/context.interface";
import { userRepo } from "../user/user.repo";
import { ARTIST_NAME_NOT_UNIQUE_ERR_MESSAGE, USER_NONEXISTENT_ERR_MESSAGE } from "../../constants";

/**
 * See artist.resolver.ts for method descriptions
 */
export const artistRepo = dataSource.getRepository(ArtistEntity).extend({
  async getArtist({ id }: IdArgs): Promise<ArtistEntity | null> {
    return await this.findOne({
      where: { id },
      relations: { songs: true },
    });
  },

  async addArtist({ name }: AddArtistInput, { req }: IContext): Promise<ArtistEntity> {
    if (await this.existsBy({ name })) throw new Error(ARTIST_NAME_NOT_UNIQUE_ERR_MESSAGE);

    const relatedUser = await userRepo.findOneBy({ id: req.session.uid });

    if (!relatedUser) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    const newArtist = this.create({ user: relatedUser, name });
    const newArtistId = (await this.insert(newArtist)).identifiers[0].id;

    return (await this.findOne({ where: { id: newArtistId }, relations: { user: true } }))!;
  },
});
