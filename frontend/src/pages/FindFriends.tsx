import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { UserType } from "../Types/User.types";
import useAxios from "../hooks/useAxios";
import Card from "../ui/Card";
import User from "../components/User/User";
import UsersSkeleton from "../skeletons/UsersSkeleton";

const FindFriends = () => {
  const currentUser = useSelector(selectUser);

  const { data: suggestedUsers, loading: suggestedUsersIsLoading } = useAxios<
    UserType[]
  >(
    `http://localhost:5000/api/v1/users/${currentUser!.username}/find-friends`,
    "get"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {suggestedUsers?.length
              ? suggestedUsers.map((user) => (
                  <User
                    key={user.username}
                    user={user}
                    changeStyle={false}
                    mode="follow"
                  />
                ))
              : "Found no users to suggest"}
          </div>
        </Card>
      )}
    </>
  );
};

export default FindFriends;
