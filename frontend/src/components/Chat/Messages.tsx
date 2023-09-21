import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../../store/slices/authSlice";
import { MessageType } from "../../Types/Message.types";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";
import Receiver from "./ReceiverMsg";
import SenderMsg from "./SenderMsg";
import TypeMsg from "./TypeMsg";
import ScrollableDiv from "../../ui/ScrollableDiv";

const Messages = ({ chat, setSendMessage, receiveMessage }) => {
  const currentUser = useSelector(selectUser);
  const username = chat?.members?.find(
    (username: string) => username !== currentUser!.username
  );
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  console.log(messages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    }
  }, [chat._id, receiveMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      senderUsername: currentUser!.username,
      text: newMessage,
      chatId: chat._id,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/message",
        message
      );
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    setSendMessage({ ...message, receiverUsername: username });
  };

  const {
    data: chatMessages,
    loading: chatMessagesIsLoading,
    error: chatMessagesHasError,
  } = useAxios<MessageType[]>(
    `http://localhost:5000/api/v1/message/${chat._id}`,
    "get"
  );

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

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
  }, [chat]);

  if (chatMessagesIsLoading) return <p>Loading</p>;
  if (chatMessagesHasError) console.log(chatMessagesHasError);

  return (
    <ScrollableDiv className="col-span-2 relative">
      <div className="w-full px-5 flex flex-col h-[calc(100vh-82px)] justify-between">
        <div className="flex flex-col mt-5">
          {chat ? (
            messages.map((message) => (
              <div key={message._id}>
                {message?.senderUsername !== userData?.username ? (
                  <SenderMsg
                    userPicture={currentUser!.userPicture!}
                    msg={message.text}
                  />
                ) : (
                  <Receiver
                    userPicture={userData.userPicture}
                    msg={message.text}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-gray-600 font-semibold text-center">
                Tap on chat to start a conversation!
              </p>
            </div>
          )}
        </div>
        {chat && (
          <TypeMsg
            handleSubmit={handleSubmit}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        )}
      </div>
    </ScrollableDiv>
  );
};
export default Messages;
