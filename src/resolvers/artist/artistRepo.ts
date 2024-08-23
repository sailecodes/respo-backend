import dataSource from "../../dataSource";
import Artist from "../../entities/Artist";

const artistRepo = dataSource.getRepository(Artist).extend({});

export default artistRepo;
