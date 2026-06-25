import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unblockUsers } from "@/features/users/api";

export const useUnblockUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unblockUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
