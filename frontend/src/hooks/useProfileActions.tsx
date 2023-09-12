import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../store/slices/authSlice";

const useProfileActions = (userId: string, userFirstName: string, userLastName: string) => {
  const currentUser = useSelector(selectUser);

  console.log(currentUser)
  console.log(userId)

  const followUser = () => {
    try {
      // Follow logic goes here

      toast.info(
        `You've successfully followed ${userFirstName} ${userLastName}!`
      );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const unFollowUser = () => {
    try {
      // Unfollow logic goes here

      toast.info(
        `You're not following ${userFirstName} ${userLastName} anymore!`
        );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const blockUser = () => {
    try {
      // Block logic goes here

      toast.info(
        `You've successfully blocked ${userFirstName} ${userLastName}!`
        );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const unBlockUser = () => {
    try {
      // Unblock logic goes here

      toast.info(
        `You've successfully unblocked ${userFirstName} ${userLastName}!`
        );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  const ReportUser = () => {
    try {
      // Report logic goes here

      toast.info(
        `You've successfully reported ${userFirstName} ${userLastName}!`
        );
    } catch (error) {
      toast.info(
        `Something went wrong!`
      );
    }
  };

  return {
    followUser,
    unFollowUser,
    blockUser,
    unBlockUser,
    ReportUser
  }
};

export default useProfileActions;