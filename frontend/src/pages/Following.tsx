import { useParams, useNavigate } from "react-router-dom";
import { UserType } from "../Types/User.types";
import Users from "../components/User/Users";
import Card from "../ui/Card";
import UsersSkeleton from "../skeletons/UsersSkeleton";
import { Socket } from "socket.io-client";
import { useEffect } from "react";
import NoDataMessage from "../components/NoDataMessage";
import useInfiniteFetch from "../hooks/useInfiniteFetch";

type Props = {
  socket: Socket;
};

const Following: React.FC<Props> = ({ socket }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    data: following,
    loading: followingIsLoading,
    error: followingHasError,
    hasMore: followingHasMore,
    fetchMoreData: fetchMoreFollowing,
  } = useInfiniteFetch<UserType>(
    `https://socio-irdl.onrender.com/api/v1/users/${username}/following`,
    "get",
    20,
    "_id"
  );

  useEffect(() => {
    if (followingHasError) {
      navigate("/error");
    }
  }, [navigate, followingHasError]);

  if (followingHasError) return;

  return (
    <>
      {followingIsLoading ? (
        <UsersSkeleton title="Following" usersNumber={6} mode="follow" />
      ) : (
        <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
          <h3 className="mb-5 text-xl">Following</h3>
          {following && following?.length > 0 ? (
            <Users
              users={following}
              mode="follow"
              socket={socket}
              fetchMoreUsers={fetchMoreFollowing}
              moreUsers={followingHasMore}
            />
          ) : (
            <NoDataMessage message={`${username} is not following anyone`} />
          )}
        </Card>
      )}
    </>
  );
};

export default Following;
