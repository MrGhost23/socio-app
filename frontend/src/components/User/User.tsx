import { toast } from 'react-toastify';
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import Button from "../../ui/Button";

type Props = {
  image: string;
  id: string;
  fullName: string;
  followers: number;
  changeStyle: boolean;
  mode: string;
};

const SuggestedUser: React.FC<Props> = ({
  image,
  id,
  fullName,
  followers,
  changeStyle,
  mode,
}) => {
  const mainContainerClasses = "flex items-center";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const followHandler = () => {
    toast.info(`You've successfully followed ${fullName}`);
  };

  const unBlockHandler = () => {
    toast.info(`You've successfully unblocked ${fullName}`);
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
        alt={fullName}
        id={id}
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
          fullName={fullName}
          id={id}
        />
        <p className="text-sm whitespace-nowrap">{followers} followers</p>
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
