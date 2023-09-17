import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import Button from "../../ui/Button";
import noAvatar from "../../assets/noAvatar.png";

const ChatInfo = ({ chat, currentUser }) => {
  const username = chat?.members?.find((username) => username !== currentUser);
  const user = useSelector(selectUser);
  return (
    chat && (
      <div className="w-2/5 border-l-2 h-[calc(100vh-82px)] px-5 pt-5">
        <div className="flex flex-col items-center">
          <img
            src={user?.userPicture || noAvatar}
            className="object-cover rounded-full h-44 w-44"
            alt=""
          />
          <div className="font-semibold text-xl text-center pt-4">
            {user?.firstName + " " + user?.lastName}
          </div>
          <div className="font-semibold text-sm text-gray-500 text-center">
            @{user?.username}
          </div>
          <div className="font-semibold py-4">Created 22 Sep 2021</div>
          <div className="">User Bio Goes Here!</div>
          <Button
            text="View Profile"
            bg={true}
            className="mt-5"
            onClick={() => console.log("YOYO")}
          />
        </div>
      </div>
    )
  );
};
export default ChatInfo;
