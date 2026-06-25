import { login } from "@/features/auth/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      navigate("/dashboard")
    },
  });
};
