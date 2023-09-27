import { Socket } from "socket.io-client";
import { UserType } from "../../Types/User.types";
import User from "./User";

type Props = {
  users: UserType[];
  socket: Socket;
};

const SuggestedUsers: React.FC<Props> = ({ users, socket }) => {
  return (
    <div className="lg:max-h-[calc(70vh-80px)] pb-1 xl:pb-0 flex flex-row xl:flex-col gap-5 md:gap-8 xl:gap-3 overflow-x-auto scrollbar scrollbar-w-2 scrollbar-h-2 scrollbar-thumb-sky-500 hover:scrollbar-thumb-sky-600 scrollbar-track-gray-200 dark:scrollbar-track-primarylessDarker">
      {users.map((user) => (
        <User
          key={user.username}
          user={user}
          changeStyle={true}
          mode="follow"
          center={true}
          socket={socket}
        />
      ))}
    </div>
  );
};

export default SuggestedUsers;
