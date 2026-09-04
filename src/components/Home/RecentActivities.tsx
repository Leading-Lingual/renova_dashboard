import Heading from "../Heading";
import RecentActivitiesCard from "./RecentActivitiesCard";

const RecentActivities = () => {
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
        {["a", "b", "c", "d", "e", "f"].map((item) => (
          <RecentActivitiesCard
            key={item}
            name="Listed 5KG of Glass Bottle"
            time="2 hours Ago"
            amount="24 KG"
            isBuying
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
