import { apiClient } from "@/lib/api-client";
import { LoginResponse } from "@/types/auth.types";
import {
  AccountDeletionType,
  ChangePasswordType,
  OnboardingFormValues,
  UserPreference,
  UserProfile,
} from "@/types/user.type";
import { mutationOptions } from "@tanstack/react-query";

export const updateProfileMutation = mutationOptions({
  mutationKey: ["onboarding"],
  mutationFn: (payload: OnboardingFormValues) => {
    const location = Object.fromEntries(
      Object.entries(payload.location).filter(
        ([, value]) => value !== null && value !== undefined,
      ),
    );

    return apiClient<UserProfile>("/v1/users/me", {
      method: "PATCH",
      body: JSON.stringify({ ...payload, location }),
    });
  },
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["user"],
    });
  },
});

export const updateAvatarMutation = mutationOptions({
  mutationKey: ["update-avatar"],
  mutationFn: (payload: { avatar: File }) => {
    const formData = new FormData();

    if (payload.avatar) {
      formData.append("avatar", payload.avatar);
    }

    return apiClient<UserProfile>("/v1/users/me/avatar", {
      method: "PUT",
      body: formData,
    });
  },
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["user"],
    });
  },
});

export const deleteAvatarMutation = mutationOptions({
  mutationKey: ["delete-avatar"],
  mutationFn: () =>
    apiClient<"">("/v1/users/me/avatar", {
      method: "DELETE",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["user"],
    });
  },
});

export const updatePasswordMutation = mutationOptions({
  mutationKey: ["change-password"],
  mutationFn: (payload: ChangePasswordType) =>
    apiClient<LoginResponse>("/v1/auth/password/change", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
});

export const updateUserPreferencesMutation = mutationOptions({
  mutationKey: ["update-preferences"],
  mutationFn: (payload: Omit<UserPreference, "updatedAt">) =>
    apiClient<UserPreference>("/v1/users/me/preferences", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({ queryKey: ["userPreference"] });
  },
});

export const deleteSessionMutation = mutationOptions({
  mutationKey: ["deleteSession"],
  mutationFn: (sessionId: string) =>
    apiClient<{
      message: string;
      currentSessionRevoked: boolean;
    }>(`/v1/auth/sessions/${sessionId}`, {
      method: "DELETE",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey;

        return key.includes("sessions");
      },
    });
  },
});

export const deleteAccountMutation = mutationOptions({
  mutationKey: ["deleteAccount"],
  mutationFn: (payload:AccountDeletionType) =>
    apiClient<{
      message: string;
    }>(`/v1/users/me`, {
      method: "DELETE",
      body: JSON.stringify(payload)
    }),
});
