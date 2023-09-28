import { FaBookmark } from "react-icons/fa6";
import { toggleBookmarkPost, selectUser } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

type Props = {
  postId: string;
  removeBookmark: () => void;
};

const PostBookmarkIcon: React.FC<Props> = ({ postId, removeBookmark }) => {
  const currentUser = useSelector(selectUser);

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const toggleBookmark = async () => {
    dispatch(toggleBookmarkPost({ username: currentUser!.username, postId }));
    removeBookmark();
  };

  const classes =
    "absolute top-1 right-0 text-2xl scale-y-110 cursor-pointer transition duration-500 hover:scale-x-110 hover:scale-y-[1.2]";

  return (
    <FaBookmark
      className={classes + " text-sky-500  hover:text-sky-500"}
      onClick={toggleBookmark}
    />
  );
};

export default PostBookmarkIcon;
