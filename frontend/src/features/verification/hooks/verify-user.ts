import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyUser } from "@/features/verification/api";

export const useVerifyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });
};
