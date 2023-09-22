import { useSelector } from "react-redux";
import { ChatType } from "../../Types/Chat.types";
import { MessageType } from "../../Types/Message.types";
import { selectUser } from "../../store/slices/authSlice";
import Messages from "./Messages";
import ChatInfo from "./ChatInfo";
import { ProfileType } from "../../Types/Profile.types";
import useAxios from "../../hooks/useAxios";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  currentChat: string | null;
  userChats: ChatType[];
  setSendMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  receiveMessage: MessageType | null;
  messagesIsVisible: boolean;
  chatInfoIsVisible: boolean;
  showUserInfo: () => void;
  hideUserInfo: () => void;
};

const Chat: React.FC<Props> = ({
  currentChat,
  userChats,
  setSendMessage,
  receiveMessage,
  messagesIsVisible,
  chatInfoIsVisible,
  showUserInfo,
  hideUserInfo,
}) => {
  const currentUser = useSelector(selectUser);
  const receiverUsername = userChats
    .find((chat) => chat.chatId === currentChat)!
    .members.find((username) => username !== currentUser!.username)!;

  const {
    data: receiverData,
    loading: receiverDataIsLoading,
    error: receiverDataHasError,
  } = useAxios<ProfileType[]>(
    `http://localhost:5000/api/v1/users/${receiverUsername}`,
    "get"
  );

  if (receiverDataIsLoading) return "loading";
  if (receiverDataHasError) console.log(receiverDataHasError);

  return (
    <>
      <div
        className={
          messagesIsVisible
            ? "col-span-2 h-[calc(100vh-82px)] px-5 flex flex-col justify-between"
            : "col-span-2 h-[calc(100vh-82px)] px-5 hidden lg:flex lg:flex-col lg:justify-between"
        }
      >
        <Messages
          chat={userChats.find((chat) => chat.chatId === currentChat)!}
          receiverData={receiverData![0]}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
          setChatInfoIsVisible={showUserInfo}
        />
      </div>
      <div
        className={
          chatInfoIsVisible
            ? "col-span-1 h-[calc(100vh-82px)] lg:block border-l-2 px-4 sm:px-10 lg:px-4 pt-5"
            : "col-span-1 h-[calc(100vh-82px)] hidden lg:block border-l-2 px-4 sm:px-10 lg:px-4 pt-5"
        }
      >
        <ChatInfo receiverData={receiverData![0]} hideUserInfo={hideUserInfo} />
      </div>
    </>
  );
};

export default Chat;
