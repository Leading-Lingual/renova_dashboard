import { Activity } from "@/types/user.type";
import Heading from "../Heading";
import RecentActivitiesCard from "./RecentActivitiesCard";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);


const RecentActivities = ({activities}:{ activities :Activity[]}) => {
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
        {activities.map((item) => (
          <RecentActivitiesCard
            key={item.id}
            name={item.title}
            time={dayjs(item.createdAt).fromNow() }
            amount={item.amountNgn}
            image={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
