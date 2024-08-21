import dataSource from "../../dataSource";
import User from "./UserResolver";

const UserRepo = dataSource.getRepository(User).extend({
  async getAllUsers() {
    return await this.find();
  },
});

export default UserRepo;
