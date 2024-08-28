import { MiddlewareFn } from "type-graphql";
import { IContext } from "../interfaces/context.interface";
import { UNAUTHENTICATED_ACCESS_ERR_MESSAGE } from "../../../constants";

export const SameUserAuthMiddleware: MiddlewareFn<IContext> = ({ context: { req }, args }, next) => {
  let arg: { userId?: string; id?: string } | null = null;

  for (var prop in args) {
    arg = args[prop];
    break;
  }

  if (arg === null || typeof arg === "string") arg = args;

  const userId = arg.userId ? arg.userId : arg.id;

  if (req.session.uid !== userId) throw new Error(UNAUTHENTICATED_ACCESS_ERR_MESSAGE);

  return next();
};
