import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { ChatType } from "../../Types/Chat.types";
import useUserProfile from "../../hooks/useUserProfile";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import ChatDate from "./ChatDate";

type Props = {
  chat: ChatType;
  changeChat: React.Dispatch<React.SetStateAction<string | null>>;
};

const Conversation: React.FC<Props> = ({ chat, changeChat }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const receiverUsername = chat.members.find(
    (username) => username !== currentUser!.username
  );

  const changeChatHandler = () => {
    changeChat(chat._id);
    navigate(`/chats/${receiverUsername}`);
  };

  const { profile, loading } = useUserProfile(receiverUsername!);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="flex flex-row gap-2 py-4 px-4 sm:px-10 lg:px-4 justify-center items-start border-b-2 cursor-pointer hover:bg-slate-200"
      onClick={changeChatHandler}
    >
      <UserImage
        className="min-h-[3.5rem] h-14 min-w-[3.5rem] w-14 !mb-0"
        src={profile!.userPicture}
        alt={`${profile?.username}'s profile picture`}
      />
      <div className="w-full flex flex-col">
        <div className="flex items-center flex-wrap gap-2">
          <UserFullName
            className="text-lg font-semibold"
            fullName={profile!.firstName + " " + profile!.lastName}
          />
          <ChatDate date={chat.updatedAt} />
        </div>
        <span className="text-gray-500 font-medium">خالص</span>
      </div>
    </div>
  );
};
export default Conversation;
