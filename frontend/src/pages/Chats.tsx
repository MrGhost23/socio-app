import Conversations from "../components/Chat/Conversations";
import Messages from "../components/Chat/Messages";
import ChatInfo from "../components/Chat/ChatInfo";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { selectUser } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { ProfileType } from "../Types/Profile.types";
import { io } from "socket.io-client";

const Chats = ({
  setSendMessage,
  sendMessage,
  setReceiveMessage,
  receiveMessage,
}) => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [userData, setUserData] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("ws://localhost:8800");

    socket.current.on("recieve-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

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
  const username = currentChat?.members?.find(
    (username) => username !== user?.username
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<ProfileType[]>(
          `http://localhost:5000/api/v1/users/${username}`
        );
        setUserData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat !== null) fetchUserProfile();
  }, [currentChat]);

  return (
    <div className="h-[calc(100vh-82px)] shadow-lg rounded-lg">
      <div className="flex flex-row justify-between bg-white">
        <Conversations
          chats={chats}
          currentUser={user?.username}
          setCurrentChat={setCurrentChat}
        />
        <Messages
          chat={currentChat}
          currentUser={user?.username}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
        <ChatInfo
          chat={currentChat}
          userData={userData}
          currentUser={user?.username}
        />
      </div>
    </div>
  );
};
export default Chats;
