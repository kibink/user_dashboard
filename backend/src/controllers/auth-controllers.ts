import { BackendError } from "@/middlewares/errors";
import { addUserSchema, loginSchema } from "@/schema/user";
import { getUserCredentialsByEmail, addUser, actualizeLastLogin } from "@/services/user-services";
import { createHandler } from "@/utils/create";
import { generateToken } from "@/utils/jwt";
import argon2 from "argon2";

export const handleRegister = createHandler(addUserSchema, async (req, res) => {
  const payload = req.body;

  const user = await addUser(payload);
  const accessToken = generateToken(user.id);
  res.status(201).json({ user, accessToken });
});

export const handleLogin = createHandler(loginSchema, async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserCredentialsByEmail(email);

  if (!user) {
    throw new BackendError("USER_NOT_FOUND")
  }

  const matchPassword = await argon2.verify(user.password, password, {
    secret: Buffer.from(process.env.ARGON2_SECRET),
  });

  if (!matchPassword) {
    throw new BackendError("INVALID_PASSWORD");
  }

  await actualizeLastLogin(user.id)

  const accessToken = generateToken(user.id);
  res.status(200).json({ accessToken });
});
