import { ReactNode } from "react";

const SectionWrapper = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-[8px] border p-4 lg:gap-6 lg:p-6 w-full">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold lg:text-xl">{title}</p>
        <p className="text-black-500 text-sm">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default SectionWrapper;
