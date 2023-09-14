import { useState, useEffect } from "react";
import axios from "axios";
import { UserType } from "../../Types/User.types";
import useProfileActions from "../../hooks/useProfileActions";
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import Button from "../../ui/Button";

type Props = {
  user: UserType;
  changeStyle: boolean;
  mode: string;
};

const SuggestedUser: React.FC<Props> = ({ user, changeStyle, mode }) => {
  const mainContainerClasses = "flex";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const fetchIsFollowing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${user.username}/isFollowing`
        );
        setButtonText(
          mode === "follow" ? (response.data.isFollowing ? 'Unfollow' : 'Follow') : "unblock"
        )
      } catch (error) {
        console.log(error);
      }
    };
    fetchIsFollowing();
  }, [mode, user.username]);

  const {
    toggleFollowUser,
    toggleBlockUser
  } = useProfileActions();

  const buttonClickHandler = () => {
    if (mode === "follow") {
      toggleFollowUser(user.username);

      if (buttonText === 'Follow') {
        setButtonText('Unfollow');
      } else {
        setButtonText('Follow');
      }
    } else {
      toggleBlockUser(user.username);

      if (buttonText === "block") {
        setButtonText("unblock");
      } else {
        setButtonText("block");
      }
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
          className="!text-base font-semibold whitespace-nowrap"
          fullName={user.firstName + " " + user.lastName}
          username={user.username}
        />
        {mode === "follow" && (
          <p className="text-sm whitespace-nowrap">
            {user.followers} followers
          </p>
        )}
        <Button
          text={buttonText}
          bg={false}
          onClick={buttonClickHandler}
          className="text-[0.95rem] capitalize"
        />
      </div>
    </div>
  );
};

export default SuggestedUser;
