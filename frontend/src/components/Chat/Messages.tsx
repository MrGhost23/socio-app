import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { MessageType } from "../../Types/Message.types";
import { ProfileType } from "../../Types/Profile.types";
import ReceiverMsg from "./ReceiverMsg";
import SenderMsg from "./SenderMsg";
import ScrollableDiv from "../../ui/ScrollableDiv";

type Props = {
  chatMessages: MessageType[];
  receiverData: ProfileType;
  setChatInfoIsVisible: () => void;
};

const Messages: React.FC<Props> = ({
  chatMessages,
  receiverData,
  setChatInfoIsVisible,
}) => {
  const currentUser = useSelector(selectUser);

  const [messages, setMessages] = useState(chatMessages);

  useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages]);

  const lastItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: "instant",
      });
    }
  }, [messages]);

  return (
    <ScrollableDiv className="pt-5 flex flex-col gap-5 pb-1">
      {messages?.map((message, index) => (
        <div
          key={message._id}
          ref={index === messages.length - 1 ? lastItemRef : null}
        >
          {message?.senderUsername !== receiverData?.username ? (
            <SenderMsg
              userPicture={currentUser!.userPicture!}
              username={currentUser!.username}
              msg={message.text}
              msgDate={message.createdAt}
            />
          ) : (
            <ReceiverMsg
              userPicture={receiverData.userPicture!}
              username={receiverData.username}
              msg={message.text}
              msgDate={message.createdAt}
              setChatInfoIsVisible={setChatInfoIsVisible}
            />
          )}
        </div>
      ))}
    </ScrollableDiv>
  );
};
export default Messages;
