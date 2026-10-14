import { apiClient } from "@/lib/api-client";
import { mutationOptions } from "@tanstack/react-query";

export const readAllNotificationsMutation = mutationOptions({
  mutationKey: ["readAll-notifications"],
  mutationFn: () =>
    apiClient<{ message: string }>(`/v1/notifications/read-all`, {
      method: "POST",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["notification"],
    });
  },
});

export const readNotificationsMutation = mutationOptions({
  mutationKey: ["read-notification"],
  mutationFn: (notificationId: string) =>
    apiClient<{ message: string }>(`/v1/notifications/${notificationId}/read`, {
      method: "POST",
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["notification"],
    });
  },
});
