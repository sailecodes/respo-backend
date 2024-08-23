import { Arg, Mutation, Resolver } from "type-graphql";
import { AddSongInput } from "./inputs/add-song.input";
import { songRepo } from "./song.repo";
import { SongEntity } from "../../entities/song.entity";

@Resolver()
export class SongResolver {
  @Mutation(() => SongEntity)
  async addSong(@Arg("addSongInput") addSongInput: AddSongInput) {
    return (await songRepo.addSong(addSongInput))!;
  }
}
