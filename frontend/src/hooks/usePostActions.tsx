import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../store/slices/authSlice";
import axios from "axios";

const usePostActions = () => {
  const currentUser = useSelector(selectUser);

  const bookmarkPost = async (postId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/users/${currentUser!.username}/toggle-bookmark/${postId}`);

      toast.info(`Added post to bookmarks!`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const unBookmarkPost = async (postId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/users/${currentUser!.username}/toggle-bookmark/${postId}`);

      toast.info(`Removed post from bookmarks!`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const editPost = () => {
    try {
      // Edit logic goes here

      toast.info(`Post edited successfully!`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/posts/${postId}`);

      toast.info(`Post deleted successfully!`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  return {
    bookmarkPost,
    unBookmarkPost,
    editPost,
    deletePost,
  };
};

export default usePostActions;
