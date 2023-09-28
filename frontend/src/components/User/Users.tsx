import { UserType } from "../../Types/User.types";
import ScrollableDiv from "../../ui/ScrollableDiv";
import User from "./User";
import { Socket } from "socket.io-client";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../../skeletons/PostSkeleton";

type Props = {
  users: UserType[];
  mode: string;
  socket: Socket;
  fetchMoreUsers: () => void;
  moreUsers: boolean;
};

const Users: React.FC<Props> = ({
  users,
  mode,
  socket,
  fetchMoreUsers,
  moreUsers,
}) => {
  const classes =
    mode === "follow"
      ? "md:grid-cols-2"
      : "lg:grid-cols-2 xl:grid-cols-1  lg:max-h-[calc(70vh-80px)]";

  return (
    <ScrollableDiv id="scrollableDiv" className="h-fit max-h-[80vh]">
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreUsers}
        hasMore={moreUsers}
        loader={<PostSkeleton className="mt-8" />}
        scrollableTarget="scrollableDiv"
      >
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
        </div>{" "}
      </InfiniteScroll>
    </ScrollableDiv>
  );
};

export default Users;
