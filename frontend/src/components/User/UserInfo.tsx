import UserImage from './UserImage';
import UserFullName from './UserFullName';
import UserTag from './UserTag';
import UserCounty from './UserCounty';
import UserBio from './UserBio';
import UserStats from './UserStats';

type Props = {
  userInfo: {
    image: string,
    firstName: string,
    lastName: string,
    username: string,
    country: string,
    bio: string,
    followers: number,
    following: number
  };
}

const UserInfo: React.FC<Props> = ({ userInfo }) => {
  return (
    <>
      <UserImage className='w-32' src={userInfo.image} alt={userInfo.firstName + ' ' + userInfo.lastName} />
      <UserFullName className='mb-1 !text-2xl' fullName={userInfo.firstName + ' ' + userInfo.lastName} />
      <UserTag tag={userInfo.username} />
      <UserCounty country={userInfo.country} />
      <UserBio bio={userInfo.bio} />
      <UserStats followers={userInfo.followers} following={userInfo.following} />
    </>
  );
};

export default UserInfo;