import Button from "../ui/Button";
import { NotificationType } from "../Types/Notification.types";
import useClickOutside from "../hooks/useClickOutside";
import { useState, useEffect } from "react";
import Notification from "./Notification";
import { CgCheck } from "react-icons/cg";
import axios from "axios";

type Props = {
  notifications: NotificationType[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
};

const Notifications: React.FC<Props> = ({
  notifications,
  isOpen,
  setIsOpen,
  setNotifications,
}) => {
  const onClickOutside = () => {
    setIsOpen(false);
  };

  const notificationsRef = useClickOutside(onClickOutside);

  const max = 5;
  const [notificationsSliced, setNotificationsSliced] = useState(
    notifications?.length > max
  );

  useEffect(() => {
    setNotificationsSliced(notifications?.length > max);
  }, [notifications]);

  const showAll = () => {
    setNotificationsSliced((prevState) => !prevState);
  };

  const readNotificationHandler = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const readAllNotifications = async () => {
    const updatedNotifications = notifications.map(async (notification) => {
      if (!notification.isRead) {
        await axios.patch(
          `http://localhost:5000/api/v1/notifications/${notification._id}`
        );
      }
      return { ...notification, isRead: true };
    });

    await Promise.all(updatedNotifications);

    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => {
        return { ...notification, isRead: true };
      })
    );
  };

  return (
    <div className="relative" ref={notificationsRef}>
      <div
        className={`${
          isOpen && notifications.length !== 0 ? "" : "hidden"
        } absolute lg:right-0 -right-12 mt-2 w-80 bg-white rounded-md shadow-lg z-20 dark:bg-primarylessDark`}
      >
        {notifications.filter((obj) => obj.isRead !== true).length !== 0 && (
          <div
            className="w-fit ml-auto flex flex-row items-center my-1 mr-4 text-gray-500 cursor-pointer dark:text-textLighter"
            onClick={readAllNotifications}
          >
            <CgCheck className="text-2xl scale-110" />
            <span className="text-sm capitalize font-semibold">Read all</span>
          </div>
        )}
        <div
          className={`overflow-hidden ${
            !notificationsSliced
              ? "max-h-[calc(80vh-80px)] overflow-y-auto"
              : ""
          } ${notifications?.length > max ? "mb-10 " : ""}`}
        >
          {notificationsSliced
            ? notifications
                .slice(0, max)
                .map((notification) => (
                  <Notification
                    key={notification._id}
                    notification={notification}
                    setIsOpen={setIsOpen}
                    readNotification={readNotificationHandler}
                  />
                ))
            : notifications.map((notification) => (
                <Notification
                  key={notification._id}
                  notification={notification}
                  setIsOpen={setIsOpen}
                  readNotification={readNotificationHandler}
                />
              ))}
        </div>
        {notifications?.length > max && (
          <Button
            bg={true}
            text={notificationsSliced ? "Show all" : "Show less"}
            onClick={showAll}
            className="absolute bottom-0 left-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;
