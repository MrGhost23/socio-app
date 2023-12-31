import { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { selectUser, toggleFollowUser } from "../store/slices/authSlice";
import { ProfileType } from "../Types/Profile.types";
import { RecentActivityType } from "../Types/RecentActivity.type";
import useAxios from "../hooks/useAxios";
import UserInfo from "../components/User/UserInfo";
import UserMenu from "../components/User/UserMenu";
import RecentActivities from "../components/RecentActivities";
import Card from "../ui/Card";
import Button from "../ui/Button";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import RecentActivitiesSkeleton from "../skeletons/RecentActivitiesSkeleton";
import Sidebar from "../components/Sidebar";
import { RootState } from "../store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};

const ProfileLayout: React.FC<Props> = ({ socket }) => {
  const currentUser = useSelector(selectUser);
  const { username } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const {
    data: userProfile,
    loading: userProfileIsLoading,
    error: userProfileHasError,
  } = useAxios<ProfileType>(
    `https://socio-irdl.onrender.com/api/v1/users/${username}`,
    "get"
  );

  const {
    data: userActivities,
    loading: userActivitiesIsLoading,
    error: userActivitiesHasError,
  } = useAxios<RecentActivityType[]>(
    `https://socio-irdl.onrender.com/api/v1/users/${username}/activities`,
    "get"
  );

  const [followers, setFollowers] = useState<number>(0);
  const [followersLoading, setFollowersLoading] = useState(true);

  useEffect(() => {
    if (userProfile) {
      setFollowers(userProfile.followers.length);
      setFollowersLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      setIsFollowing(currentUser!.following.includes(userProfile._id));
    }
  }, [currentUser, userProfile]);

  const isMyProfile = currentUser?.username === userProfile?.username;
  const [followButtonLoading, setFollowButtonLoading] = useState(false);

  const toggleFollowHandler = async () => {
    setFollowButtonLoading(true);

    await dispatch(
      toggleFollowUser({
        id: userProfile!._id,
        username: userProfile!.username,
      })
    );

    setFollowers((prevState) => (isFollowing ? prevState - 1 : prevState + 1));

    setFollowButtonLoading(false);
    if (!isFollowing) {
      socket.emit("sendNotification", {
        senderUsername: currentUser!.username,
        receiverUsername: userProfile!.username,
        actionType: "follow",
      });
    }
  };

  const sendMessageHandler = async () => {
    try {
      await axios.post(`https://socio-irdl.onrender.com/api/v1/chat`, {
        senderUsername: currentUser!.username,
        receiverUsername: userProfile!.username,
      });
      navigate(`/chats/${userProfile!.username}`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  useEffect(() => {
    if (userProfileHasError || userActivitiesHasError) {
      navigate("/error");
    }
  }, [navigate, userProfileHasError, userActivitiesHasError]);

  if (userProfileHasError || userActivitiesHasError) return;

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 mx-4 sm:mx-10 md:mx-10 my-10 pb-10">
        <Sidebar hide={true} />
        <div className="col-span-2 lg:col-span-1 order-1">
          {userProfileIsLoading || followersLoading ? (
            <ProfileSkeleton className="!sticky top-32 !px-10 !py-8" />
          ) : (
            <Card className="sticky top-32 px-10 py-8 flex flex-col items-center">
              <div className="relative top-0 right-2 left-full self-start">
                <UserMenu
                  isMyProfile={isMyProfile}
                  profileId={userProfile!._id}
                  profileUsername={userProfile!.username}
                />
              </div>
              <UserInfo userInfo={userProfile!} followers={followers} />
              <div className="w-full flex flex-col gap-4">
                {!isMyProfile ? (
                  <>
                    <Button
                      text="Send Message"
                      onClick={sendMessageHandler}
                      bg={true}
                    />
                    <Button
                      text={
                        followButtonLoading
                          ? "Loading..."
                          : isFollowing
                          ? "Unfollow"
                          : "Follow"
                      }
                      onClick={
                        followButtonLoading ? () => {} : toggleFollowHandler
                      }
                      bg={true}
                    />
                  </>
                ) : (
                  <Button
                    text="Edit profile"
                    onClick={() => navigate("/settings")}
                    bg={true}
                  />
                )}
              </div>
            </Card>
          )}
        </div>
        <div className="flex flex-col xl:grid xl:grid-cols-3 col-span-2 xl:col-span-3 order-2 gap-8 xl:gap-12">
          <div className="w-full xl:col-span-2 order-2 xl:order-1">
            <Outlet />
          </div>
          <div className="w-full xl:col-span-1 order-1 xl:order-2">
            {userActivitiesIsLoading ? (
              <RecentActivitiesSkeleton className="!sticky top-32 !px-8 !py-4" />
            ) : (
              <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
                <h3 className="mb-5 text-xl">Recent Activities</h3>
                <RecentActivities
                  isMyProfile={isMyProfile}
                  username={userProfile!.username}
                  userFirstName={userProfile!.firstName}
                  recentActivities={userActivities!}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
