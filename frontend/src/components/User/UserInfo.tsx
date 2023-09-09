import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import UserTag from "./UserTag";
import UserCounty from "./UserCounty";
import UserBio from "./UserBio";
import UserStats from "./UserStats";
import UserOccupation from "./UserOccupation";

type Props = {
  userInfo: {
    firstName: string;
    lastName: string;
    createdAt: Date | string;
    country: string;
    followings: string | number | Array<string>;
    followers: string | number | Array<string>;
    role: string;
    userPicture: string;
    username: string;
    userId: string;
    email: string;
    occupation: string;
    bio: string;
  };
};

const UserInfo: React.FC<Props> = ({ userInfo }) => {
  return (
    <>
      <UserImage
        className="w-32"
        src={userInfo.userPicture}
        alt={userInfo.firstName + " " + userInfo.lastName}
        id={userInfo.username}
      />
      <UserFullName
        className="mb-0.5 !text-2xl"
        fullName={userInfo.firstName + " " + userInfo.lastName}
        id={userInfo.username}
      />
      <UserTag tag={userInfo.username} id={userInfo.username} />
      <UserOccupation occupation={userInfo.occupation || ""} />
      <UserCounty country={userInfo.country} />
      <UserBio bio={userInfo.bio || ""} />
      <UserStats
        followers={userInfo.followers}
        followings={userInfo.followings}
      />
    </>
  );
};

export default UserInfo;
