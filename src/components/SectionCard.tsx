import React, { ReactNode, useState } from "react";
import Heading from "./Heading";
import { ChevronDown } from "lucide-react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  useAccordion?: boolean;
  defaultShowBody?: boolean;
  showBody?: boolean;
  onShowBodyChange?: (showBody: boolean) => void;
  children: ReactNode;
  headingDetail?: ReactNode
}

const SectionCard = ({
  title,
  subtitle,
  titleClassName,
  subTitleClassName,
  useAccordion = true,
  defaultShowBody = true,
  showBody: controlledShowBody,
  onShowBodyChange,
  children,
  headingDetail
}: SectionCardProps) => {
  const [uncontrolledShowBody, setUncontrolledShowBody] = useState(defaultShowBody);
  const isControlled = controlledShowBody !== undefined;
  const showBody = isControlled ? controlledShowBody : uncontrolledShowBody;

  const handleShowBodyChange = () => {
    const nextShowBody = !showBody;
    if (!isControlled) setUncontrolledShowBody(nextShowBody);
    onShowBodyChange?.(nextShowBody);
  };
  return (
    <div className=" flex flex-col w-full border rounded-[8px] gap-1 py-2 h-fit transition-all duration-200 ">
      <div className="flex flex-col">
        <div className="flex py-1 px-4 items-center">
          <Heading
            title={title}
            subtitle={subtitle}
            titleClassName={titleClassName}
            subTitleClassName={subTitleClassName}
          />
          {useAccordion && (
            <ChevronDown
              onClick={handleShowBodyChange}
              className={`transition-all duration-300 ${showBody ? "" : "-rotate-90"}`}
            />
          )}
          {headingDetail}
        </div>
        <div
          className={`w-full transition-all ease-linear ${showBody ? "opacity-100 max-h-full duration-300" : "opacity-0 max-h-0 duration-200"}`}
        >
          <hr className="w-full my-2.5" />
        </div>
      </div>
      <div
        className={`w-full transition-all  ease-liner ${showBody ? "opacity-100 max-h-full duration-300 " : "opacity-0 max-h-0 duration-200"}`}
      >
        <div className="flex w-full py-2 px-4">{children}</div>
      </div>
    </div>
  );
};

export default SectionCard;
