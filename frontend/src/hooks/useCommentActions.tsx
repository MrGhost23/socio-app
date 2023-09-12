import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../store/slices/authSlice";

const useCommentActions = (
  commentId: string | undefined,
  ) => {
  const currentUser = useSelector(selectUser);

  console.log(currentUser)
  console.log(commentId)

  const editComment = () => {
    try {
      // Edit logic goes here

      toast.info(
        `Comment edited successfully!`
      );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const deleteComment = () => {
    try {
      // Delete logic goes here

      toast.info(
        `Comment deleted successfully!`
      );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  return {
    editComment,
    deleteComment
  }
};

export default useCommentActions;