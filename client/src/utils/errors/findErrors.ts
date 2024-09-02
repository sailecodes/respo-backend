import { ApolloError } from "@apollo/client";
import {
  EMAIL_NOT_EMAIL_ERR_MSG,
  PASSWORD_LENGTH_ERR_MSG,
  USERNAME_MAX_LENGTH_ERR_MSG,
  USERNAME_MIN_LENGTH_ERR_MSG,
} from "./potentialErrors";

interface ValidationError {
  children: [];
  constraints: { [index: string]: string };
  property: string;
  target: unknown;
  value: string;
}

interface AffectedErrors {
  [index: string]: boolean;
}

const reformatErrors = (errs: string[]): { rerrs: string[]; affected: AffectedErrors } => {
  const rerrs: string[] = [];
  const affected: AffectedErrors = {};

  errs.map((err) => {
    if (err === USERNAME_MIN_LENGTH_ERR_MSG || err === USERNAME_MAX_LENGTH_ERR_MSG) {
      rerrs.push("Username must be more than 3 characters and shorter than 20 characters");
      affected.username = true;
    } else if (err === PASSWORD_LENGTH_ERR_MSG) {
      rerrs.push("Password must be longer than 8 characters");
      affected.password = true;
    } else if (err === EMAIL_NOT_EMAIL_ERR_MSG) {
      rerrs.push("Email must be in a valid email format");
      affected.email = true;
    }
  });

  return { rerrs, affected };
};

export const findErrors = (err: ApolloError): { rerrs: string[]; affected: AffectedErrors } => {
  const gerr = err.graphQLErrors[0];
  const errs: string[] = [];

  console.log(gerr);

  if (gerr.message === "Argument Validation Error") {
    const verrs: ValidationError[] = gerr.extensions!.validationErrors as ValidationError[];

    verrs.map((verr) => errs.push(verr.constraints[Object.keys(verr.constraints)[0]]));
  }

  console.log(errs);

  return reformatErrors(errs);
};
