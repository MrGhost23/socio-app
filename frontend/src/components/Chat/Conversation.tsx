import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { ChatType } from "../../Types/Chat.types";
import { MessageType } from "../../Types/Message.types";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import ChatDate from "./ChatDate";
import ConversationSkeleton from "../../skeletons/ConversationSkeleton";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  chat: ChatType;
  changeChat: React.Dispatch<React.SetStateAction<string | null>>;
  sendMessage: Message | null;
  receiveMessage: MessageType | null;
};

const Conversation: React.FC<Props> = ({
  chat,
  changeChat,
  sendMessage,
  receiveMessage,
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const [latestMessage, setLatestMessage] = useState(chat.latestMessage?.text);

  const receiverUsername = chat.members.find(
    (username) => username !== currentUser!.username
  );

  const changeChatHandler = () => {
    changeChat(chat.chatId);
    navigate(`/chats/${receiverUsername}`);
  };

  const { data: userProfile, loading: userProfileIsLoading } =
    useAxios<ProfileType>(
      `http://localhost:5000/api/v1/users/${receiverUsername}`,
      "get"
    );

  useEffect(() => {
    if (receiveMessage && receiveMessage.chatId === chat.chatId) {
      setLatestMessage(receiveMessage?.text);
    }
  }, [chat.chatId, receiveMessage]);

  useEffect(() => {
    if (sendMessage && sendMessage.chatId === chat.chatId) {
      setLatestMessage(sendMessage?.text);
    }
  }, [chat.chatId, sendMessage]);

  return (
    <>
      {userProfileIsLoading ? (
        <ConversationSkeleton />
      ) : (
        <div
          className="flex flex-row gap-2 py-4 px-4 sm:px-10 lg:px-4 justify-center items-start border-b-2 cursor-pointer hover:bg-slate-200"
          onClick={changeChatHandler}
        >
          <UserImage
            className="min-h-[3.5rem] h-14 min-w-[3.5rem] w-14"
            src={userProfile!.userPicture}
            username={userProfile!.username}
          />
          <div className="w-full flex flex-col">
            <div className="flex items-center flex-wrap gap-2">
              <UserFullName
                className="text-lg font-semibold"
                fullName={userProfile!.firstName + " " + userProfile!.lastName}
              />
              {chat.latestMessage?.createdAt && (
                <ChatDate date={chat.latestMessage.createdAt} />
              )}
            </div>
            <span className="text-gray-500 font-medium">{latestMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Conversation;
