import { ChatType } from "../../Types/Chat.types";
import { MessageType } from "../../Types/Message.types";
import Messages from "./Messages";
import ChatInfo from "./ChatInfo";
import ProfileSkeleton from "../../skeletons/ProfileSkeleton";
import MessagesSkeleton from "../../skeletons/MessagesSkeleton";
import { ProfileType } from "../../Types/Profile.types";

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

type Props = {
  currentChat: string | null;
  currentChatUserData: ProfileType;
  currentChatUserDataLoading: boolean;
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
  currentChatUserData,
  currentChatUserDataLoading,
  userChats,
  setSendMessage,
  receiveMessage,
  messagesIsVisible,
  chatInfoIsVisible,
  showUserInfo,
  hideUserInfo,
}) => {
  return (
    <>
      <div
        className={
          messagesIsVisible
            ? "col-span-2 h-[calc(100vh-82px)] px-5 flex flex-col justify-end"
            : "col-span-2 h-[calc(100vh-82px)] px-5 hidden lg:flex lg:flex-col lg:justify-between"
        }
      >
        {currentChatUserDataLoading ? (
          <MessagesSkeleton messagesNumber={6} />
        ) : (
          <Messages
            chat={userChats.find((chat) => chat.chatId === currentChat)!}
            receiverData={currentChatUserData}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
            setChatInfoIsVisible={showUserInfo}
          />
        )}
      </div>
      <div
        className={
          chatInfoIsVisible
            ? "col-span-1 h-[calc(100vh-82px)] lg:block border-l-2 px-4 sm:px-10 lg:px-4 pt-5"
            : "col-span-1 h-[calc(100vh-82px)] hidden lg:block border-l-2 px-4 sm:px-10 lg:px-4 pt-5"
        }
      >
        {currentChatUserDataLoading ? (
          <ProfileSkeleton className="shadow-none" />
        ) : (
          <ChatInfo
            receiverData={currentChatUserData}
            hideUserInfo={hideUserInfo}
          />
        )}
      </div>
    </>
  );
};

export default Chat;
