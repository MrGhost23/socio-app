import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import axios from "axios";

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
  setCurrentChatUserData: React.Dispatch<
    React.SetStateAction<ProfileType | null | undefined>
  >;
  setCurrentChatUserDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: Message | null;
  receiveMessage: MessageType | null;
  setReceiveMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;

  onlineUsers: { [key: string]: boolean };
};

const Conversation: React.FC<Props> = ({
  chat,
  currentChat,
  changeChat,
  setCurrentChatUserData,
  setCurrentChatUserDataLoading,
  sendMessage,
  receiveMessage,
  setReceiveMessage,
  onlineUsers,
}) => {
  const navigate = useNavigate();
  const { username: usernameInUrl } = useParams();

  const currentUser = useSelector(selectUser);
  const receiverUsername = chat.members.find(
    (username) => username !== currentUser!.username
  )!;

  const receiverIsOnline = onlineUsers[receiverUsername];

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

  const [currentUserHaveUnreadMessages, setCurrentUserHaveUnreadMessages] =
    useState<boolean>(false);

  useEffect(() => {
    const latestMessageWasFromCurrentUser =
      chat.latestMessage?.senderUsername === currentUser?.username;
    setCurrentUserHaveUnreadMessages(
      !chat.isRead && !latestMessageWasFromCurrentUser
    );
  }, [chat, currentUser?.username]);

  const readChat = useCallback(async () => {
    await axios.patch(`http://localhost:5000/api/v1/chat/${chat.chatId}`);
    setCurrentUserHaveUnreadMessages(false);
  }, [chat.chatId]);

  const changeChatHandler = useCallback(async () => {
    changeChat(chat.chatId);
    navigate(`/chats/${receiverUsername}`);
  }, [changeChat, chat.chatId, navigate, receiverUsername]);

  /*
   * If the current user receives a message
   * then the latest message and the latest message date
   * will both get updated to that message he sent and the current date
   * ofc the id of the received message and the chat need to match
   * will set the chat to have unread messages too
   */

  useEffect(() => {
    if (receiveMessage && receiveMessage.chatId === chat.chatId) {
      setLatestMessage(receiveMessage?.text);
      const currentDateAndTime = new Date().toISOString();
      setLatestMessageDate(currentDateAndTime);

      console.log("received message", receiveMessage);
      setCurrentUserHaveUnreadMessages(true);
      setReceiveMessage(null);
    }
  }, [chat.chatId, receiveMessage, setReceiveMessage]);

  /*
   * If the current user receives a message
   * then the latest message and the latest message date
   * will both get updated to that message he sent and the current date
   * ofc the id of the received message and the chat need to match
   */

  useEffect(() => {
    if (sendMessage && sendMessage.chatId === chat.chatId) {
      setLatestMessage(sendMessage?.text);
      const currentDateAndTime = new Date().toISOString();
      setLatestMessageDate(currentDateAndTime);
    }
  }, [chat.chatId, sendMessage, setReceiveMessage]);

  /*
   * - current user enters a chat directly and this chat have unread messages
   * - current user switches to a chat that have unread messages
   * - current user is in a chat and that chat received a new message
   * => the readChat function will be called
   */

  useEffect(() => {
    if (
      currentChat === chat.chatId &&
      currentUserHaveUnreadMessages &&
      (usernameInUrl ||
        (receiveMessage && receiveMessage.chatId === chat.chatId))
    ) {
      console.log("useEffect function was called");
      readChat();
    }
  }, [
    chat.chatId,
    currentChat,
    currentUserHaveUnreadMessages,
    readChat,
    receiveMessage,
    usernameInUrl,
  ]);

  return (
    <>
      {userProfileIsLoading ? (
        <ConversationSkeleton />
      ) : (
        <div
          className={`flex flex-row gap-2 py-4 px-4 sm:px-10 lg:px-4 justify-center items-start border-b-2 cursor-pointer ${
            chat.chatId === currentChat || currentUserHaveUnreadMessages
              ? "bg-slate-200"
              : "hover:bg-slate-100"
          }`}
          onClick={changeChatHandler}
        >
          <UserImage
            className="min-h-[3.5rem] h-14 min-w-[3.5rem] w-14"
            src={userProfile!.userPicture}
            username={userProfile!.username}
            online={receiverIsOnline && chat.allowMessage}
          />
          <div className="w-full flex flex-col">
            <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-start gap-1 sm:gap-1.5 lg:gap-[0.28rem]">
              <UserFullName
                className="text-lg font-semibold"
                fullName={userProfile!.firstName + " " + userProfile!.lastName}
              />
              {chat.latestMessage?.createdAt && (
                <ChatDate date={latestMessageDate!} />
              )}
            </div>
            <span className="text-gray-500 font-medium">
              {latestMessage || (
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
