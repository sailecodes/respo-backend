import { AuthChecker } from "type-graphql";
import { IContext } from "../interfaces/context.interface";
import { UNAUTHORIZED_LOGIN_ERR_MESSAGE, UNAUTHORIZED_ROLE_ERR_MESSAGE } from "../../../constants";

export const TopLevelAuthMiddleware: AuthChecker<IContext> = ({ context: { req } }, roles) => {
  if (!req.session || !req.session.uid) throw new Error(UNAUTHORIZED_LOGIN_ERR_MESSAGE);
  else if (roles.length > 0 && !roles.includes(req.session.role!)) throw new Error(UNAUTHORIZED_ROLE_ERR_MESSAGE);

  return true;
};
