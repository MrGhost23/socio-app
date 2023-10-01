import { Link } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import UserImage from "./User/UserImage";
import { NotificationType } from "../Types/Notification.types";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  notification: NotificationType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readNotification: (id: string) => void;
};

const Notification: React.FC<Props> = ({
  notification,
  setIsOpen,
  readNotification,
}) => {
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    setIsRead(notification.isRead);
  }, [notification.isRead]);

  const clickHandler = async () => {
    if (!isRead) {
      await axios.patch(
        `https://socio-irdl.onrender.com/api/v1/notifications/${notification._id}`
      );
      setIsRead(true);
      readNotification(notification._id);
    }
    setIsOpen(false);
  };

  return (
    <Link
      key={notification.createdAt}
      to={
        notification.actionType === "follow"
          ? `/profile/${notification.username}`
          : `/post/${notification.postId}`
      }
      onClick={clickHandler}
      className={`flex items-center px-4 py-3 border-b dark:border-b-primaryDark ${
        isRead
          ? "hover:bg-gray-100 hover:dark:bg-primarylessDarker"
          : "bg-gray-100 dark:bg-primarylessDarker"
      }`}
    >
      <UserImage
        username={notification.firstName}
        src={notification.userPicture}
        className="h-8 w-8 rounded-full object-cover mx-1"
      />
      <p className="text-gray-600 text-sm mx-2 dark:text-textLight">
        <span className="font-bold dark:text-textLighter">
          {notification.firstName} {notification.lastName}
        </span>{" "}
        {notification.actionType === "like" && "liked your post."}{" "}
        {notification.actionType === "comment" && "commented on your post."}{" "}
        {notification.actionType === "follow" && "started following you."}{" "}
        <span className="text-gray-400 whitespace-nowrap">
          {formatTime(notification.createdAt)}
        </span>
      </p>
    </Link>
  );
};

export default Notification;
