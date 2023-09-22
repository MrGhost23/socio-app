import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import UserTag from "../User/UserTag";
import UserBio from "../User/UserBio";
import Button from "../../ui/Button";

type Props = {
  receiverUsername: string;
  hideUserInfo: () => void;
};

const ChatInfo: React.FC<Props> = ({ receiverUsername, hideUserInfo }) => {
  const navigate = useNavigate();

  const {
    data: userData,
    loading: userDataIsLoading,
    error: userDataHasError,
  } = useAxios<ProfileType[]>(
    `http://localhost:5000/api/v1/users/${receiverUsername}`,
    "get"
  );

  if (userDataIsLoading) return "loading";
  if (userDataHasError) console.log(userDataHasError);

  return (
    <div className="relative flex flex-col items-center pt-8 lg:pt-0">
      <UserImage
        className="h-36 w-36"
        src={userData![0]?.userPicture}
        alt={`${userData![0]?.username}'s pfp`}
        username={userData![0]?.username}
      />
      <UserFullName
        className="font-semibold text-xl"
        fullName={userData![0]?.firstName + " " + userData![0]?.lastName}
        username={userData![0]?.username}
      />
      <UserTag username={userData![0]!.username} />
      <UserBio bio={userData![0]?.bio ?? ""} />
        <Button
          text="View Profile"
          bg={true}
          className="!w-fit mt-3 !px-8"
          onClick={() => navigate(`/profile/${userData![0]?.username}`)}
        />
      <MdClose
        className="absolute top-0 right-0 block lg:hidden text-2xl text-gray-500 cursor-pointer"
        onClick={hideUserInfo}
      />
    </div>
  );
};
export default ChatInfo;
