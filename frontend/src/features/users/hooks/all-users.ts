import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/features/users/api";
import type { User } from "@/types/users";

export const useAllUsers = (): UseQueryResult<User[], Error> => {
  return useQuery<User[], Error>({
    queryKey: ["users", "all"],
    queryFn: getAllUsers,
  });
};
