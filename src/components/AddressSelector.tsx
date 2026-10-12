"use client";
import { ReactElement } from "react";
import { MapPinIcon } from "lucide-react";

export type OptionType = "ACCOUNT_ADDRESS" | "NEW_ADDRESS";
interface AddressSelectorProps {
  onSelect: (option: OptionType) => void;
  disabled?: boolean;
  selected?: OptionType | null;
}

const AddressSelector = ({
  onSelect,
  disabled,
  selected = null,
}: AddressSelectorProps) => {
  const items: {
    icon: ReactElement;
    key: OptionType;
    title: string;
    text: string;
  }[] = [
    {
      icon: <MapPinIcon />,
      key: "ACCOUNT_ADDRESS",
      title: "Use my account address",
      text: "We’ll use the address you created your account with for pickup",
    },
    {
      icon: <MapPinIcon />,
      key: "NEW_ADDRESS",
      title: "Use a new address",
      text: "Add a different pickup location for this material",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row no-scrollbar w-full gap-4">
      {items.map((item) => (
        <div
          key={item.key}
          onClick={() => (disabled ? null : onSelect(item.key))}
          className={`flex flex-col gap-2.5 border px-4 py-2.5 rounded-2xl flex-1 ${
            selected === item.key ? "border-brand-400 bg-overlay" : "border-black-50"
          }`}
        >
          {item.icon}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">{item.title}</p>
            <p className="text-s">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressSelector;