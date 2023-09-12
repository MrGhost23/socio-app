import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../store/slices/authSlice";

const useProfileActions = (userId: string, userFirstName: string, userLastName: string) => {
  const currentUser = useSelector(selectUser);

  console.log(currentUser)
  console.log(userId)

  const followHandler = () => {
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

  const unFollowHandler = () => {
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

  const blockHandler = () => {
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

  const unBlockHandler = () => {
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

  const ReportHandler = () => {
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
    followHandler,
    unFollowHandler,
    blockHandler,
    unBlockHandler,
    ReportHandler
  }
};

export default useProfileActions;