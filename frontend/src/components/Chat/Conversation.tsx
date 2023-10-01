import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatType } from "../../Types/Chat.types";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import ChatDate from "./ChatDate";
import ConversationSkeleton from "../../skeletons/ConversationSkeleton";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import axios from "axios";
import { MessageType } from "../../Types/Message.types";

type Props = {
  chat: ChatType;
  currentChat: string | null;
  changeChat: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentChatUserData: React.Dispatch<
    React.SetStateAction<ProfileType | null | undefined>
  >;
  setCurrentChatUserDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: MessageType | null;
  setSendMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
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
  setSendMessage,
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

  const dummyUserData = useMemo(
    () => ({
      _id: "",
      userId: "",
      username: receiverUsername,
      firstName: "Socio",
      lastName: "User",
      email: "",
      country: "",
      createdAt: "",
      bookmarks: [],
      following: [],
      followers: [],
      blockedUsers: [],
    }),
    [receiverUsername]
  );

  const [receiverData, setReceiverData] = useState<ProfileType>();
  const [receiverDataLoading, setReceiverDataLoading] = useState(true);

  const {
    data: userProfile,
    loading: userProfileIsLoading,
    error: userProfileHasError,
  } = useAxios<ProfileType>(
    `https://socio-irdl.onrender.com/api/v1/users/${receiverUsername}`,
    "get"
  );

  useEffect(() => {
    if (userProfile && !userProfileHasError) {
      if (currentChat === chat.chatId) {
        setReceiverData(userProfile);
        setReceiverDataLoading(false);

        setCurrentChatUserData(userProfile);
        setCurrentChatUserDataLoading(userProfileIsLoading);
      } else if (!receiverData) {
        setReceiverData(userProfile);
        setReceiverDataLoading(false);
      }
    } else if (userProfileHasError) {
      if (currentChat === chat.chatId) {
        setReceiverData(dummyUserData);
        setReceiverDataLoading(false);

        setCurrentChatUserData(dummyUserData);
        setCurrentChatUserDataLoading(userProfileIsLoading);
      } else if (!receiverData) {
        setReceiverData(dummyUserData);
        setReceiverDataLoading(false);
      }
    }
  }, [
    chat.chatId,
    currentChat,
    dummyUserData,
    receiverData,
    setCurrentChatUserData,
    setCurrentChatUserDataLoading,
    userProfile,
    userProfileHasError,
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
    await axios.patch(
      `https://socio-irdl.onrender.com/api/v1/chat/${chat.chatId}`
    );
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
   */

  useEffect(() => {
    if (sendMessage && sendMessage.chatId === chat.chatId) {
      setLatestMessage(sendMessage?.text);
      const currentDateAndTime = new Date().toISOString();
      setLatestMessageDate(currentDateAndTime);

      setSendMessage(null);
    }
  }, [chat.chatId, sendMessage, setSendMessage]);

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

      setCurrentUserHaveUnreadMessages(true);
      setReceiveMessage(null);
    }
  }, [chat.chatId, receiveMessage, setReceiveMessage]);

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
      {userProfileIsLoading || receiverDataLoading ? (
        <ConversationSkeleton />
      ) : (
        <div
          className={`flex flex-row gap-2 py-4 px-4 sm:px-10 lg:px-4 justify-center items-start border-b-2 cursor-pointer dark:bg-primaryDark dark:border-b-primarylessDark ${
            chat.chatId === currentChat || currentUserHaveUnreadMessages
              ? "bg-slate-200 dark:bg-primarylessDark"
              : "hover:bg-slate-100 dark:hover:bg-primarylessDarker"
          }`}
          onClick={changeChatHandler}
        >
          <UserImage
            className="min-h-[3.5rem] h-14 min-w-[3.5rem] w-14"
            src={receiverData?.userPicture}
            username={receiverUsername}
            online={receiverIsOnline && chat.allowMessage}
          />
          <div className="w-full flex flex-col">
            <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-start gap-1 sm:gap-1.5 lg:gap-[0.28rem] dark:text-textLighter">
              <UserFullName
                className="text-lg font-semibold"
                fullName={
                  receiverData!.firstName + " " + receiverData!.lastName
                }
              />
              {chat.latestMessage?.createdAt && (
                <ChatDate date={latestMessageDate!} />
              )}
            </div>
            <span className="text-gray-500 font-medium dark:text-textLighter">
              {latestMessage || (
                <span className="font-semibold text-gray-700">{`Say Hi to ${
                  receiverData!.firstName
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
