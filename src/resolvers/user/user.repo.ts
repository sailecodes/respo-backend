import { compare, genSalt, hash } from "bcrypt";
import { dataSource } from "../../dataSource";
import { UserEntity } from "../../entities/user.entity";
import { IdArgs } from "../utils/args/id.args";
import { IContext } from "../utils/interfaces/context.interface";
import { LoginUserArgs } from "./args/login-user-args";
import { UserRelationFlagArgs } from "./args/user-relation-flag.args";
import { RegisterUserInput } from "./inputs/register-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";
import {
  EMAIL_NOT_UNIQUE_ERR_MESSAGE,
  PASSWORD_INCORRECT_ERR_MESSAGE,
  USER_NONEXISTENT_ERR_MESSAGE,
  USERNAME_NOT_UNIQUE_ERR_MESSAGE,
} from "../../constants";

/**
 * See user.resolver.ts for method descriptions
 */
export const userRepo = dataSource.getRepository(UserEntity).extend({
  async registerUser({ email, username, password }: RegisterUserInput): Promise<UserEntity> {
    if (await this.existsBy({ email })) throw new Error(EMAIL_NOT_UNIQUE_ERR_MESSAGE);
    else if (await this.existsBy({ username })) throw new Error(USERNAME_NOT_UNIQUE_ERR_MESSAGE);

    const hashedPassword = await hash(password, await genSalt(10));

    const newUser = this.create({
      password: hashedPassword,
      email,
      username,
    });
    const newUserId = (await this.insert(newUser)).identifiers[0].id;

    return (await this.findOneBy({ id: newUserId }))!;
  },

  async loginUser({ username, password }: LoginUserArgs, { req }: IContext): Promise<UserEntity> {
    const loggedUser = await this.findOneBy({ username });

    if (!loggedUser) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);
    else if (!(await compare(password, loggedUser.password))) throw new Error(PASSWORD_INCORRECT_ERR_MESSAGE);

    req.session.uid = loggedUser.id;
    req.session.role = "user";

    return loggedUser;
  },

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.find();
  },

  async logoutUser({ res }: IContext): Promise<boolean> {
    res.clearCookie(process.env.COOKIE_NAME!);

    return true;
  },

  async getUser({ id }: IdArgs, { savedSongs, playlists }: UserRelationFlagArgs): Promise<UserEntity | null> {
    return await this.findOne({
      where: { id },
      relations: {
        savedSongs,
        playlists: { songs: true },
      },
    });
  },

  async updateUser(updateUserInput: UpdateUserInput, { req }: IContext): Promise<UserEntity> {
    const isUpdateSuccessful = (await this.update(req.session.uid!, updateUserInput)).affected;

    if (isUpdateSuccessful === 0) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    return (await this.findOneBy({ id: req.session.uid }))!;
  },

  async deleteUser({ req, res }: IContext): Promise<boolean> {
    const isDeleteSuccessful = (await this.delete(req.session.uid!)).affected;

    if (isDeleteSuccessful === 0) throw new Error(USER_NONEXISTENT_ERR_MESSAGE);

    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }

        res.clearCookie(process.env.COOKIE_NAME!);

        resolve(true);
      });
    });
  },
});
