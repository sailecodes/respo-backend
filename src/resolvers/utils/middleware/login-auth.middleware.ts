import { AuthChecker } from "type-graphql";
import { IContext } from "../interfaces/context.interface";
import { UNAUTHORIZED_ACCESS_ERR_MESSAGE } from "../../../constants";

export const LoginAuthMiddleware: AuthChecker<IContext> = ({ context: { req } }) => {
  if (!req.session.uid) throw new Error(UNAUTHORIZED_ACCESS_ERR_MESSAGE);

  return true;
};
