import axios from "axios";
import { toast } from "react-toastify";

const useCommentActions = () => {
  const submitComment = async (postId: string, text: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/posts/${postId}/comments`,
        {
          text,
        }
      );

      return response.data;
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const editComment = async (commentId: string, text: string) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/posts/comments/${commentId}`,
        {
          text,
        }
      );

      toast.info(`Comment updated successfully!`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/posts/comments/${commentId}`
      );

      toast.info(`Comment deleted successfully!`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  return {
    submitComment,
    editComment,
    deleteComment,
  };
};

export default useCommentActions;
