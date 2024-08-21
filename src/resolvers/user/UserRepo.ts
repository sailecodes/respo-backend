import dataSource from "../../dataSource";
import User from "../../entities/User";
import AddUserArgs from "./args/AddUserArgs";

const userRepo = dataSource.getRepository(User).extend({
  // async getAllUsers() {
  //   return await this.find();
  // },

  // async getUser(userId: string) {
  //   const existingUser = this.findOne({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   // TODO: Update error
  //   if (!existingUser) throw Error("User does not exist.");

  //   return existingUser;
  // },

  async addUser(userData: AddUserArgs) {
    console.log("adding user");

    const createdUser = this.create(userData);

    console.log("finished adding user");

    return await this.save(createdUser);
  },
});

export default userRepo;
