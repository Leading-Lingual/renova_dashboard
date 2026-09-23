import { apiClient } from "@/lib/api-client";
import { OnboardingFormValues, UserProfile } from "@/types/user.type";
import { mutationOptions } from "@tanstack/react-query";

export const completeOnboardingMutation = mutationOptions({
  mutationKey: ["onboarding"],
  mutationFn: (payload: OnboardingFormValues) =>
    apiClient<UserProfile>("/v1/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  onSuccess: (_data, _variables, _onMutateResult, context) => {
    context.client.invalidateQueries({
      queryKey: ["user"],
    });
  },
});
