"use client"
import { getUserPreferences } from "@/actions/user/user.query";
import { updateUserPreferencesMutation } from "@/actions/user/user.mutation";
import Heading from "@/components/Heading";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQuery } from "@tanstack/react-query";


const Settings = () => {
  const { data } = useQuery(getUserPreferences);
  const updatePreferences = useMutation(updateUserPreferencesMutation);

  const preferences = [
    {
      key: "emailNotifications",
      title: "Allow Email Notification",
      subtitle: "Get an email notification. Once disabled, you will not receive an email notification",
    },
    {
      key: "pushNotifications",
      title: "Allow Push Notification",
      subtitle: "Get a push notification. Once disabled, you will not receive a push notification",
    },
    {
      key: "hideBalance",
      title: "Hide Balance",
      subtitle: "Hide your balance",
    },
  ] as const;

  const handlePreferenceChange = (key: "emailNotifications" | "pushNotifications" | "hideBalance", checked: boolean) => {
    if (!data) return;

    updatePreferences.mutate({
      emailNotifications: data.emailNotifications,
      pushNotifications: data.pushNotifications,
      hideBalance: data.hideBalance,
      [key]: checked,
    });
  };

  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading
        title="Settings & Preference"
        subtitle="Manage settings & preferences."
      />
      <div className="grid md:grid-cols-2">
        <div>
          <p className="text-xl font-bold">Preference</p>
        </div>
        <div className="flex flex-col gap-10">
          {preferences.map((preference) => (
            <div
              key={preference.key}
              className="flex items-center justify-between gap-4"
            >
              <Heading
                title={preference.title}
                subtitle={preference.subtitle}
              />
              <Switch
                checked={data?.[preference.key] ?? false}
                disabled={!data || updatePreferences.isPending}
                onCheckedChange={(checked) =>
                  handlePreferenceChange(preference.key, checked)
                }
                aria-label={preference.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;

