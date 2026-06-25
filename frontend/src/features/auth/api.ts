import { api } from "@/lib/axios";

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data).then((res) => res.data);
};

export const login = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data).then((res) => res.data);
};

export const logout = () => {
  return api.post("/auth/logout");
};
