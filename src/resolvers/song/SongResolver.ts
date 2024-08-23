import { Arg, Mutation, Resolver } from "type-graphql";
import songRepo from "./songRepo";
import AddSongInput from "./inputs/AddSongInput";

@Resolver()
export default class SongResolver {
  @Mutation(() => Boolean)
  async addSong(@Arg("addSongInput") addSongInput: AddSongInput) {
    return await songRepo.addSong(addSongInput);
  }
}
