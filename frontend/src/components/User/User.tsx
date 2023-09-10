import Button from "../../ui/Button";
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";

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
  const mainContainerClasses = "flex items-center gap-2";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const followHandler = () => {
    console.log("Followed User");
  };

  const unBlockHandler = () => {
    console.log("Unblocked User");
  };

  return (
    <div
      className={
        changeStyle
          ? mainContainerClasses + " flex-col xl:flex-row"
          : mainContainerClasses + " flex-row"
      }
    >
      <UserImage
        className="w-16 h-16 !mb-0"
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
