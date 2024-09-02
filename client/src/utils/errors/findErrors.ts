import { ApolloError } from "@apollo/client";
import {
  EMAIL_NOT_EMAIL_TOAST_MSG,
  PASSWORD_LENGTH_TOAST_MSG,
  USERNAME_LENGTH_TOAST_MSG,
  PASSWORD_NONEMPTY_TOAST_MSG,
  USERNAME_NONEMPTY_TOAST_MSG,
  USER_DNE_TOAST_MSG,
  PASSWORD_INCORRECT_TOAST_MSG,
} from "../constants";

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
    const e = err.toLowerCase();

    if (e.includes("user") || e.includes("username")) {
      affected.username = true;

      if (e.includes("nonexistent")) rerrs.push(USER_DNE_TOAST_MSG);
      if (e.includes("3 characters") || e.includes("20 characters")) rerrs.push(USERNAME_LENGTH_TOAST_MSG);
      if (e.includes("1 characters")) rerrs.push(USERNAME_NONEMPTY_TOAST_MSG);
    } else if (e.includes("email")) {
      affected.email = true;

      rerrs.push(EMAIL_NOT_EMAIL_TOAST_MSG);
    } else if (e.includes("password")) {
      affected.password = true;

      if (e.includes("incorrect")) rerrs.push(PASSWORD_INCORRECT_TOAST_MSG);
      if (e.includes("8 characters")) rerrs.push(PASSWORD_LENGTH_TOAST_MSG);
      if (e.includes("1 characters")) rerrs.push(PASSWORD_NONEMPTY_TOAST_MSG);
    }
  });

  return { rerrs, affected };
};

export const findErrors = (err: ApolloError): { rerrs: string[]; affected: AffectedErrors } => {
  const gerr = err.graphQLErrors[0];
  const errs: string[] = [];

  if (gerr.message === "Argument Validation Error") {
    const verrs: ValidationError[] = gerr.extensions!.validationErrors as ValidationError[];

    verrs.map((verr) => errs.push(verr.constraints[Object.keys(verr.constraints)[0]]));
  } else {
    errs.push(gerr.message);
  }

  return reformatErrors(errs);
};
