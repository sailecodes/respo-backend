import { dataSource } from "../../dataSource";
import { PlaylistEntity } from "../../entities/playlist.entity";

export const playlistRepo = dataSource.getRepository(PlaylistEntity).extend({});
