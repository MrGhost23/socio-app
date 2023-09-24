import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../store/slices/authSlice";
import axios from "axios";

const useProfileActions = () => {
  const currentUser = useSelector(selectUser);

  const toggleBlockUser = async (username: string) => {
    try {
      await axios.post(
        `http://localhost:5000/api/v1/users/${username}/block-unblock`,
        {
          username: currentUser!.username,
        }
      );
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  const reportUser = () => {
    try {
      // Report logic goes here
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  return {
    toggleBlockUser,
    reportUser,
  };
};

export default useProfileActions;
