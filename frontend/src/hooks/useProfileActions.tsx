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
    toggleBlockUser,
    reportUser,
  };
};

export default useProfileActions;
