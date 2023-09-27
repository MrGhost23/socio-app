import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { selectUser } from "../store/slices/authSlice";
import { ChatType } from "../Types/Chat.types";
import Conversations from "../components/Chat/Conversations";
import Chat from "../components/Chat/Chat";
import Sidebar from "../components/Sidebar";
import { ProfileType } from "../Types/Profile.types";
import { MessageType } from "../Types/Message.types";
import useInfiniteFetch from "../hooks/useInfiniteFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";
import ConversationsSkeletons from "../skeletons/ConversationsSkeletons";

type Props = {
  sendMessage: MessageType | null;
  setSendMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
  receiveMessage: MessageType | null;
  setReceiveMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
  socket: Socket;
  onlineUsers: { [key: string]: boolean };
};

const Chats: React.FC<Props> = ({
  setSendMessage,
  sendMessage,
  receiveMessage,
  setReceiveMessage,
  socket,
  onlineUsers,
}) => {
  const { username: receiverUsername } = useParams();
  const currentUser = useSelector(selectUser);

  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [currentChatLoading, setCurrentChatLoading] = useState<boolean>(true);
  const [currentChatUserData, setCurrentChatUserData] =
    useState<ProfileType | null>();
  const [currentChatUserDataLoading, setCurrentChatUserDataLoading] =
    useState<boolean>(true);

  const {
    data: userChats,
    loading: userChatsIsLoading,
    error: userChatsHasError,
    hasMore: userChatsHasMore,
    fetchMoreData: fetchMoreUserChats,
  } = useInfiniteFetch<ChatType>(
    `http://localhost:5000/api/v1/chat/${currentUser?.username}`,
    "get",
    10
  );

  useEffect(() => {
    setCurrentChatLoading(true);

    const currentChatId =
      userChats?.find((chat) =>
        chat.members.find((user) => user === receiverUsername)
      )?.chatId || null;

    setCurrentChat(currentChatId);

    setCurrentChatLoading(false);
  }, [receiverUsername, userChats]);

  const [conversationsIsVisible, setConversationsIsVisible] = useState(true);
  const [messagesIsVisible, setMessagesIsVisible] = useState(true);
  const [chatInfoIsVisible, setChatInfoIsVisible] = useState(true);

  const showUserInfo = () => {
    setMessagesIsVisible(false);
    setMessagesIsVisible(false);
    setChatInfoIsVisible(true);
  };

  const hideUserInfo = () => {
    setMessagesIsVisible(false);
    setMessagesIsVisible(true);
    setChatInfoIsVisible(false);
  };

  useEffect(() => {
    if (receiverUsername) {
      setConversationsIsVisible(false);
      setMessagesIsVisible(true);
      setChatInfoIsVisible(false);
    } else {
      setConversationsIsVisible(true);
    }
  }, [receiverUsername]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  if (userChatsHasError) console.log(userChatsHasError);

  return (
    <div className="h-[calc(100vh-82px)] shadow-lg rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between bg-white dark:bg-primaryDark">
        <Sidebar hide={true} />
        <div
          className={
            conversationsIsVisible
              ? "col-span-1 lg:h-[calc(100vh-82px)] flex flex-col border-r-2 dark:border-r-primarylessDark overflow-y-auto"
              : "col-span-1 lg:h-[calc(100vh-82px)] hidden lg:flex lg:flex-col border-r-2 dark:border-r-primaryDark overflow-y-auto"
          }
        >
          {userChatsIsLoading ? (
            <ConversationsSkeletons conversationsNumber={10} />
          ) : userChats && userChats?.length > 0 ? (
            <InfiniteScroll
              dataLength={userChats.length}
              next={fetchMoreUserChats}
              hasMore={userChatsHasMore}
              loader={<PostSkeleton className="mt-8" />}
            >
              <Conversations
                chats={userChats}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                setCurrentChatUserData={setCurrentChatUserData}
                setCurrentChatUserDataLoading={setCurrentChatUserDataLoading}
                receiveMessage={receiveMessage}
                setReceiveMessage={setReceiveMessage}
                sendMessage={sendMessage}
                setSendMessage={setSendMessage}
                onlineUsers={onlineUsers}
              />
            </InfiniteScroll>
          ) : (
            ""
          )}
        </div>
        {!currentChatLoading && receiverUsername ? (
          <Chat
            currentChat={currentChat}
            currentChatUserData={currentChatUserData!}
            currentChatUserDataLoading={currentChatUserDataLoading}
            userChats={userChats!}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
            messagesIsVisible={messagesIsVisible}
            chatInfoIsVisible={chatInfoIsVisible}
            showUserInfo={showUserInfo}
            hideUserInfo={hideUserInfo}
          />
        ) : (
          <div className="col-span-3 hidden lg:flex lg:justify-center lg:items-center">
            <p className="text-gray-600 font-semibold text-center dark:text-textLighter">
              {!currentChatLoading && userChats?.length
                ? "Tap on chat to start a conversation!"
                : "You have no conversations"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Chats;
