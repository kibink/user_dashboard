import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUsers } from "@/features/users/api";
import { useNavigate } from "react-router";

export const useBlockUsers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: blockUsers,
    onSuccess: (data) => {
      if (data.selfBlocked) {
        navigate("/blocked");
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["users", "all"] });
      }
    },
  });
};
