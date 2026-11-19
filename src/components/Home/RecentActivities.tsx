import { Activity } from "@/types/user.type";
import Heading from "../Heading";
import RecentActivitiesCard from "./RecentActivitiesCard";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);


const RecentActivities = ({
  activities,
  isLoading = false,
}: {
  activities: Activity[];
  isLoading?: boolean;
}) => {
  return (
    <div className="md:border rounded-lg md:p-4 flex flex-col gap-2 md:gap-5.25">
      <Heading
        title="Recent Activities"
        subtitle="View and manage all the waste materials here"
        subTitleClassName=" md:hidden"
        actions={
          <p className="text-s font-bold text-brand-500 hidden md:block">
            See All
          </p>
        }
      />
      <div className="grid md:grid-cols-2 gap-4 md:gap-x-7 lg:gap-x-14">
        {isLoading
          ? [0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border p-3 md:rounded-none md:border-0 md:border-b md:p-0 md:pb-4"
                aria-hidden="true"
              >
                <div className="size-10 shrink-0 rounded-lg bg-black-50 animate-pulse" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="h-4 w-2/3 rounded bg-black-50 animate-pulse" />
                  <div className="h-3 w-1/3 rounded bg-black-50 animate-pulse" />
                </div>
                <div className="h-4 w-16 rounded bg-black-50 animate-pulse" />
              </div>
            ))
          : activities.map((item) => (
              <RecentActivitiesCard
                key={item.id}
                name={item.title}
                time={dayjs(item.createdAt).fromNow()}
                amount={item.amountNgn}
                image={item.imageUrl}
              />
            ))}
      </div>
    </div>
  );
};

export default RecentActivities;
