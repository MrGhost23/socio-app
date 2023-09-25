import { Link } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import UserImage from "./User/UserImage";
import Button from "../ui/Button";
import { NotificationType } from "../Types/Notification.types";
import useClickOutside from "../hooks/useClickOutside";
import { useState } from "react";

type Props = {
  notifications: NotificationType[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Notifications: React.FC<Props> = ({ notifications, setIsOpen }) => {
  const onClickOutside = () => {
    setIsOpen(false);
  };

  const notificationsRef = useClickOutside(onClickOutside);

  const max = 5;
  const [notificationsSliced, setNotificationsSliced] = useState(
    notifications?.length > max
  );

  const showAll = () => {
    setNotificationsSliced((prevState) => !prevState);
  };

  return (
    <div className="relative" ref={notificationsRef}>
      <div
        className={`absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20`}
      >
        <div
          className={`mb-10 overflow-hidden ${
            !notificationsSliced
              ? "max-h-[calc(80vh-80px)] overflow-y-auto"
              : ""
          }`}
        >
          {notificationsSliced
            ? notifications.slice(0, max).map((notification) => (
                <Link
                  key={notification.createdAt}
                  to={
                    notification.actionType === "follow"
                      ? `/profile/${notification.username}`
                      : `/post/${notification.postId}`
                  }
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                >
                  <UserImage
                    username={notification.firstName}
                    src={notification.userPicture}
                    className="h-8 w-8 rounded-full object-cover mx-1"
                  />
                  <p className="text-gray-600 text-sm mx-2">
                    <span className="font-bold">
                      {notification.firstName} {notification.lastName}
                    </span>{" "}
                    {notification.actionType === "like" && "liked your post."}{" "}
                    {notification.actionType === "comment" &&
                      "commented on your post."}{" "}
                    {notification.actionType === "follow" &&
                      "started following you."}{" "}
                    <span className="text-gray-400 whitespace-nowrap">
                      {formatTime(notification.createdAt)}
                    </span>
                  </p>
                </Link>
              ))
            : notifications.map((notification) => (
                <Link
                  key={notification.createdAt}
                  to={`/post/${notification.postId}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                >
                  <UserImage
                    username={notification.firstName}
                    src={notification.userPicture}
                    className="h-8 w-8 rounded-full object-cover mx-1"
                  />
                  <p className="text-gray-600 text-sm mx-2">
                    <span className="font-bold">
                      {notification.firstName} {notification.lastName}
                    </span>{" "}
                    {notification.actionType === "like" && "liked your post."}{" "}
                    {notification.actionType === "comment" &&
                      "commented on your post."}{" "}
                    {notification.actionType === "follow" &&
                      "started following you."}{" "}
                    <span className="text-gray-400 whitespace-nowrap">
                      {formatTime(notification.createdAt)}
                    </span>
                  </p>
                </Link>
              ))}
        </div>
        <Button
          bg={true}
          text={notificationsSliced ? "Show all" : "Show less"}
          onClick={showAll}
          className="absolute bottom-0 left-0"
        />
      </div>
    </div>
  );
};

export default Notifications;
