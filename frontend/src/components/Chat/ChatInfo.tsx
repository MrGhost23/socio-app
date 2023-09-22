import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { ProfileType } from "../../Types/Profile.types";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import UserTag from "../User/UserTag";
import UserBio from "../User/UserBio";
import Button from "../../ui/Button";

type Props = {
  receiverData: ProfileType;
  hideUserInfo: () => void;
};

const ChatInfo: React.FC<Props> = ({ receiverData, hideUserInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center pt-8 lg:pt-0">
      <UserImage
        className="h-36 w-36"
        src={receiverData.userPicture}
        alt={`${receiverData.username}'s pfp`}
        username={receiverData.username}
      />
      <UserFullName
        className="font-semibold text-xl"
        fullName={receiverData.firstName + " " + receiverData.lastName}
        username={receiverData.username}
      />
      <UserTag username={receiverData.username} />
      <UserBio bio={receiverData.bio ?? ""} />
      <Button
        text="View Profile"
        bg={true}
        className="!w-fit mt-3 !px-8"
        onClick={() => navigate(`/profile/${receiverData.username}`)}
      />
      <MdClose
        className="absolute top-0 right-0 block lg:hidden text-2xl text-gray-500 cursor-pointer"
        onClick={hideUserInfo}
      />
    </div>
  );
};
export default ChatInfo;
