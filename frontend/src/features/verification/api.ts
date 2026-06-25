import { api } from "@/lib/axios";

export const sendVerificationEmail = () => {
  return api.post("/verification/email");
};

export const verifyUser = (verificationCode: string) => {
  return api.post("/verification/verify", null, {
    params: { verificationCode: verificationCode },
  });
};
