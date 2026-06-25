import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyToken = (token: string, callback: (err: Error, data: String) => any) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, callback);
};
