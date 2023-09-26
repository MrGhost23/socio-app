import UserImage from "../User/UserImage";
import isArabic from "../../utils/isArabic";
import MessageDate from "./MessageDate";

type Props = {
  userPicture: string;
  username: string;
  msg: string;
  msgDate: string;
  setChatInfoIsVisible: () => void;
};

const ReceiverMsg: React.FC<Props> = ({
  userPicture,
  username,
  msg,
  msgDate,
  setChatInfoIsVisible,
}) => {
  const textIsInArabic = isArabic(msg);

  return (
    <div className="ml-5 flex justify-start gap-2" onClick={setChatInfoIsVisible}>
      <UserImage
        src={userPicture}
        username={username}
        className="min-w-[2.5rem] w-10 min-h-[2.5rem] h-10 object-cover"
      />
      <div className="flex flex-col items-start gap-1">
        <div
          className={
            textIsInArabic
              ? "py-2 px-4 bg-[#2798cc] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white text-right"
              : "py-2 px-4 bg-[#2798cc] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white text-left"
          }
        >
          {msg}
        </div>
        <MessageDate date={msgDate} />
      </div>
    </div>
  );
};
export default ReceiverMsg;
