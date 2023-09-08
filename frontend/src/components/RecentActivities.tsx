import RecentActivity from './RecentActivity';


type Props = {
  userFirstName: string;
  recentActivities: {
    id: string,
    action: string,
    postId: string,
    postAuthorId: string,
    postAuthorFirstName: string,
    postAuthorLastName: string
  }[];
}

const RecentActivities: React.FC<Props> = ({ userFirstName, recentActivities }) => {
  return (
    <div className="flex flex-col gap-4 text-gray-600">
      {
        recentActivities.map(recentActivity =>
          <RecentActivity key={recentActivity.id} userFirstName={userFirstName} recentActivity={recentActivity} />
        )
      }
    </div>
  );
};

export default RecentActivities;