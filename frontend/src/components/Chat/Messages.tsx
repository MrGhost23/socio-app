import axios from "axios";
import useUserProfile from "../../hooks/useUserProfile";
import RecieverMsg from "./RecieverMsg";
import SenderMsg from "./SenderMsg";
import TypeMsg from "./TypeMsg";
import { useState, useEffect } from "react";
import { ProfileType } from "../../Types/Profile.types";
import { selectUser } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";

const Messages = ({ chat, currentUser }) => {
  const username = chat?.members?.find((username) => username !== currentUser);
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<ProfileType[]>(
          `http://localhost:5000/api/v1/users/${username}`
        );
        setUserData(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchUserProfile();
  }, [chat, currentUser]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/message/${chat._id}`
        );
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getMessages();
  }, [chat]);

  return (
    <div className="w-full px-5 flex flex-col h-[calc(100vh-82px)] justify-between">
      <div className="flex flex-col mt-5">
        {chat ? (
          messages.map((message) => (
            <>
              {message?.senderUsername !== userData?.username ? (
                <SenderMsg userPicture={user?.userPicture} msg={message.text} />
              ) : (
                <RecieverMsg
                  userPicture={userData.userPicture}
                  msg={message.text}
                />
              )}
            </>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-gray-600 font-semibold text-center">
              Tap on chat to start a conversation!
            </p>
          </div>
        )}
      </div>
      {chat && <TypeMsg />}
    </div>
  );
};
export default Messages;
