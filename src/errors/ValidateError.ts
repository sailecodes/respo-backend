// import { ValidationError } from "../types/validateError";

export class ValidateError extends Error {
  error: string = "class-validator";
  messages: string[];

  constructor(fails: any[]) {
    super();

    console.log(fails);
  }
}
