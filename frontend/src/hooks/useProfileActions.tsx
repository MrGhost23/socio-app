import { toast } from "react-toastify";

const useProfileActions = () => {
  const reportUser = () => {
    try {
      // Report logic goes here
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  return {
    reportUser,
  };
};

export default useProfileActions;
