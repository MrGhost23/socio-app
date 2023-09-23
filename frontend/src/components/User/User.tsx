import { useState, useEffect } from "react";
import axios from "axios";
import { UserType } from "../../Types/User.types";
import useProfileActions from "../../hooks/useProfileActions";
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";

type Props = {
  user: UserType;
  changeStyle: boolean;
  mode: string;
  center?: boolean;
};

const SuggestedUser: React.FC<Props> = ({
  user,
  changeStyle,
  mode,
  center,
}) => {
  const currentUser = useSelector(selectUser);

  const [followers, setFollowers] = useState<number>(user.followers);

  const mainContainerClasses = center ? "flex items-center" : "flex";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const [followButtonLoading, setFollowButtonLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Loading...");

  useEffect(() => {
    if (user.username === currentUser!.username) return;

    const fetchIsFollowing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${user.username}/isFollowing`
        );
        setButtonText(
          mode === "follow"
            ? response.data.isFollowing
              ? "Unfollow"
              : "Follow"
            : "unblock"
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchIsFollowing();
  }, [currentUser, mode, user.username]);

  const { toggleFollowUser, toggleBlockUser } = useProfileActions();

  const buttonClickHandler = async () => {
    setFollowButtonLoading(true);
    if (mode === "follow") {
      await toggleFollowUser(user.username);

      if (buttonText === "Follow") {
        setFollowers((prevState) => prevState + 1);
        setButtonText("Unfollow");
      } else {
        setFollowers((prevState) => prevState - 1);
        setButtonText("Follow");
      }
      setFollowButtonLoading(false);
    } else {
      await toggleBlockUser(user.username);

      if (buttonText === "block") {
        setButtonText("unblock");
      } else {
        setButtonText("block");
      }
      setFollowButtonLoading(false);
    }
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
        className="min-w-[4rem] w-16 min-h-[4rem] h-16 mb-4"
        src={user.userPicture}
        username={user.username}
        link={true}
      />
      <div
        className={
          changeStyle
            ? infoContainerClasses + " items-center xl:items-start"
            : infoContainerClasses
        }
      >
        <UserFullName
          className="!text-base font-semibold whitespace-nowrap"
          fullName={user.firstName + " " + user.lastName}
          username={user.username}
        />
        {mode === "follow" && (
          <p className="text-sm whitespace-nowrap">{followers} followers</p>
        )}
        {user.username !== currentUser!.username && (
          <Button
            text={followButtonLoading ? "Loading..." : buttonText}
            bg={false}
            onClick={followButtonLoading ? () => {} : buttonClickHandler}
            className="text-[0.95rem] capitalize"
          />
        )}
      </div>
    </div>
  );
};

export default SuggestedUser;
