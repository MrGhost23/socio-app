import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";

type Props = {
  likes: object;
  comments: number;
};

const PostStats: React.FC<Props> = ({ likes, comments }) => {
  const { username } = useSelector(selectUser)!;
  const [liked, setLiked] = useState(username in likes);

  const likeClickHandler = () => {
    setLiked((prevState) => !prevState);
  };

  console.log(likes)
  console.log(username in likes)

  return (
    <div className="mb-2 flex flex-row gap-4 text-gray-500 font-medium">
      <div className="flex flex-row items-center gap-1.5">
        {liked ? (
          <FaHeart
            className="text-xl text-sky-500 cursor-pointer transition duration-500 hover:scale-110"
            onClick={likeClickHandler}
          />
        ) : (
          <FaRegHeart
            className="text-xl cursor-pointer transition duration-500 hover:text-sky-500 hover:scale-110"
            onClick={likeClickHandler}
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
