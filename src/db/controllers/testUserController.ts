import { Request, Response } from "express";
// import { validate } from "class-validator";
import dataSource from "../dataSource";
import User from "../entities/User";
// import { ValidateError } from "../../errors/ValidateError";

export const testMethod = async (req: Request, res: Response) => {
  const user = new User();

  user.email = "test1@gmail.com";
  user.username = "test1";
  user.password = "test1";

  // const a = await validate(testUser, { validationError: { target: false } });

  // console.log("yeah");
  // console.log(a);

  // if (a) throw new Error("asdf");

  await dataSource.getRepository(User).save(user);

  res.status(200).send();
};
