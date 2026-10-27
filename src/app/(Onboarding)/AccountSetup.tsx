import FormHeader from "@/components/FormHeader";
import { Button } from "@/components/ui/button";
import UserOutlinedIcon from "@iconify-react/ant-design/user-outlined";
import BusinessPickUserIcon from "@iconify-react/streamline-cyber/business-pick-user";
import BusinessOutlineIcon from "@iconify-react/famicons/business-outline";
import { Controller, useWatch, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { AccountType, OnboardingFormValues } from "@/types/user.type";

const ACCOUNT_TYPES = [
  {
    value: "INDIVIDUAL" as const,
    icon: UserOutlinedIcon,
    text: "Individual (Buy or sell recyclable materials as an individual).",
  },
  {
    value: "BUSINESS" as const,
    icon: BusinessPickUserIcon,
    text: "Business (Buy or sell recyclable materials as a business).",
  },
  {
    value: "NGO" as const,
    icon: BusinessOutlineIcon,
    text: "NGO / Organization (Create initiatives, drive environmental impact).",
  },
];

const ACCOUNT_OPTIONS: Record<AccountType, { value: string; text: string }[]> =
  {
    INDIVIDUAL: [
      {
        value: "SELL",
        text: "Sell (List recyclable materials and earn from them).",
      },
      {
        value: "BUY",
        text: "Buy (Find and purchase recyclable materials).",
      },
      // {
      //   value: "COLLECT",
      //   text: "Collect (Collect materials from sellers and deliver them).",
      // },
    ],

    BUSINESS: [
      {
        value: "SELL",
        text: "Sell (List recyclable materials and earn from them).",
      },
      {
        value: "BUY",
        text: "Buy (Find and purchase recyclable materials).",
      },
      // {
      //   value: "COLLECT",
      //   text: "Collect (Collect materials from sellers and deliver them).",
      // },
      {
        value: "PROCESS_RECYCLE",
        text: "Process/Recycle Materials.",
      },
    ],

    NGO: [
      {
        value: "RUN_ENVIRONMENTAL_CAMPAIGNS",
        text: "Run Environmental Campaigns.",
      },
      {
        value: "ORGANIZE_COLLECTION_DRIVES",
        text: "Organize Collection Drives.",
      },
      {
        value: "MANAGE_COMMUNITY_OUTREACH",
        text: "Manage Community Programs and Outreach.",
      },
      {
        value: "PARTNER_WITH_RECYCLERS",
        text: "Partner with Recyclers.",
      },
    ],
  };

type AccountSetupProps = {
  form: UseFormReturn<OnboardingFormValues>;
  onContinue: () => void;
};

const AccountSetup = ({ form, onContinue }: AccountSetupProps) => {
  const accountType = useWatch({
    control: form.control,
    name: "accountType",
  });

  const toggleActivity = (
    activity: string,
    checked: boolean,
    currentActivities: string[],
  ) => {
    if (checked) {
      return currentActivities.includes(activity)
        ? currentActivities
        : [...currentActivities, activity];
    }

    return currentActivities.filter((item) => item !== activity);
  };

  const options = ACCOUNT_OPTIONS[accountType as AccountType] ?? [];

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <FormHeader
        title="Account & Role Setup"
        subtitle="Tell us who you are and let’s personalize your Renova experience."
      />

      <div className="flex flex-col gap-11">
        <div className="flex flex-col">
          <p className="text-black-500 text-m-bold py-[9.5px]">
            Select an Account Type
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            {ACCOUNT_TYPES.map((item) => {
              const isSelected = accountType === item.value;

              return (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => {
                    form.setValue("accountType", item.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    form.setValue("activities", []);
                  }}
                  className={`border ${
                    isSelected ? "border-brand-300" : "border-black-50"
                  } rounded-[8px] flex-1 px-4 py-2.5 flex justify-between items-center text-left`}
                >
                  <div className="flex items-center md:items-start md:flex-col gap-2.5">
                    <item.icon
                      className={`size-6 ${
                        isSelected ? "text-brand-300" : "text-black-500"
                      }`}
                    />

                    <p className="text-black-500 text-s font-medium">
                      {item.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {form.formState.errors.accountType && (
            <p className="text-sm text-red-500 mt-2">
              {form.formState.errors.accountType.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-black-500 text-m-bold">
            What would you like to do on Renova?
          </p>

          <Controller
            control={form.control}
            name="activities"
            render={({ field, fieldState }) => (
              <FieldGroup
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1"
              >
                {options.map((item) => {
                  const id = `activity-${item.value}`;

                  const checked = field.value.includes(item.value);

                  return (
                    <Field
                      key={item.value}
                      orientation="horizontal"
                      className="flex items-center py-2.5 gap-2.5"
                    >
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            toggleActivity(
                              item.value,
                              checked === true,
                              field.value,
                            ),
                          );
                        }}
                      />

                      <FieldLabel htmlFor={id}>{item.text}</FieldLabel>
                    </Field>
                  );
                })}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldGroup>
            )}
          />
        </div>

        <Button
          type="button"
          onClick={onContinue}
          className="text-white h-14 w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AccountSetup;
