import { getMe } from "@/features/users/api";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getMe,
    enabled: !!token,
  });
};
