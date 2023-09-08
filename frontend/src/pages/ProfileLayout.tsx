import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Card from '../ui/Card';
import UserInfo from '../components/User/UserInfo';
import Button from '../ui/Button';
import {BsThreeDotsVertical} from 'react-icons/bs';
import RecentActivities from "../components/RecentActivities";

const ProfileLayout = () => {
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);

  const userInfo = {
    id: '142281728172',
    username: "Heisenberg",
    firstName: "Omar",
    lastName: "Adel",
    image:
      "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024",
    country: "Russia",
    occupation: "Web Dev.",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, fugiat.",
    followers: 500,
    following: 400,
  };

  const recentActivities = [
    {
      id: "1",
      action: "like",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Louie",
      postAuthorLastName: "Mayert"
    },
    {
      id: "2",
      action: "comment",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Forrest",
      postAuthorLastName: "Auer"
    },
    {
      id: "3",
      action: "like",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Jamel",
      postAuthorLastName: "McCullough"
    },
    {
      id: "4",
      action: "like",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Chanel",
      postAuthorLastName: "Gulgowski"
    },
    {
      id: "5",
      action: "comment",
      postId: "1",
      postAuthorId: "2198437676231",
      postAuthorFirstName: "Rubie",
      postAuthorLastName: "Quigley"
    },
  ];

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 mx-4 sm:mx-10 md:mx-20 my-10">
      <div className="col-span-2 lg:col-span-1 order-1">
        <Card className="sticky top-32 p-8 flex flex-col items-center">
          <BsThreeDotsVertical className="absolute top-10 right-6 text-xl text-gray-500 cursor-pointer transition duration-500 hover:text-indigo-700" />
          <UserInfo userInfo={userInfo} />
          <div className="w-full flex flex-col gap-4">
            <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={() => setIsFollowing(prevState => !prevState)} />
            <Button text="Edit profile" onClick={() => navigate("/settings")} />
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 col-span-2 xl:col-span-3 order-2 xl:gap-12">
        <div className="col-span-2 order-2 xl:order-1">
          <Outlet />
        </div>
        <div className="mb-8 xl:mb-0 xl:col-span-1 order-1 xl:order-2">
          <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
            <h3 className="mb-5 text-xl">Recent Activities</h3>
            <RecentActivities userFirstName={userInfo.firstName} recentActivities={recentActivities} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
