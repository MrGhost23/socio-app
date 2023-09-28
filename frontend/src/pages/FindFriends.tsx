import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { UserType } from "../Types/User.types";
import Card from "../ui/Card";
import User from "../components/User/User";
import UsersSkeleton from "../skeletons/UsersSkeleton";
import { Socket } from "socket.io-client";
import NoDataMessage from "../components/NoDataMessage";
import useInfiniteFetch from "../hooks/useInfiniteFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";

type Props = {
  socket: Socket;
};

const FindFriends: React.FC<Props> = ({ socket }) => {
  const currentUser = useSelector(selectUser);

  const {
    data: suggestedUsers,
    loading: suggestedUsersIsLoading,
    hasMore: followingHasMore,
    fetchMoreData: fetchMoreFollowing,
  } = useInfiniteFetch<UserType>(
    `http://localhost:5000/api/v1/users/${currentUser!.username}/find-friends`,
    "get",
    20,
    "_id"
  );

  return (
    <>
      {suggestedUsersIsLoading ? (
        <UsersSkeleton
          title="Find Friends"
          usersNumber={6}
          mode="follow"
          className="!p-8"
        />
      ) : (
        <Card className="p-8 !text-left">
          <h3 className="mb-5 text-xl">Find Friends</h3>
          {suggestedUsers && suggestedUsers?.length > 0 ? (
            <InfiniteScroll
              dataLength={suggestedUsers.length}
              next={fetchMoreFollowing}
              hasMore={followingHasMore}
              loader={<UsersSkeleton usersNumber={2} />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {suggestedUsers.map((user) => (
                  <User
                    key={user.username}
                    user={user}
                    changeStyle={false}
                    mode="follow"
                    socket={socket}
                  />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <NoDataMessage message="Found no users to suggest" />
          )}
        </Card>
      )}
    </>
  );
};

export default FindFriends;
