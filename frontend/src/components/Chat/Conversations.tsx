import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { ChatType } from "../../Types/Chat.types";
import Conversation from "./Conversation";

type Props = {
  chats: ChatType[];
  setCurrentChat: React.Dispatch<React.SetStateAction<string | null>>;
};

const Conversations: React.FC<Props> = ({
  chats,
  setCurrentChat,
  receiveMessage,
}) => {
  const currentUser = useSelector(selectUser);

  return (
    <>
      {chats.map((chat) => (
        <Conversation
          key={chat.members.find(
            (username) => username !== currentUser!.username
          )}
          chat={chat}
          changeChat={setCurrentChat}
          receiveMessage={receiveMessage}
        />
      ))}
    </>
  );
};
export default Conversations;
