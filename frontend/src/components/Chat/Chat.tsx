import { ChatType } from "../../Types/Chat.types";
import { MessageType } from "../../Types/Message.types";
import Messages from "./Messages";
import ChatInfo from "./ChatInfo";
import ProfileSkeleton from "../../skeletons/ProfileSkeleton";
import MessagesSkeleton from "../../skeletons/MessagesSkeleton";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  currentChat: string | null;
  currentChatUserData: ProfileType;
  currentChatUserDataLoading: boolean;
  userChats: ChatType[];
  setSendMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  receiveMessage: MessageType | null;
  messagesIsVisible: boolean;
  chatInfoIsVisible: boolean;
  showUserInfo: () => void;
  hideUserInfo: () => void;
};

const Chat: React.FC<Props> = ({
  currentChat,
  currentChatUserData,
  currentChatUserDataLoading,
  userChats,
  setSendMessage,
  receiveMessage,
  messagesIsVisible,
  chatInfoIsVisible,
  showUserInfo,
  hideUserInfo,
}) => {
  const chat = userChats?.find((chat) => chat?.chatId === currentChat);

  const currentUser = useSelector(selectUser);
  const receiverUsername = chat?.members?.find(
    (username: string) => username !== currentUser!.username
  );

  const { data: chatMessages, loading: chatMessagesIsLoading } = useAxios<
    MessageType[]
  >(`http://localhost:5000/api/v1/message/${chat?.chatId}`, "get");

  const [messages, setMessages] = useState<MessageType[]>();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat!.chatId) {
      const currentDateAndTime = new Date().toISOString();
      console.log(receiveMessage);

      setMessages((prevMessages) => [
        ...prevMessages!,
        { ...receiveMessage, createdAt: currentDateAndTime },
      ]);
    }
  }, [chat, receiveMessage]);

  const submitHandler = async () => {
    if (newMessage.trim().length === 0) return;

    const message = {
      senderUsername: currentUser!.username,
      text: newMessage,
      chatId: chat!.chatId,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/message",
        message
      );
      setMessages([...messages!, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    setSendMessage({ ...message, receiverUsername: receiverUsername! });
  };
  return (
    <>
      <div
        className={
          messagesIsVisible
            ? "col-span-2 h-[calc(100vh-82px)] px-5 flex flex-col justify-end"
            : "col-span-2 h-[calc(100vh-82px)] px-5 hidden lg:flex lg:flex-col lg:justify-between"
        }
      >
        {currentChatUserDataLoading || chatMessagesIsLoading ? (
          <MessagesSkeleton messagesNumber={6} />
        ) : (
          <Messages
            chatMessages={messages!}
            receiverData={currentChatUserData}
            setChatInfoIsVisible={showUserInfo}
          />
        )}
        <MessageForm
          submitHandler={submitHandler}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          disabled={currentChatUserDataLoading || chatMessagesIsLoading}
        />
      </div>
      <div
        className={
          chatInfoIsVisible
            ? "col-span-1 h-[calc(100vh-82px)] lg:block border-l-2 px-4 sm:px-10 lg:px-4 pt-5"
            : "col-span-1 h-[calc(100vh-82px)] hidden lg:block border-l-2 px-4 sm:px-10 lg:px-4 pt-5"
        }
      >
        {currentChatUserDataLoading ? (
          <ProfileSkeleton className="shadow-none" />
        ) : (
          <ChatInfo
            receiverData={currentChatUserData}
            hideUserInfo={hideUserInfo}
          />
        )}
      </div>
    </>
  );
};

export default Chat;
