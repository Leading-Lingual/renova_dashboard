import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import { ForwardRefExoticComponent, SVGProps } from "react";
import { IconProps } from "@iconify-react/griddy-icons/activity";

const EmptyState = ({
  title,
  subtitle,
  image,
  firstButton,
  secondButton,
}: {
  title: string;
  subtitle: string;
  image?: StaticImageData | string;
  firstButton?: {
    text: string;
    icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height" | "xmlns"> &
        IconProps
    >;
    onClick?: () => void;
  };
  secondButton?: {
    text: string;
    icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, "viewBox" | "width" | "height" | "xmlns"> &
        IconProps
    >;
    onClick?: () => void;
  };
}) => {
  return (
    <div className="text-center flex flex-col gap-12 justify-center items-center p-6 rounded-lg shadow-[0px_2px_6px_2px_#00000026,0px_1px_2px_0px_#0000004D]">
      <div className="flex flex-col ">
       {image && <Image
          src={image}
          alt="empty-state h-[136.59px] w-[157px] md:h-auto md:w-auto"
          className="m-auto"
        />}
        <div className="flex flex-col gap-1 text-black-500">
          <p className="text-heading-xs-semibold ">{title}</p>
          <p className="text-s font-normal max-w-87.5">{subtitle}</p>
        </div>
      </div>
      {(firstButton || secondButton) && (
        <div className="flex itmes-center gap-4 md:gap-10 flex-col md:flex-row w-full md:w-fit">
          {firstButton && (
            <Button
              onClick={firstButton.onClick}
              variant="outline"
              className="border-brand-500! h-12 md:h-14 px-4! w-full! md:w-fit!"
            >
              <firstButton.icon className="size-6 text-brand-700" />
              <p className="text-brand-700 text-heading-xs-semibold">
                {firstButton.text}
              </p>
            </Button>
          )}
          {secondButton && (
            <Button
              onClick={secondButton.onClick}
              className="h-12 md:h-14 w-full! md:w-fit! px-4! "
            >
              <secondButton.icon className="size-6" />
              <p className="text-heading-xs-semibold">{secondButton.text}</p>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
