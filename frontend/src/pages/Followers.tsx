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
    `https://socio-irdl.onrender.com/api/v1/users/${username}/followers`,
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
            <Users
              users={followers}
              mode="follow"
              socket={socket}
              fetchMoreUsers={fetchMoreFollowers}
              moreUsers={followersHasMore}
            />
          ) : (
            <NoDataMessage message={`No one is following ${username}`} />
          )}
        </Card>
      )}
    </>
  );
};

export default Followers;
