import { Socket } from "socket.io-client";
import { UserType } from "../../Types/User.types";
import User from "./User";

type Props = {
  users: UserType[];
  socket: Socket;
};

const SuggestedUsers: React.FC<Props> = ({ users, socket }) => {
  return (
    <div className="pb-1 xl:pb-0 flex flex-row xl:flex-col gap-5 md:gap-8 xl:gap-3 overflow-x-auto lg:max-h-[calc(70vh-80px)]">
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
