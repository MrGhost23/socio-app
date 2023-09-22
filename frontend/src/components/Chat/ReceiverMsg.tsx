import UserImage from "../User/UserImage";
import isArabic from "../../utils/IsArabic";

type Props = {
  userPicture: string;
  username: string;
  msg: string;
  setChatInfoIsVisible: () => void;
};

const ReceiverMsg: React.FC<Props> = ({
  userPicture,
  username,
  msg,
  setChatInfoIsVisible,
}) => {
  const textIsInArabic = isArabic(msg);

  return (
    <div className="flex justify-start gap-2" onClick={setChatInfoIsVisible}>
      <UserImage
        src={userPicture}
        username={username}
        className="min-w-[2.5rem] w-10 min-h-[2.5rem] h-10 object-cover"
      />
      <div
        className={
          textIsInArabic
            ? "py-3 px-4 bg-[#2798cc] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white text-right"
            : "py-3 px-4 bg-[#2798cc] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white text-left"
        }
      >
        {msg}
      </div>
    </div>
  );
};
export default ReceiverMsg;
