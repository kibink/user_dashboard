import { actualizeLastActivity, getUserById } from "@/services/user-services";
import { createHandler } from "@/utils/create";
import { verifyToken } from "@/utils/jwt";
import jwt from "jsonwebtoken";
import { BackendError } from "./errors";

export function authenticate() {
  return createHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    let token;

    try {
      token = authorization.split(" ")[1];
    } catch {
      throw new BackendError("UNAUTHORIZED");
    }

    const userId = verifyToken(token, (err, userId) => {
      if (err) {
        throw new BackendError("UNAUTHORIZED", { details: err });
      }
      return userId;
    });

    const user = await getUserById(userId);

    if (!user) {
      throw new BackendError("UNAUTHORIZED");
    }

    await actualizeLastActivity(userId);

    res.locals.user = user;
    next();
  });
}
