import { apiClient } from "@/lib/api-client";
import {
  Dashboard,
  DeletionCheckResponse,
  GetSessionsResponse,
  UserAuth,
  UserPreference,
  UserProfile,
} from "@/types/user.type";
import { queryOptions } from "@tanstack/react-query";

export const getUser = queryOptions({
  queryKey: ["user", "profile"],
  queryFn: () => apiClient<UserAuth>("/v1/auth/me"),
});

export const getUserProfile = queryOptions({
  queryKey: ["user"],
  queryFn: () => apiClient<UserProfile>("/v1/users/me"),
});

export const getDashboard = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => apiClient<Dashboard>("/v1/dashboard"),
});

export const getDashboardActivities = queryOptions({
  queryKey: ["dashboardActivities"],
  queryFn: () => apiClient<UserProfile>("/v1/dashboard/activities"),
});

export const getUserPreferences = queryOptions({
  queryKey: ["userPreference"],
  queryFn: () => apiClient<UserPreference>("/v1/users/me/preferences"),
});

export const getSessions = queryOptions({
  queryKey: ["sessions"],
  queryFn: () => apiClient<GetSessionsResponse>("/v1/auth/sessions"),
});

export const getDeletionCheck = queryOptions({
  queryKey: ["deleteCheck"],
  queryFn: () => apiClient<DeletionCheckResponse>("/v1/users/me/deletion-check"),
});