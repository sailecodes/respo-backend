import { Request, Response } from "express";
import { validate } from "class-validator";
import db from "../connection";
import TestUser from "../entities/User";
// import { ValidateError } from "../../errors/ValidateError";

export const testMethod = async (req: Request, res: Response) => {
  const testUser = new TestUser();

  testUser.email = "test5@g";
  testUser.username = "test5";
  testUser.password = "test5";

  const a = await validate(testUser, { validationError: { target: false } });

  // console.log("yeah");
  // console.log(a);

  if (a) throw new Error("asdf");

  await db.getRepository(TestUser).save(testUser);

  res.status(200).send();
};
