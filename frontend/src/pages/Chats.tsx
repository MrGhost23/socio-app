import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { ChatType } from "../Types/Chat.types";
import useAxios from "../hooks/useAxios";
import Conversations from "../components/Chat/Conversations";
import Messages from "../components/Chat/Messages";
import ChatInfo from "../components/Chat/ChatInfo";

const Chats = ({ setSendMessage, sendMessage, receiveMessage, socket }) => {
  const currentUser = useSelector(selectUser);
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null);

  const {
    data: userChats,
    loading: userChatsIsLoading,
    error: userChatsHasError,
  } = useAxios<ChatType[]>(
    `http://localhost:5000/api/v1/chat/${currentUser?.username}`,
    "get"
  );

  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  console.log(userChats);

  if (userChatsIsLoading) return "loading";
  if (userChatsHasError) console.log(userChatsHasError);

  return (
    <div className="h-[calc(100vh-82px)] shadow-lg rounded-lg">
      <div className="grid grid-cols-4 flex-row justify-between bg-white">
        <Conversations chats={userChats!} setCurrentChat={setCurrentChat} />
        {currentChat && (
          <Messages
            chat={currentChat}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        )}
        {currentChat && <ChatInfo chat={currentChat} />}
      </div>
    </div>
  );
};
export default Chats;
