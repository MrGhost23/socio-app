import { useParams, useNavigate } from "react-router-dom";
import { UserType } from "../Types/User.types";
import Users from "../components/User/Users";
import Card from "../ui/Card";
import SearchInput from "../ui/SearchInput";
import UsersSkeleton from "../skeletons/UsersSkeleton";
import { Socket } from "socket.io-client";
import { useEffect } from "react";
import NoDataMessage from "../components/NoDataMessage";
import useInfiniteFetch from "../hooks/useInfiniteFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";

type Props = {
  socket: Socket;
};

const Followers: React.FC<Props> = ({ socket }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    data: followers,
    loading: followersIsLoading,
    error: followersHasError,
    hasMore: followersHasMore,
    fetchMoreData: fetchMoreFollowers,
  } = useInfiniteFetch<UserType>(
    `http://localhost:5000/api/v1/users/${username}/followers`,
    "get",
    20,
    "_id"
  );

  useEffect(() => {
    if (followersHasError) {
      navigate("/error");
    }
  }, [navigate, followersHasError]);

  if (followersHasError) return;

  return (
    <>
      {followersIsLoading ? (
        <UsersSkeleton title="Followers" usersNumber={6} mode="follow" />
      ) : (
        <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
          <h3 className="mb-5 text-xl">Followers</h3>
          {followers && followers?.length > 0 ? (
            <>
              <SearchInput className="mb-5" />
              <InfiniteScroll
                dataLength={followers.length}
                next={fetchMoreFollowers}
                hasMore={followersHasMore}
                loader={<PostSkeleton className="mt-8" />}
              >
                <Users users={followers} mode="follow" socket={socket} />
              </InfiniteScroll>
            </>
          ) : (
            <NoDataMessage message={`No one is following ${username}`} />
          )}
        </Card>
      )}
    </>
  );
};

export default Followers;
