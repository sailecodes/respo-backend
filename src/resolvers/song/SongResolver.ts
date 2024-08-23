import { Arg, Mutation, Resolver } from "type-graphql";
import songRepo from "./songRepo";
import AddSongInput from "./inputs/AddSongInput";
import Song from "../../entities/Song";

@Resolver()
export default class SongResolver {
  @Mutation(() => Song)
  async addSong(@Arg("addSongInput") addSongInput: AddSongInput) {
    return (await songRepo.addSong(addSongInput))!;
  }
}
