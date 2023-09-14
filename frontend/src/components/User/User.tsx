import { UserType } from '../../Types/User.types';
import useProfileActions from '../../hooks/useProfileActions';
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import Button from "../../ui/Button";
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const mainContainerClasses = "flex";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const text = [
    ['follow', 'unfollow'],
    ['unblock', 'block'],
  ];

  const [buttonText, setButtonText] = useState(mode === 'follow' ? text[0][0] : text[1][0]);

  const {
    followUser,
    blockUser,
  } = useProfileActions();

  const buttonClickHandler = () => {
    if (mode === "follow") {
      followUser(user.username);

      if (buttonText === text[0][0]) {
        setButtonText(text[0][1]);
      } else {
        setButtonText(text[0][0]);
      }
    } else {
      blockUser(user.username);
      
      if (buttonText === text[1][0]) {
        setButtonText(text[1][1]);
      } else {
        setButtonText(text[1][0]);
      }
    }
  };

  const [isFollowing, setIsFollowing] = useState<boolean>();

  useEffect(() => {
    const fetchIsFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/${user.username}/isFollowing`);
        setIsFollowing(response.data.isFollowing);
        console.log(response.data.isFollowing)
      } catch (error) {
        console.log(error)
      }
    }
    fetchIsFollowing();
  }, [user.username])
  

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
        {
          mode === 'follow' && <p className="text-sm whitespace-nowrap">{user.followers} followers</p>
        }
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
