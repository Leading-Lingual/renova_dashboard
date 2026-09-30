import { ReactNode } from "react";

const SectionWrapper = ({
  title,
  subtitle,
  children,
  containerClassName,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  containerClassName?:string
}) => {
  return (
    <div className={`flex flex-col gap-2 rounded-[8px] border p-4 lg:gap-6 lg:p-6 w-full ${containerClassName}`}>
      {(subtitle || title) && (
        <div className="flex flex-col gap-1">
          {title && <p className="text-sm font-bold md:text-xl">{title}</p>}
          {subtitle && <p className="text-black-500 text-s md:text-sm ">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionWrapper;
