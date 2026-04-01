import { api } from "../client";
import type { User, UpdateUserPayload } from "./user.type";

const getMe = () => api.get<User>("auth/me");

const updateProfile = (data: UpdateUserPayload) =>
  api.patch<User>("user", data);

export const userService = { getMe, updateProfile };
