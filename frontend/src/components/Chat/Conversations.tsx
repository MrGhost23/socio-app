import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { ChatType } from "../../Types/Chat.types";
import { MessageType } from "../../Types/Message.types";
import Conversation from "./Conversation";
import ConversationsSkeletons from "../../skeletons/ConversationsSkeletons";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  chatsLoading: boolean;
  chats: ChatType[];
  setCurrentChat: React.Dispatch<React.SetStateAction<string | null>>;
  sendMessage: Message | null;
  receiveMessage: MessageType | null;
};

const Conversations: React.FC<Props> = ({
  chatsLoading,
  chats,
  setCurrentChat,
  sendMessage,
  receiveMessage,
}) => {
  const currentUser = useSelector(selectUser);

  const conversationComponents = useMemo(() => {
    return (
      <>
        {chatsLoading ? (
          <ConversationsSkeletons conversationsNumber={10} />
        ) : (
          chats?.map((chat) => (
            <Conversation
              key={chat.members.find(
                (username) => username !== currentUser!.username
              )}
              chat={chat}
              changeChat={setCurrentChat}
              receiveMessage={receiveMessage}
              sendMessage={sendMessage}
            />
          ))
        )}
      </>
    );
  }, [chatsLoading, chats, setCurrentChat, receiveMessage, sendMessage, currentUser]);

  return <>{conversationComponents}</>;
};
export default Conversations;
