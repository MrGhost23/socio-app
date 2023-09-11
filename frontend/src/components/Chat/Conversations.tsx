import { BsSearch } from "react-icons/bs";
import Conversation from "./Conversation";

const Conversations = () => {
  return (
    <div className="flex flex-col w-2/5 border-r-2 h-[calc(100vh-82px)] overflow-y-auto">
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

      <Conversation />
    </div>
  );
};
export default Conversations;
