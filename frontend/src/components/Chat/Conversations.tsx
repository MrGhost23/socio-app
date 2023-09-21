import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { selectUser } from "../../store/slices/authSlice";
import { ChatType } from "../../Types/Chat.types";
import Conversation from "./Conversation";

type Props = {
  chats: ChatType[];
  setCurrentChat: React.Dispatch<React.SetStateAction<string | null>>;
};

const Conversations: React.FC<Props> = ({ chats, setCurrentChat }) => {
  const currentUser = useSelector(selectUser);

  return (
    <div className="col-span-1 flex flex-col border-r-2 h-[calc(100vh-82px)] overflow-y-auto">
      <div className="border-b-2 py-4 px-2">
        <div className="w-full mr-auto max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden lg:flex items-center">
          <form className="flex items-center w-full">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-gray-200 border outline-none appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500 focus:bg-gray-50"
                placeholder="Search User..."
                required
              />
            </div>
          </form>
        </div>
      </div>
      {chats.map((chat) => (
        <Conversation
          key={chat.members.find(
            (username) => username !== currentUser!.username
          )}
          chat={chat}
          changeChat={setCurrentChat}
        />
      ))}
    </div>
  );
};
export default Conversations;
