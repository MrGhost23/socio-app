import RecentActivity from './RecentActivity';


type Props = {
  recentActivities: {
    id: string,
    action: string,
    postId: string,
    postAuthorId: string,
    postAuthorFirstName: string,
    postAuthorLastName: string
  }[];
}

const RecentActivities: React.FC<Props> = ({ recentActivities }) => {
  return (
    <div className="flex flex-col gap-4 text-gray-600">
      {
        recentActivities.map(recentActivity =>
          <RecentActivity key={recentActivity.id} recentActivity={recentActivity} />
        )
      }
    </div>
  );
};

export default RecentActivities;