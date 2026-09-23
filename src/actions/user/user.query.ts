import { apiClient } from "@/lib/api-client";
import { UserAuth, UserProfile } from "@/types/user.type";
import { queryOptions } from "@tanstack/react-query"

export const getUser = queryOptions({
  queryKey: ["user", "profile"],
  queryFn: () => apiClient<UserAuth>("/v1/auth/me"),
});

export const getUserProfile = queryOptions({
  queryKey: ["user"],
  queryFn: () => apiClient<UserProfile>("/v1/users/me"),
});
