import { toast } from "react-toastify";

const useCommentActions = (
  commentId: string | undefined,
  ) => {

  const editComment = (text: string) => {
    try {
      // Edit logic goes here
      console.log(commentId, text)

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
      console.log(commentId)

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