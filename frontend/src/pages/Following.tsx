import { useParams } from "react-router-dom";
import { UserType } from "../Types/User.types";
import useAxios from "../hooks/useAxios";
import Users from "../components/User/Users";
import Card from "../ui/Card";
import SearchInput from "../ui/SearchInput";
import UsersSkeleton from "../skeletons/UsersSkeleton";

const Following = () => {
  const { username } = useParams();

  const { data: following, loading: followingIsLoading } = useAxios<UserType[]>(
    `http://localhost:5000/api/v1/users/${username}/following`,
    "get"
  );

  return (
    <>
      {followingIsLoading ? (
        <UsersSkeleton title="Following" usersNumber={6} mode="follow" />
      ) : (
        <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
          <h3 className="mb-5 text-xl">Following</h3>
          {following!.length ? (
            <>
              <SearchInput className="mb-5" />
              <Users users={following!} mode="follow" />
            </>
          ) : (
            <p>{username} is not following anyone</p>
          )}
        </Card>
      )}
    </>
  );
};

export default Following;
