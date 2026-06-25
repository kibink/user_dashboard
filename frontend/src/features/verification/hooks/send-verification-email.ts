import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmail } from "@/features/verification/api";

export const useSendVerificationEmail = () => {
  return useMutation({
    mutationFn: sendVerificationEmail
  });
};
