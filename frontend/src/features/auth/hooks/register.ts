import { register } from "@/features/auth/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.setQueryData(["users", "me"], { ...data.user });
      navigate("/dashboard");
    },
  });
};
