import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../../store/slices/authSlice";
import { MessageType } from "../../Types/Message.types";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";
import { ChatType } from "../../Types/Chat.types";
import Receiver from "./ReceiverMsg";
import SenderMsg from "./SenderMsg";
import TypeMsg from "./TypeMsg";
import ScrollableDiv from "../../ui/ScrollableDiv";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  chat: ChatType;
  setSendMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  receiveMessage: MessageType | null;
  setChatInfoIsVisible: () => void;
};

const Messages: React.FC<Props> = ({
  chat,
  setSendMessage,
  receiveMessage,
  setChatInfoIsVisible,
}) => {
  const currentUser = useSelector(selectUser);
  const receiverUsername = chat?.members?.find(
    (username: string) => username !== currentUser!.username
  );
  const [userData, setUserData] = useState<ProfileType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
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

    setSendMessage({ ...message, receiverUsername: receiverUsername! });
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

  const lastItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: "instant",
      });
    }
  }, [messages]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<ProfileType[]>(
          `http://localhost:5000/api/v1/users/${receiverUsername}`
        );
        setUserData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchUserProfile();
  }, [chat, receiverUsername]);

  if (chatMessagesIsLoading) return <p>Loading</p>;
  if (chatMessagesHasError) console.log(chatMessagesHasError);

  return (
    <>
      <ScrollableDiv>
        <div className="flex flex-col gap-5">
          {chat &&
            messages.map((message, index) => (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? lastItemRef : null}
              >
                {message?.senderUsername !== userData?.username ? (
                  <SenderMsg
                    userPicture={currentUser!.userPicture!}
                    msg={message.text}
                  />
                ) : (
                  <Receiver
                    userPicture={userData.userPicture!}
                    msg={message.text}
                    setChatInfoIsVisible={setChatInfoIsVisible}
                  />
                )}
              </div>
            ))}
        </div>
      </ScrollableDiv>

      {chat && (
        <TypeMsg
          handleSubmit={handleSubmit}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      )}
    </>
  );
};
export default Messages;
