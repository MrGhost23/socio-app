import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFollowUser,
  toggleBlockUser,
  selectUser,
} from "../../store/slices/authSlice";
import { UserType } from "../../Types/User.types";
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import Button from "../../ui/Button";
import { RootState } from "../../store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

type Props = {
  user: UserType;
  changeStyle: boolean;
  mode: string;
  center?: boolean;
  socket: Socket;
};

const User: React.FC<Props> = ({ user, changeStyle, mode, center, socket }) => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const currentUser = useSelector(selectUser);
  const isFollowing = currentUser!.following.includes(user._id);
  const [followers, setFollowers] = useState<number>(user.followers!);

  const mainContainerClasses = center ? "flex items-center" : "flex";
  const infoContainerClasses = "flex flex-col text-gray-600";

  const [followButtonLoading, setFollowButtonLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Loading...");

  useEffect(() => {
    setButtonText(
      mode === "follow" ? (isFollowing ? "Unfollow" : "Follow") : "unblock"
    );
  }, [mode, isFollowing]);

  const buttonClickHandler = async () => {
    setFollowButtonLoading(true);
    if (mode === "follow") {
      await dispatch(
        toggleFollowUser({
          id: user._id,
          username: user.username,
        })
      );

      if (!isFollowing) {
        socket.emit("sendNotification", {
          senderUsername: currentUser!.username,
          receiverUsername: user.username,
          actionType: "follow",
        });
      }

      if (buttonText === "Follow") {
        setFollowers((prevState) => prevState + 1);
        setButtonText("Unfollow");
      } else {
        setFollowers((prevState) => prevState - 1);
        setButtonText("Follow");
      }
      setFollowButtonLoading(false);
    } else {
      await dispatch(toggleBlockUser({ id: user._id, username: user.username }));

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

export default User;
