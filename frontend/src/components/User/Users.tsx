import { UserType } from "../../Types/User.types";
import ScrollableDiv from "../../ui/ScrollableDiv";
import User from "./User";
import { Socket } from "socket.io-client";

type Props = {
  users: UserType[];
  mode: string;
  socket: Socket;
};

const Users: React.FC<Props> = ({ users, mode, socket }) => {
  const classes =
    mode === "follow"
      ? "md:grid-cols-2"
      : "lg:grid-cols-2 xl:grid-cols-1  lg:max-h-[calc(70vh-80px)]";

  return (
    <ScrollableDiv className="h-fit max-h-[80vh]">
      <div className={`grid grid-cols-1 ${classes} gap-3`}>
        {users.map((user) => (
          <User
            key={user.username}
            user={user}
            changeStyle={false}
            mode={mode}
            socket={socket}
          />
        ))}
      </div>
    </ScrollableDiv>
  );
};

export default Users;
