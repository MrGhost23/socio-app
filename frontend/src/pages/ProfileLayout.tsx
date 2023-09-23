import { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../store/slices/authSlice";
import { RecentActivityType } from "../Types/RecentActivity.type";
import useUserProfile from "../hooks/useUserProfile";
import useProfileActions from "../hooks/useProfileActions";
import UserInfo from "../components/User/UserInfo";
import UserMenu from "../components/User/UserMenu";
import RecentActivities from "../components/RecentActivities";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";
import { toast } from "react-toastify";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const { username } = useParams();
  const { profile, loading, error } = useUserProfile(username!);
  const [followers, setFollowers] = useState<number>(0);

  useEffect(() => {
    if (profile) {
      setFollowers(profile.followers.length);
    }
  }, [profile]);

  const [userActivities, setUserActivities] = useState<RecentActivityType[]>();
  const [userActivitiesLoading, setUserActivitiesLoading] =
    useState<boolean>(true);
  const [userActivitiesError, setUserActivitiesError] =
    useState<boolean>(false);
  const isMyProfile = currentUser?.username === profile?.username;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followButtonLoading, setFollowButtonLoading] = useState(false);

  const { toggleFollowUser } = useProfileActions();

  const toggleFollowHandler = async () => {
    setFollowButtonLoading(true);
    await toggleFollowUser(profile!.username);
    setFollowers((prevState) => (isFollowing ? prevState - 1 : prevState + 1));
    setIsFollowing((prevState) => !prevState);
    setFollowButtonLoading(false);
  };

  useEffect(() => {
    const fetchIsFollowing = async () => {
      if (isMyProfile) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${username}/isFollowing`
        );
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIsFollowing();
  }, [isMyProfile, username]);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${username}/activities`
        );
        setUserActivities(response.data);
      } catch (error) {
        setUserActivitiesError(!!error);
      }
      setUserActivitiesLoading(false);
    };
    fetchUserActivities();
  }, [username]);

  const sendMessageHandler = async () => {
    try {
      await axios.post(`http://localhost:5000/api/v1/chat`, {
        senderUsername: currentUser!.username,
        receiverUsername: profile!.username,
      });
      navigate(`/chats/${profile!.username}`);
    } catch (error) {
      toast.info(`Something went wrong!`);
    }
  };

  if (!loading && !profile) {
    navigate("/");
    return;
  }
  if (error) console.log(error);

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 mx-4 sm:mx-10 md:mx-10 my-10">
        <div className="col-span-2 lg:col-span-1 order-1">
          {loading ? (
            <ProfileSkeleton />
          ) : (
            <Card className="sticky top-32 px-10 py-8 flex flex-col items-center">
              <div className="relative top-0 right-2 left-full self-start">
                <UserMenu
                  isMyProfile={isMyProfile}
                  profileUsername={profile!.username}
                />
              </div>
              <UserInfo userInfo={profile!} followers={followers} />
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
            <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
              <h3 className="mb-5 text-xl">Recent Activities</h3>
              {userActivitiesLoading ? (
                <Loading />
              ) : userActivitiesError ? (
                "An error occurred"
              ) : (
                <RecentActivities
                  isMyProfile={isMyProfile}
                  username={profile!.username}
                  userFirstName={profile!.firstName}
                  recentActivities={userActivities!}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
