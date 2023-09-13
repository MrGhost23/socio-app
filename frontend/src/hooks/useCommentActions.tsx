import axios from "axios";
import { toast } from "react-toastify";

const useCommentActions = (
  commentId: string | undefined,
  ) => {

  const editComment = async (text: string) => {
    try {
      // Edit logic goes here
      console.log(commentId, text)

        const response = await axios.patch(
          `http://localhost:5000/api/v1/posts/comments/${commentId}`, {
            text
          }
        )
        console.log(response.data);

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