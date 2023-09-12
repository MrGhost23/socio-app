import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { selectUser } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { toggleLikePost } from "../../store/slices/postsSlice";

type Props = {
  likes: any;
  comments: any;
  postId: string;
};

const PostStats: React.FC<Props> = ({ likes, comments, postId }) => {
  const user = useSelector(selectUser);
  const username = user?.username;
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const [liked, setLiked] = useState(false);

  const likeClickHandler = () => {
    setLiked((prevState) => !prevState);
    dispatch(toggleLikePost({ postId, username }));
  };

  useEffect(() => {
    console.log("LIKED");
  }, [dispatch]);

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
        <span className="text-lg">{likes}</span>
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <FaRegCommentDots className="text-xl" />
        <span className="text-lg">{comments}</span>
      </div>
    </div>
  );
};

export default PostStats;
