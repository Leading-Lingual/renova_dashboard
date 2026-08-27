import FormHeader from "@/components/FormHeader";
import { Button } from "@/components/ui/button";
import UserOutlinedIcon from "@iconify-react/ant-design/user-outlined";
import BusinessPickUserIcon from "@iconify-react/streamline-cyber/business-pick-user";
import BusinessOutlineIcon from "@iconify-react/famicons/business-outline";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSetUpSchema } from "@/validations/onboarding.validation";
import * as z from "zod";
import { AccountType } from "@/types/onboarding.type";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

const AccountSetup = ({
  onContinue,
}: {
  onContinue: (account: AccountType) => void;
}) => {
  const form = useForm<z.infer<typeof AccountSetUpSchema>>({
    resolver: zodResolver(AccountSetUpSchema),
    defaultValues: {
      accountType: "individual",
      options: [],
    },
  });

  const accountType = useWatch({
    control: form.control,
    name: "accountType",
  });

  const accountTypeDetails = [
    {
      icon: UserOutlinedIcon,
      title: "individual",
      text: "Individual (Buy, sell, or collect recyclable materials as an individual).",
    },
    {
      icon: BusinessPickUserIcon,
      title: "business",
      text: "Business (Buy, sell, recycle or collect recyclable materials as a business).",
    },
    {
      icon: BusinessOutlineIcon,
      title: "organisation",
      text: "NGO / Organization (Create initiatives, drive environmental impact).",
    },
  ];

  const checkList = () => {
    switch (form.getValues("accountType")) {
      case "individual":
        return [
          "Sell (List recyclable materials and earn from them).",
          "Buy (Find and purchase recyclable materials).",
          "Collect (Collect materials from sellers and deliver them).",
        ];
      case "business":
        return [
          "Sell (List recyclable materials and earn from them).",
          "Buy (Find and purchase recyclable materials).",
          "Collect (Collect materials from sellers and deliver them).",
          "Process/Recycle Materials.",
        ];
      case "organisation":
        return [
          "Run Environmental Campaigns.",
          "Organize Collection Drives.",
          "Manage Community Programs and Outreach.",
          "Partner with Recyclers",
        ];

      default:
        return [];
    }
  };

  const handleContinue = () => {
    onContinue(form.getValues("accountType") as AccountType);
  };

  return (
    <form className="flex flex-col gap-6 md:gap-8">
      <FormHeader
        title="Account & Role Setup"
        subtitle="Tell us who you are and let’s personalize your Renova experience."
      />
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col">
            <p className="text-black-500 text-m-bold py-[9.5px]">
              Select an Account Type
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {accountTypeDetails.map((item) => (
                <div
                  onClick={() => {
                    console.log("clicked", item.title);
                    form.setValue("accountType", item.title);
                  }}
                  key={item.title}
                  className={`border ${accountType === item.title ? "border-brand-300" : "border-black-50"} rounded-[8px] flex-1 px-4 py-2.5 flex justify-between items-center cursor-pointer`}
                >
                  <div className="flex items-center md:items-start md:flex-col gap-2.5">
                    <item.icon
                      className={`size-6 ${accountType === item.title ? "text-brand-300" : "text-black-500"}`}
                    />
                    <p className="text-black-500 text-s font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black-500 text-m-bold">
              What would you like to do on Renova?
            </p>
            <FieldGroup className="flex flex-col gap-1">
              {checkList().map((item) => (
                <Field
                  orientation="horizontal"
                  key={item}
                  className="flex items-center py-2.5 gap-2.5"
                >
                  <Checkbox className="size-6" id="options" name="options" />
                  <FieldLabel htmlFor="options" className="">
                    {item}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </div>
        </div>
        <Button
          // disabled={isPending}
        //   type="submit"
          className="text-white h-14 w-full"
          onClick={handleContinue}
        >
          {/* {isPending && <Loader2 className="animate-spin" />} */}
          Continue
        </Button>
      </div>
    </form>
  );
};

export default AccountSetup;
