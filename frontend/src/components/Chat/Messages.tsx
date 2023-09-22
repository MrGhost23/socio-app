import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../../store/slices/authSlice";
import { MessageType } from "../../Types/Message.types";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";
import { ChatType } from "../../Types/Chat.types";
import ReceiverMsg from "./ReceiverMsg";
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
  receiverData: ProfileType;
  setSendMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  receiveMessage: MessageType | null;
  setChatInfoIsVisible: () => void;
};

const Messages: React.FC<Props> = ({
  chat,
  receiverData,
  setSendMessage,
  receiveMessage,
  setChatInfoIsVisible,
}) => {
  const currentUser = useSelector(selectUser);
  const receiverUsername = chat?.members?.find(
    (username: string) => username !== currentUser!.username
  );
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat.chatId) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    }
  }, [chat.chatId, receiveMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      senderUsername: currentUser!.username,
      text: newMessage,
      chatId: chat.chatId,
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
    `http://localhost:5000/api/v1/message/${chat.chatId}`,
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

  if (chatMessagesIsLoading) return <p>Loading</p>;
  if (chatMessagesHasError) console.log(chatMessagesHasError);

  return (
    <>
      <ScrollableDiv className="pt-5">
        <div className="flex flex-col gap-5">
          {chat &&
            messages.map((message, index) => (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? lastItemRef : null}
              >
                {message?.senderUsername !== receiverData?.username ? (
                  <SenderMsg
                    userPicture={currentUser!.userPicture!}
                    username={currentUser!.username}
                    msg={message.text}
                  />
                ) : (
                  <ReceiverMsg
                    userPicture={receiverData.userPicture!}
                    username={receiverData.username}
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
