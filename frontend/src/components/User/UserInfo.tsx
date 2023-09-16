import { ProfileType } from "../../Types/Profile.types";
import UserImage from "./UserImage";
import UserFullName from "./UserFullName";
import UserTag from "./UserTag";
import UserOccupation from "./UserOccupation";
import UserCounty from "./UserCounty";
import UserBio from "./UserBio";
import UserStats from "./UserStats";

interface UserInfoProps {
  userInfo: ProfileType;
  followers: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo, followers }) => {
  return (
    <>
      <UserImage
        className="w-32"
        src={userInfo.userPicture}
        alt={userInfo.firstName + " " + userInfo.lastName}
        username={userInfo.username}
      />
      <UserFullName
        className="mb-0.5 !text-2xl"
        fullName={userInfo.firstName + " " + userInfo.lastName}
        username={userInfo.username}
      />
      <UserTag username={userInfo.username} />
      <UserOccupation occupation={userInfo.occupation} />
      <UserCounty country={userInfo.country} />
      <UserBio bio={userInfo.bio ?? ""} />
      <UserStats followers={followers} following={userInfo.following.length} />
    </>
  );
};

export default UserInfo;
