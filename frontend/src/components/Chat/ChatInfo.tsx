import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import Button from "../../ui/Button";
import noAvatar from "../../assets/noAvatar.png";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const ChatInfo = ({ chat, currentUser, userData }) => {
  const username = chat?.members?.find((username) => username !== currentUser);
  const user = useSelector(selectUser);
  return (
    chat && (
      <div className="w-2/5 border-l-2 h-[calc(100vh-82px)] px-5 pt-5">
        <div className="flex flex-col items-center">
          <img
            src={userData?.userPicture || noAvatar}
            className="object-cover rounded-full h-44 w-44"
            alt=""
          />
          <div className="font-semibold text-xl text-center pt-4">
            {userData?.firstName + " " + userData?.lastName}
          </div>
          <div className="font-semibold text-sm text-gray-500 text-center">
            @{userData?.username}
          </div>
          <div className="font-semibold py-4">Created 10 Sep 2023</div>
          <div className="">{userData?.bio}</div>
          <Link to={`/profile/${userData?.username}`}>
            <Button
              text="View Profile"
              bg={true}
              className="mt-5"
              onClick={() => console.log("YOYO")}
            />
          </Link>
        </div>
      </div>
    )
  );
};
export default ChatInfo;
