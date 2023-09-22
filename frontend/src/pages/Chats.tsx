import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { selectUser } from "../store/slices/authSlice";
import { ChatType } from "../Types/Chat.types";
import useAxios from "../hooks/useAxios";
import { MessageType } from "../Types/Message.types";
import Conversations from "../components/Chat/Conversations";
import Chat from "../components/Chat/Chat";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  sendMessage: Message | null;
  setSendMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  receiveMessage: MessageType | null;
  socket: Socket;
};

const Chats: React.FC<Props> = ({
  setSendMessage,
  sendMessage,
  receiveMessage,
  socket,
}) => {
  const { username: receiverUsername } = useParams();

  const currentUser = useSelector(selectUser);
  const [currentChat, setCurrentChat] = useState<string | null>(null);

  const {
    data: userChats,
    loading: userChatsIsLoading,
    error: userChatsHasError,
  } = useAxios<ChatType[]>(
    `http://localhost:5000/api/v1/chat/${currentUser?.username}`,
    "get"
  );

  console.log(userChats);

  const [conversationsIsVisible, setConversationsIsVisible] = useState(true);
  const [messagesIsVisible, setMessagesIsVisible] = useState(true);
  const [chatInfoIsVisible, setChatInfoIsVisible] = useState(true);

  const showUserInfo = () => {
    setMessagesIsVisible(false);
    setMessagesIsVisible(false);
    setChatInfoIsVisible(true);
  };

  const hideUserInfo = () => {
    setMessagesIsVisible(false);
    setMessagesIsVisible(true);
    setChatInfoIsVisible(false);
  };

  useEffect(() => {
    if (userChats && receiverUsername) {
      setConversationsIsVisible(false);
      setMessagesIsVisible(true);
      setChatInfoIsVisible(false);
      setCurrentChat(
        userChats.find((chat) =>
          chat.members.find((user) => user === receiverUsername)
        )?.chatId || null
      );
    }
  }, [currentUser?.username, userChats, receiverUsername]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  if (userChatsIsLoading) return "loading";
  if (userChatsHasError) console.log(userChatsHasError);

  return (
    <div className="h-[calc(100vh-82px)] shadow-lg rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between bg-white">
        <div
          className={
            conversationsIsVisible
              ? "col-span-1 lg:h-[calc(100vh-82px)] flex flex-col border-r-2 overflow-y-auto"
              : "col-span-1 lg:h-[calc(100vh-82px)] hidden lg:flex lg:flex-col border-r-2 overflow-y-auto"
          }
        >
          <Conversations chats={userChats!} setCurrentChat={setCurrentChat} />
        </div>
        {currentChat ? (
          <Chat
            currentChat={currentChat}
            userChats={userChats!}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
            messagesIsVisible={messagesIsVisible}
            chatInfoIsVisible={chatInfoIsVisible}
            showUserInfo={showUserInfo}
            hideUserInfo={hideUserInfo}
          />
        ) : (
          <div className="col-span-3 hidden lg:flex lg:justify-center lg:items-center">
            <p className="text-gray-600 font-semibold text-center">
              Tap on chat to start a conversation!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Chats;
