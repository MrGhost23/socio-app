import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { ChatType } from "../../Types/Chat.types";
import Conversation from "./Conversation";
import ConversationsSkeletons from "../../skeletons/ConversationsSkeletons";
import { ProfileType } from "../../Types/Profile.types";

interface Message {
  text: string;
  chatId: string;
  senderUsername: string;
  receiverUsername: string;
}

type Props = {
  chatsLoading: boolean;
  chats: ChatType[];
  currentChat: string | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentChatUserData: React.Dispatch<
    React.SetStateAction<ProfileType | null | undefined>
  >;
  setCurrentChatUserDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: Message | null;
  setSendMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  receiveMessage: Message | null;
  setReceiveMessage: React.Dispatch<React.SetStateAction<Message | null>>;

  onlineUsers: { [key: string]: boolean };
};

const Conversations: React.FC<Props> = ({
  chatsLoading,
  chats,
  currentChat,
  setCurrentChat,
  setCurrentChatUserData,
  setCurrentChatUserDataLoading,
  sendMessage,
  setSendMessage,
  receiveMessage,
  setReceiveMessage,
  onlineUsers,
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
              currentChat={currentChat}
              changeChat={setCurrentChat}
              setCurrentChatUserData={setCurrentChatUserData}
              setCurrentChatUserDataLoading={setCurrentChatUserDataLoading}
              receiveMessage={receiveMessage}
              setReceiveMessage={setReceiveMessage}
              sendMessage={sendMessage}
              setSendMessage={setSendMessage}
              onlineUsers={onlineUsers}
            />
          ))
        )}
      </>
    );
  }, [
    chatsLoading,
    chats,
    currentChat,
    setCurrentChat,
    setCurrentChatUserData,
    setCurrentChatUserDataLoading,
    receiveMessage,
    setReceiveMessage,
    sendMessage,
    setSendMessage,
    onlineUsers,
    currentUser,
  ]);

  return <>{conversationComponents}</>;
};
export default Conversations;
