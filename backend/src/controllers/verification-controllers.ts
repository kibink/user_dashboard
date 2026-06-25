import { BackendError } from "@/middlewares/errors";
import { verifyUserSchema } from "@/schema/user";
import { getUserVerificationCode, verifyUser } from "@/services/user-services";
import { createHandler } from "@/utils/create";
import { sendVerificationCode } from "@/utils/email";

export const handleSendVerificationEmail = createHandler(async (req, res) => {
  const { id, name, email, isVerified } = res.locals.user;
  const verificationCode = await getUserVerificationCode(id);

  if (isVerified) {
    throw new BackendError("USER_ALREADY_VERIFIED");
  }

  await sendVerificationCode(name, email, verificationCode);
  res.sendStatus(204)
});

export const handleVerifyUser = createHandler(
  verifyUserSchema,
  async (req, res) => {
    const { verificationCode } = req.query;
    const { user } = res.locals;
    user.verificationCode = await getUserVerificationCode(user.id);
    if (user.isVerified) {
      throw new BackendError("USER_ALREADY_VERIFIED");
    }
    if (verificationCode != user.verificationCode) {
      throw new BackendError("INVALID_VERIFICATION_CODE");
    }
    verifyUser(user.id);
    res.sendStatus(204)
  },
);
