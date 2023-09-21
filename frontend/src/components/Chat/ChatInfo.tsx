import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../store/slices/authSlice";
import { ProfileType } from "../../Types/Profile.types";
import { ChatType } from "../../Types/Chat.types";
import useAxios from "../../hooks/useAxios";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import UserTag from "../User/UserTag";
import UserBio from "../User/UserBio";
import Button from "../../ui/Button";

type Props = {
  chat: ChatType;
};

const ChatInfo: React.FC<Props> = ({ chat }) => {
  const navigate = useNavigate();

  const currentUser = useSelector(selectUser);

  const username = chat.members.find(
    (username: string) => username !== currentUser!.username
  );

  const {
    data: userData,
    loading: userDataIsLoading,
    error: userDataHasError,
  } = useAxios<ProfileType[]>(
    `http://localhost:5000/api/v1/users/${username}`,
    "get"
  );

  if (userDataIsLoading) return "loading";
  if (userDataHasError) console.log(userDataHasError);

  return (
    chat && (
      <div className="col-span-1 border-l-2 h-[calc(100vh-82px)] px-5 pt-5">
        <div className="flex flex-col items-center">
          <UserImage
            className="h-44 w-44"
            src={userData![0]?.userPicture}
            alt={`${userData![0]?.username}'s pfp`}
            username={userData![0]?.username}
          />
          <UserFullName
            className="font-semibold text-xl"
            fullName={userData![0]?.firstName + " " + userData![0]?.lastName}
            username={userData![0]?.username}
          />
          <UserTag username={userData![0]!.username} />
          <UserBio bio={userData![0]?.bio ?? ""} />
          <Link to={`/profile/${userData![0]?.username}`}>
            <Button
              text="View Profile"
              bg={true}
              className="mt-5"
              onClick={() => navigate(`/profile/${userData![0]?.username}`)}
            />
          </Link>
        </div>
      </div>
    )
  );
};
export default ChatInfo;
