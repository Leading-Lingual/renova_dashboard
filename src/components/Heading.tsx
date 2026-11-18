import { ReactNode } from "react";

const Heading = ({
  title,
  subtitle,
  actions,
  titleClassName,
  subTitleClassName,
  containerClass,
  onClick
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  titleClassName?: string;
  subTitleClassName?: string;
  containerClass?:string
  onClick?:()=>void
}) => {
  return (
    <div onClick={onClick} className={`flex md:justify-between md:items-center w-full flex-col md:flex-row gap-6 md:gap-0 ${containerClass}`}>
      <div className="flex flex-col gap-1 text-black-500">
        <p className={`text-heading-xs-semibold ${titleClassName}`}>{title}</p>
        {subtitle && (
          <p className={`text-s font-normal ${subTitleClassName}`}>
            {subtitle}
          </p>
        )}
      </div>
      {actions}
    </div>
  );
};

export default Heading;
