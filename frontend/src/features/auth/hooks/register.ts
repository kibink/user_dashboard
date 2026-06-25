import { register } from "@/features/auth/api";
import type { ApiError } from "@/types/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onError: (error: ApiError) => {
      switch (error.code) {
        case "CONFLICT":
          return "User already exists.";
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.setQueryData(["users", "me"], { ...data.user });
      navigate("/dashboard");
    },
  });
};
