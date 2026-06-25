import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/features/users/api";

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users", "all"],
    queryFn: getAllUsers,
  });
};
