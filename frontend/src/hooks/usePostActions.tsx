import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../store/slices/authSlice";
import axios from "axios";

const usePostActions = () => {
  const currentUser = useSelector(selectUser);

  const bookmarkPost = async (postId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/users/${currentUser!.username}/toggle-bookmark/${postId}`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const unBookmarkPost = async (postId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/users/${currentUser!.username}/toggle-bookmark/${postId}`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const editPost = async (postId: string, description: string, postImage: object | null) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/posts/${postId}`, {
        description,
        postImage
      }
    );
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/posts/${postId}`);
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
