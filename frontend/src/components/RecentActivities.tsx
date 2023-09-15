import RecentActivity from "./RecentActivity";
import {RecentActivityType} from '../Types/RecentActivity.type';

type Props = {
  userFirstName: string;
  recentActivities: RecentActivityType[];
};

const RecentActivities: React.FC<Props> = ({
  userFirstName,
  recentActivities,
}) => {
  return (
    <div className="flex flex-col gap-4 text-gray-600">
      {
      recentActivities.length ?
        recentActivities.map((recentActivity) => (
          <RecentActivity
            key={recentActivity._id}
            userFirstName={userFirstName}
            recentActivity={recentActivity}
          />
        ))
      :
        <p>{userFirstName} doesn't have any recent activities</p>
      }
    </div>
  );
};

export default RecentActivities;
