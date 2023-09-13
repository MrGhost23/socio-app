import useProfileActions from '../../hooks/useProfileActions';
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import Button from "../../ui/Button";

type Props = {
  image: string;
  username: string;
  firstName: string;
  lastName: string;
  followers: string[];
  changeStyle: boolean;
  mode: string;
};

const SuggestedUser: React.FC<Props> = ({
  image,
  username,
  firstName,
  lastName,
  followers,
  changeStyle,
  mode,
}) => {
  const mainContainerClasses = "flex items-center";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const {
    followUser,
    blockUser,
  } = useProfileActions(username, firstName, lastName);

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
        src={image}
        alt=""
        username={username}
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
          fullName={firstName + " " + lastName}
          username={username}
        />
        <p className="text-sm whitespace-nowrap">{followers.length} followers</p>
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
