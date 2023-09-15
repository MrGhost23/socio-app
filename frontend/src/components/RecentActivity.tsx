import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import {RecentActivityType} from '../Types/RecentActivity.type';

type Props = {
  userFirstName: string;
  recentActivity: RecentActivityType;
};

const RecentActivity: React.FC<Props> = ({ userFirstName, recentActivity }) => {
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
          ${userFirstName} ${recentActivity.actionType === "like" ? "liked" : "commented on"} 
          ${recentActivity.postAuthorUsername}'s post.
        `}
      </p>
    </Link>
  );
};

export default RecentActivity;
