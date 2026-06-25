import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsers } from "@/features/users/api";
import { useNavigate } from "react-router";

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: (data) => {
      if (data.selfDeleted) {
        localStorage.removeItem("token");
        queryClient.setQueryData(["users", "me"], null);
        navigate("/login");
      } else {
        queryClient.invalidateQueries({ queryKey: ["users", "all"] });
      }
    },
  });
};
