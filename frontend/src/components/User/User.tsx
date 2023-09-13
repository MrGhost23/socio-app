import { UserType } from '../../Types/User.types';
import useProfileActions from '../../hooks/useProfileActions';
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import Button from "../../ui/Button";

type Props = {
  user: UserType;
  changeStyle: boolean;
  mode: string;
};

const SuggestedUser: React.FC<Props> = ({
  user,
  changeStyle,
  mode,
}) => {
  const mainContainerClasses = "flex items-center";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const {
    followUser,
    blockUser,
  } = useProfileActions(user.username, user.firstName, user.lastName);

  const followHandler = () => {
    followUser();
  };

  const unBlockHandler = () => {
    blockUser();
  };

  return (
    <div
      className={
        changeStyle
          ? mainContainerClasses + " flex-col xl:flex-row xl:gap-2"
          : mainContainerClasses + " flex-row gap-2"
      }
    >
      <UserImage
        className="w-16 h-16"
        src={user.userPicture}
        alt=""
        username={user.username}
      />
      <div
        className={
          changeStyle
            ? infoContainerClasses + " items-center xl:items-start"
            : infoContainerClasses
        }
      >
        <UserFullName
          className="!text-base font-medium whitespace-nowrap"
          fullName={user.firstName + " " + user.lastName}
          username={user.username}
        />
        <p className="text-sm whitespace-nowrap">{user.followers} followers</p>
        <Button
          text={mode === "follow" ? "Follow" : "Unblock"}
          bg={false}
          onClick={mode === "follow" ? followHandler : unBlockHandler}
          className="!text-sm"
        />
      </div>
    </div>
  );
};

export default SuggestedUser;
