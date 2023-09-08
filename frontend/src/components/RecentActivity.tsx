import {FaRegCommentDots, FaRegHeart} from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  userFirstName: string;
  recentActivity: {
    id: string,
    action: string,
    postId: string,
    postAuthorId: string,
    postAuthorFirstName: string,
    postAuthorLastName: string
  };
}

const RecentActivity: React.FC<Props> = ({ userFirstName, recentActivity }) => {
  return (
    <div key={recentActivity.id} className="flex flex-row items-start gap-2">
      {
        recentActivity.action === "like" ?
          <FaRegHeart className="min-w-[1.35rem] min-h-[1.35rem] mt-0.5 text-xl text-indigo-700"/>
        :
          <FaRegCommentDots className="min-w-[1.35rem] min-h-[1.35rem] mt-0.5 text-xl text-indigo-700"/>
      }
      <p>
        {userFirstName} {recentActivity.action === "like" ? "liked" : "commented on"} 
        <Link to={`/profile/${recentActivity.postAuthorId}`} className="font-medium"> {recentActivity.postAuthorFirstName + " " + recentActivity.postAuthorLastName}</Link> 's 
        <Link to={`/post/${recentActivity.postId}`} className="font-medium"> post</Link>.
      </p>
    </div>
  );
};

export default RecentActivity;