import Heading from "@/components/Heading";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const preferences = [
    {
      title: "Allow Email Notification",
      subtitle: "Get an email notification. Once disabled, you will not receive an email notification",
    },
    {
      title: "Allow Push Notification",
      subtitle: "Get a push notification. Once disabled, you will not receive a push notification",
    },
    {
      title: "Hide Balance",
      subtitle: "Hide your balance",
    },
  ];
  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading
        title="Settings & Preference"
        subtitle="Manage settings & preferences."
      />
      <div className="grid  md:grid-cols-2">
        <div className="">
          <p className="text-xl font-bold">Preference</p>
        </div>
        <div className="flex flex-col gap-10">
          {preferences.map((preference, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <Heading
                title={preference.title}
                subtitle={preference.subtitle}
              />
              <Switch aria-label={`Preference setting ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
