import { Outlet, useParams, useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import UserInfo from "../components/User/UserInfo";
import Button from "../ui/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import RecentActivities from "../components/RecentActivities";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileType } from "../Types/Profile.types";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import useUserProfile from "../hooks/useUserProfile";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { id: userId } = useParams();
  const { profile, loading, error } = useUserProfile(userId);

  const isMyProfile = user?.username === profile?.username;

  const [isFollowing, setIsFollowing] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const blockHandler = () => {
    console.log("Blocked User");
    setMenuOpened(false);
  };

  const ReportHandler = () => {
    console.log("Reported User");
    setMenuOpened(false);
  };

  const userInfo = {
    id: profile?.username,
    username: profile?.username,
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    userPicture: profile?.userPicture,
    country: profile?.country,
    occupation: "كلام في الحب",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, fugiat.",
    followers: profile?.followers?.length,
    followings: profile?.followings?.length,
    createdAt: profile?.createdAt,
    role: profile?.role,
    userId: profile?.userId,
    email: profile?.email,
  };

  const recentActivities = [
    {
      id: "1",
      action: "like",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Louie",
      postAuthorLastName: "Mayert",
    },
    {
      id: "2",
      action: "comment",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Forrest",
      postAuthorLastName: "Auer",
    },
    {
      id: "3",
      action: "like",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Jamel",
      postAuthorLastName: "McCullough",
    },
    {
      id: "4",
      action: "like",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Chanel",
      postAuthorLastName: "Gulgowski",
    },
    {
      id: "5",
      action: "comment",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Rubie",
      postAuthorLastName: "Quigley",
    },
  ];

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 mx-4 sm:mx-10 md:mx-20 my-10">
      <div className="col-span-2 lg:col-span-1 order-1">
        <Card className="sticky top-32 px-10 py-8 flex flex-col items-center">
          <div className="relative top-0 right-2 left-full self-start">
            <BsThreeDotsVertical
              className={
                menuOpened
                  ? "absolute text-xl text-sky-500 cursor-pointer"
                  : "absolute text-xl text-gray-500 cursor-pointer transition duration-500 hover:text-sky-500"
              }
              onClick={() => setMenuOpened((prevState) => !prevState)}
            />
            {menuOpened && (
              <ul className="absolute top-7 -right-2 md:translate-x-full px-6 py-4 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-4">
                <li>
                  <Button text="Block" bg={false} onClick={blockHandler} />
                </li>
                <li>
                  <Button text="Report" bg={false} onClick={ReportHandler} />
                </li>
              </ul>
            )}
          </div>
          <UserInfo userInfo={userInfo} />
          <div className="w-full flex flex-col gap-4">
            {!isMyProfile ? (
              <Button
                text={isFollowing ? "Unfollow" : "Follow"}
                onClick={() => setIsFollowing((prevState) => !prevState)}
                bg={true}
              />
            ) : (
              <Button
                text="Edit profile"
                onClick={() => navigate("/settings")}
                bg={true}
              />
            )}
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 col-span-2 xl:col-span-3 order-2 xl:gap-12">
        <div className="col-span-2 order-2 xl:order-1">
          <Outlet />
        </div>
        <div className="mb-8 xl:mb-0 xl:col-span-1 order-1 xl:order-2">
          <Card className="sticky top-32 -z-10 px-8 py-4 pb-6 flex flex-col !text-left">
            <h3 className="mb-5 text-xl">Recent Activities</h3>
            <RecentActivities
              userFirstName={userInfo.firstName}
              recentActivities={recentActivities}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
