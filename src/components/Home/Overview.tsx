import MoneyIcon from "@iconify-react/tdesign/money";
import ListingLabDarkIcon from "@iconify-react/selfhst/listing-lab-dark";
import Pickup02Icon from "@iconify-react/hugeicons/pickup-02";
import PersonDroppingTrashIntoWheelieBinIcon from "@iconify-react/pinhead/person-dropping-trash-into-wheelie-bin";
import OverviewCard from "./OverviewCard";
import Heading from "../Heading";
import { formatDecimal, formatNumber } from "@/lib/utils";

const Overview = ({
  totalWasteRecovered,
  totalValue,
  ecosystemActivity,
}: {
  totalWasteRecovered?: string;
  totalValue?: string;
  ecosystemActivity?: number;
}) => {
  const overviewItems = [
    {
      icon: PersonDroppingTrashIntoWheelieBinIcon,
      title: "Total Waste Recovered",
      value: `${totalWasteRecovered ? formatDecimal(totalWasteRecovered) : 0}KG`,
      increase: 0,
    },
    {
      icon: MoneyIcon,
      title: "Total Value",
      value: `₦ ${totalValue ? formatNumber(formatDecimal(totalValue)) : 0}`,
      increase: 0,
    },
    {
      icon: ListingLabDarkIcon,
      title: "Environmental Impact",
      value: "0 kg CO₂e",
      increase: 0,
    },
    {
      icon: Pickup02Icon,
      title: "Ecosystem Activity",
      value: `${ecosystemActivity ?? 0} Activities`,
      increase: 0,
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Heading title="Overview" />
      <div className="grid grid-cols-2 lg:flex gap-4">
        {overviewItems.map((item) => (
          <OverviewCard
            key={item.title}
            title={item.title}
            Icon={item.icon}
            value={item.value}
            increase={item.increase}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
