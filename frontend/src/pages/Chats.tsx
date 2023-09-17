import Conversations from "../components/Chat/Conversations";
import Messages from "../components/Chat/Messages";
import ChatInfo from "../components/Chat/ChatInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectUser } from "../store/slices/authSlice";
import { useSelector } from "react-redux";

const Chats = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/chat/${user?.username}`
        );
        setChats(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, []);

  return (
    <div className="h-[calc(100vh-82px)] shadow-lg rounded-lg">
      <div className="flex flex-row justify-between bg-white">
        <Conversations
          chats={chats}
          currentUser={user?.username}
          setCurrentChat={setCurrentChat}
        />
        <Messages chat={currentChat} currentUser={user?.username} />
        <ChatInfo chat={currentChat} currentUser={user?.username} />
      </div>
    </div>
  );
};
export default Chats;
