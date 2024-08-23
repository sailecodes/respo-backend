import dataSource from "../../dataSource";
import Playlist from "../../entities/Playlist";

const playlistRepo = dataSource.getRepository(Playlist).extend({});

export default playlistRepo;
