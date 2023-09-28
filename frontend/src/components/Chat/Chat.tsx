import { ChatType } from "../../Types/Chat.types";
import { MessageType } from "../../Types/Message.types";
import Messages from "./Messages";
import ChatInfo from "./ChatInfo";
import ProfileSkeleton from "../../skeletons/ProfileSkeleton";
import MessagesSkeleton from "../../skeletons/MessagesSkeleton";
import { ProfileType } from "../../Types/Profile.types";
import { useState, useEffect } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import MessagesNotAllowed from "./MessagesNotAllowed";
import useInfiniteFetch from "../../hooks/useInfiniteFetch";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  currentChat: string | null;
  currentChatUserData: ProfileType;
  currentChatUserDataLoading: boolean;
  userChats: ChatType[];
  setSendMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
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
  const chat = userChats?.find((chat) => chat?.chatId === currentChat);

  const currentUser = useSelector(selectUser);
  const receiverUsername = chat?.members?.find(
    (username: string) => username !== currentUser!.username
  );

  const {
    data: chatMessages,
    loading: chatMessagesIsLoading,
    fetchMoreData: fetchMorePosts,
    hasMore: feedPostsHasMore,
  } = useInfiniteFetch<MessageType>(
    `http://localhost:5000/api/v1/message/${chat?.chatId}`,
    "get",
    10,
    true
  );

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat!.chatId) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    }
  }, [chat, receiveMessage]);

  const submitHandler = async () => {
    if (newMessage.trim().length === 0) return;

    const message = {
      senderUsername: currentUser!.username,
      text: newMessage,
      chatId: chat!.chatId,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/message",
        message
      );

      setSendMessage({ ...data, receiverUsername: receiverUsername! });
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={
          messagesIsVisible
            ? "col-span-2 h-[calc(100vh-82px)] flex flex-col justify-end"
            : "col-span-2 h-[calc(100vh-82px)] hidden lg:flex lg:flex-col lg:justify-between"
        }
      >
        {currentChat &&
        (currentChatUserDataLoading || chatMessagesIsLoading) ? (
          <MessagesSkeleton messagesNumber={6} />
        ) : currentChat && chatMessages && chatMessages?.length > 0 ? (
          <InfiniteScroll
            dataLength={chatMessages.length}
            next={fetchMorePosts}
            hasMore={feedPostsHasMore}
            loader={<MessagesSkeleton messagesNumber={1} />}
          >
            <Messages
              chatMessages={messages}
              receiverData={currentChatUserData}
              setChatInfoIsVisible={showUserInfo}
            />
          </InfiniteScroll>
        ) : (
          ""
        )}
        {currentChatUserDataLoading || chat?.allowMessage ? (
          <MessageForm
            submitHandler={submitHandler}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            disabled={
              currentChatUserDataLoading ||
              chatMessagesIsLoading ||
              !chat?.allowMessage
            }
          />
        ) : (
          currentChat && <MessagesNotAllowed />
        )}
      </div>
      <div
        className={
          chatInfoIsVisible
            ? "col-span-1 h-[calc(100vh-82px)] lg:block border-l-2 dark:border-l-primarylessDark dark:text-textLighter px-4 sm:px-10 lg:px-4 pt-5"
            : "col-span-1 h-[calc(100vh-82px)] hidden lg:block border-l-2 dark:border-l-primarylessDark dark:text-textLighter px-4 sm:px-10 lg:px-4 pt-5"
        }
      >
        {currentChat && currentChatUserDataLoading ? (
          <ProfileSkeleton className="shadow-none" />
        ) : currentChat ? (
          <ChatInfo
            receiverUsername={receiverUsername!}
            receiverData={currentChatUserData}
            hideUserInfo={hideUserInfo}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Chat;
