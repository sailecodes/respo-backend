import { AuthChecker } from "type-graphql";
import { IContext } from "../interfaces/context.interface";
import { UNAUTHORIZED_ACCESS_ERR_MESSAGE } from "../../../constants";

export const TopLevelAuthMiddleware: AuthChecker<IContext> = ({ context: { req } }, roles) => {
  if (!req.session.uid) throw new Error(UNAUTHORIZED_ACCESS_ERR_MESSAGE + ", please log in");
  else if (roles.length > 0 && !roles.includes(req.session.role!))
    throw new Error(UNAUTHORIZED_ACCESS_ERR_MESSAGE + ", higher privileges required");

  return true;
};
