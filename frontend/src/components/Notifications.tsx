import Button from "../ui/Button";
import { NotificationType } from "../Types/Notification.types";
import useClickOutside from "../hooks/useClickOutside";
import { useState } from "react";
import Notification from "./Notification";

type Props = {
  notifications: NotificationType[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Notifications: React.FC<Props> = ({
  notifications,
  isOpen,
  setIsOpen,
}) => {
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
        className={`${
          isOpen ? "" : "hidden"
        } absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20`}
      >
        <div
          className={`mb-10 overflow-hidden ${
            !notificationsSliced
              ? "max-h-[calc(80vh-80px)] overflow-y-auto"
              : ""
          }`}
        >
          {notificationsSliced
            ? notifications
                .slice(0, max)
                .map((notification) => (
                  <Notification
                    key={notification._id}
                    notification={notification}
                    setIsOpen={setIsOpen}
                  />
                ))
            : notifications.map((notification) => (
                <Notification
                  key={notification._id}
                  notification={notification}
                  setIsOpen={setIsOpen}
                />
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
