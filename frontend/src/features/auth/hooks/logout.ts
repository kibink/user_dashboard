import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "@/features/auth/api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onMutate: () => {
      localStorage.removeItem("token");
      queryClient.setQueryData(["users", "me"], null);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
};
