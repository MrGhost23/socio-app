import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { selectUser } from "../store/slices/authSlice";
import { ChatType } from "../Types/Chat.types";
import useAxios from "../hooks/useAxios";
import Conversations from "../components/Chat/Conversations";
import Messages from "../components/Chat/Messages";
import ChatInfo from "../components/Chat/ChatInfo";
import { useParams } from "react-router-dom";
import { MessageType } from "../Types/Message.types";

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

  useEffect(() => {
    if (userChats && receiverUsername) {
      setCurrentChat(
        userChats.find((chat) =>
          chat.members.find((user) => user === receiverUsername)
        )?._id || null
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
      <div className="grid grid-cols-4 flex-row justify-between bg-white">
        <Conversations chats={userChats!} setCurrentChat={setCurrentChat} />
        {currentChat && (
          <Messages
            chat={userChats!.find((chat) => chat._id === currentChat)!}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        )}
        {userChats && currentChat && (
          <ChatInfo
            receiverUsername={
              userChats
                .find((chat) => chat._id === currentChat)!
                .members.find((username) => username !== currentUser!.username)!
            }
          />
        )}
      </div>
    </div>
  );
};
export default Chats;
