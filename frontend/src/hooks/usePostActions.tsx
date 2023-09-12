import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../store/slices/authSlice";

const usePostActions = (
  postId: string | undefined,
  ) => {
  const currentUser = useSelector(selectUser);

  console.log(currentUser)
  console.log(postId)

  const bookmarkPost = () => {
    try {
      // Bookmark logic goes here

      toast.info(
        `Added post to bookmarks!`
      );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const unBookmarkPost = () => {
    try {
      // UNbookmark logic goes here

      toast.info(
        `Removed post from bookmarks!`
      );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const editPost = () => {
    try {
      // Edit logic goes here

      toast.info(
        `Post edited successfully!`
      );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const deletePost = () => {
    try {
      // Delete logic goes here

      toast.info(
        `Post deleted successfully!`
      );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  return {
    bookmarkPost,
    unBookmarkPost,
    editPost,
    deletePost
  }
};

export default usePostActions;