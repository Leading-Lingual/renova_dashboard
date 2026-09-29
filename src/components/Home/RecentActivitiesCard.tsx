import { formatDecimal, formatNumber } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

const RecentActivitiesCard = ({
  image,
  name,
  time,
  isBuying = false,
  amount,
}: {
  amount: string;
  image?: StaticImageData|string;
  name: string;
  time: string;
  isBuying?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center p-2.75 border rounded-lg md:rounded-none md:p-0 md:not-nth-last-[-n+2]:pb-4 md:border-0 md:not-nth-last-[-n+2]:border-b">
      <div className="flex gap-3">
        {image ? (
          <Image
            src={image}
            alt="activity image"
            className="size-10 rounded-lg"
            width={40}
            height={40}
          />
        ) : (
          <div className="size-10 rounded-lg bg-brand-300" />
        )}
        <div className="flex flex-col gap-1 text-black-500 max-w-34.25 md:max-w-full">
          <p className="text-m-medium">{name}</p>
          <p className="text-s">{time}</p>
        </div>
      </div>
      <p
        className={`text-s font-bold ${isBuying ? "text-danger-600" : "text-brand-600"}`}
      >
       &#x20A6; {formatNumber(formatDecimal(amount))}
      </p>
    </div>
  );
};

export default RecentActivitiesCard;
