import Conversations from "../components/Chat/Conversations";
import Messages from "../components/Chat/Messages";
import ChatInfo from "../components/Chat/ChatInfo";

const Chats = () => {
  return (
    <div className="h-[calc(100vh-82px)] shadow-lg rounded-lg">
      <div className="flex flex-row justify-between bg-white">
        <Conversations />
        <Messages />
        <ChatInfo />
      </div>
    </div>
  );
};
export default Chats;
