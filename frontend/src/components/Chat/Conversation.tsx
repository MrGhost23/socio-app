import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatType } from "../../Types/Chat.types";
import { MessageType } from "../../Types/Message.types";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import ChatDate from "./ChatDate";
import ConversationSkeleton from "../../skeletons/ConversationSkeleton";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  chat: ChatType;
  currentChat: string | null;
  changeChat: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentChatUserData: React.Dispatch<React.SetStateAction<ProfileType>>;
  setCurrentChatUserDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: Message | null;
  receiveMessage: MessageType | null;
};

const Conversation: React.FC<Props> = ({
  chat,
  currentChat,
  changeChat,
  setCurrentChatUserData,
  setCurrentChatUserDataLoading,
  sendMessage,
  receiveMessage,
}) => {
  const navigate = useNavigate();

  const currentUser = useSelector(selectUser);
  const receiverUsername = chat.members.find(
    (username) => username !== currentUser!.username
  )!;

  const [latestMessage, setLatestMessage] = useState(chat.latestMessage?.text);
  const [latestMessageDate, setLatestMessageDate] = useState(
    chat.latestMessage?.createdAt
  );

  const { data: userProfile, loading: userProfileIsLoading } =
    useAxios<ProfileType>(
      `http://localhost:5000/api/v1/users/${receiverUsername}`,
      "get"
    );

  useEffect(() => {
    if (currentChat === chat.chatId) {
      setCurrentChatUserDataLoading(userProfileIsLoading);
    }

    if (currentChat === chat.chatId && userProfile) {
      setCurrentChatUserData(userProfile);
    }
  }, [
    chat.chatId,
    currentChat,
    setCurrentChatUserData,
    setCurrentChatUserDataLoading,
    userProfile,
    userProfileIsLoading,
  ]);

  const changeChatHandler = () => {
    changeChat(chat.chatId);
    navigate(`/chats/${receiverUsername}`);
  };

  useEffect(() => {
    if (receiveMessage && receiveMessage.chatId === chat.chatId) {
      setLatestMessage(receiveMessage?.text);
      const currentDateAndTime = new Date().toISOString();
      setLatestMessageDate(currentDateAndTime);
    }
  }, [chat.chatId, receiveMessage]);

  useEffect(() => {
    if (sendMessage && sendMessage.chatId === chat.chatId) {
      setLatestMessage(sendMessage?.text);
      const currentDateAndTime = new Date().toISOString();
      setLatestMessageDate(currentDateAndTime);
    }
  }, [chat.chatId, sendMessage]);

  return (
    <>
      {userProfileIsLoading ? (
        <ConversationSkeleton />
      ) : (
        <div
          className={`flex flex-row gap-2 py-4 px-4 sm:px-10 lg:px-4 justify-center items-start border-b-2 cursor-pointer ${
            chat.chatId === currentChat ? "bg-slate-200" : "hover:bg-slate-100"
          }`}
          onClick={changeChatHandler}
        >
          <UserImage
            className="min-h-[3.5rem] h-14 min-w-[3.5rem] w-14"
            src={userProfile!.userPicture}
            username={userProfile!.username}
          />
          <div className="w-full flex flex-col">
            <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-start gap-1 sm:gap-1.5 lg:gap-[0.28rem]">
              <UserFullName
                className="text-lg font-semibold"
                fullName={userProfile!.firstName + " " + userProfile!.lastName}
              />
              {chat.latestMessage?.createdAt && (
                <ChatDate date={latestMessageDate} />
              )}
            </div>
            <span className="text-gray-500 font-medium">
              {latestMessage ? (
                latestMessage
              ) : (
                <span className="font-semibold text-gray-700">{`Say Hi to ${
                  userProfile!.firstName
                }! 👋`}</span>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default Conversation;
