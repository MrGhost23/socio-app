import { useParams } from "react-router-dom";
import { UserType } from "../Types/User.types";
import useAxios from "../hooks/useAxios";
import Users from "../components/User/Users";
import Card from "../ui/Card";
import SearchInput from "../ui/SearchInput";
import UsersSkeleton from "../skeletons/UsersSkeleton";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};

const Followers: React.FC<Props> = ({ socket }) => {
  const { username } = useParams();

  const { data: followers, loading: followersIsLoading } = useAxios<UserType[]>(
    `http://localhost:5000/api/v1/users/${username}/followers`,
    "get"
  );

  return (
    <>
      {followersIsLoading ? (
        <UsersSkeleton title="Followers" usersNumber={6} mode="follow" />
      ) : (
        <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
          <h3 className="mb-5 text-xl">Followers</h3>
          {followers!.length ? (
            <>
              <SearchInput className="mb-5" />
              <Users users={followers!} mode="follow" socket={socket} />
            </>
          ) : (
            <p>No one is following {username}</p>
          )}
        </Card>
      )}
    </>
  );
};

export default Followers;
