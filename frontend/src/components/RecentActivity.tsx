import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { RecentActivityType } from '../Types/RecentActivity.type';

type Props = {
  isMyProfile: boolean;
  userFirstName: string;
  recentActivity: RecentActivityType;
};

const RecentActivity: React.FC<Props> = ({
  isMyProfile,
  userFirstName,
  recentActivity
}) => {
  return (
    <Link key={recentActivity._id} to={`/post/${recentActivity.postId}`} className="flex flex-row items-start gap-2 font-medium">
      {
        recentActivity.actionType === "like" ?
          <FaRegHeart className="min-w-[1.35rem] min-h-[1.35rem] mt-0.5 text-xl text-sky-500" />
        :
          <FaRegCommentDots className="min-w-[1.35rem] min-h-[1.35rem] mt-0.5 text-xl text-sky-500" />
      }
      <p>
        {`
          ${isMyProfile ? "You" : userFirstName} ${recentActivity.actionType === "like" ? "liked" : "commented on"} 
          ${isMyProfile ? "your" : `${recentActivity.postAuthorUsername}'s`} post.
        `}
      </p>
    </Link>
  );
};

export default RecentActivity;
