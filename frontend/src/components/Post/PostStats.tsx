import { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { selectUser } from "../../store/slices/authSlice";
import usePostActions from "../../hooks/usePostActions";

interface Likes {
  [key: string]: boolean;
}

type Props = {
  likes: Likes;
  comments: number;
  postId: string;
  likeFunction: () => void;
  unLikeFunction: () => void;
};

const PostStats: React.FC<Props> = ({ likes, comments, postId, likeFunction, unLikeFunction }) => {
  const { username } = useSelector(selectUser)!;
  const [liked, setLiked] = useState(!!likes[username]);
  const [likeButtonLoading, setLikeButtonLoading] = useState(false);

  const { toggleLikePost } = usePostActions();

  const likeClickHandler = async () => {
    setLikeButtonLoading(true);
    await toggleLikePost(postId);
    if (liked) {
      unLikeFunction();
    } else {
      likeFunction();
    }
    
    setLiked((prevState) => !prevState);
    setLikeButtonLoading(false);
  };

  return (
    <div className="mb-2 flex flex-row gap-4 text-gray-500 font-medium">
      <div className="flex flex-row items-center gap-1.5">
        {liked ? (
          <FaHeart
            className="text-xl text-sky-500 cursor-pointer transition duration-500 hover:scale-110"
            onClick={likeButtonLoading ? () => {} : likeClickHandler}
          />
        ) : (
          <FaRegHeart
            className="text-xl cursor-pointer transition duration-500 hover:text-sky-500 hover:scale-110"
            onClick={likeButtonLoading ? () => {} : likeClickHandler}
          />
        )}
        <span className="text-lg">{Object.keys(likes).length}</span>
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <FaRegCommentDots className="text-xl" />
        <span className="text-lg">{comments}</span>
      </div>
    </div>
  );
};

export default PostStats;
