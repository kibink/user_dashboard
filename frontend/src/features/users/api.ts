import { api } from "@/lib/axios";

export const getMe = () => {
  return api.get("/users/me").then(res => res.data);
};

export const getUserById = (id: string) => {
  return api.get(`/users/${id}`).then(res => res.data);
}

export const getAllUsers = () => {
  return api.get("/users").then(res => res.data);
}

export const deleteUsers = (data: {ids: string[], isVerified?: boolean}) => {
  return api.post("/users/delete", data).then(res => res.data)
}

export const blockUsers = (data: {ids: string[]}) => {
  return api.post("/users/block", data).then(res => res.data)
}

export const unblockUsers = (data: {ids: string[]}) => {
  return api.post("/users/unblock", data)
}

