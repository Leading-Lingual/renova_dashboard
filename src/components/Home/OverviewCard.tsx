"use client"
import { ForwardRefExoticComponent, SVGProps } from "react";
import { Badge } from "../ui/badge";
import { IconProps } from "@iconify-react/griddy-icons/activity";

const OverviewCard = ({
  title,
  Icon,
  value,
  increase,
}: {
  title: string;
  Icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height" | "xmlns"> &
      IconProps
  >;
  value: string|number;
  increase?: number;
}) => {
  return (
    <div
      key={title}
      className="border border-black-50 rounded-lg p-3 w-full flex gap-3"
    >
      <div className="size-6 lg:size-9 rounded-full bg-brand-50 flex shrink-0">
        <Icon className="size-3 lg:size-4 m-auto text-brand-500 fill-brand-500" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2s-medium font-normal lg:text-s">{title}</p>
        <p className=" text-s font-bold lg:text-m-bold">{value}</p>
        {increase ? <Badge className="bg-brand-50 text-brand-800 text-2s-medium! font-normal ">
          +{increase}% this month
        </Badge> :""}
      </div>
    </div>
  );
};

export default OverviewCard;
