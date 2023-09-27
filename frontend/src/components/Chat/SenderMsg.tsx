import UserImage from "../User/UserImage";
import isArabic from "../../utils/isArabic";
import MessageDate from "./MessageDate";

type Props = {
  userPicture: string;
  username: string;
  msg: string;
  msgDate: string;
};

const SenderMsg: React.FC<Props> = ({
  userPicture,
  username,
  msg,
  msgDate,
}) => {
  const textIsInArabic = isArabic(msg);

  return (
    <div className="flex flex-row justify-end gap-2">
      <div className="flex flex-col items-end gap-1">
        <div
          className={
            textIsInArabic
              ? "py-2 px-4 bg-sky-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-right break-all"
              : "py-2 px-4 bg-sky-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-left break-all"
          }
        >
          {msg}
        </div>
        <MessageDate date={msgDate} />
      </div>
      <UserImage
        src={userPicture}
        username={username}
        className="min-w-[2.5rem] w-10 min-h-[2.5rem] h-10 object-cover"
      />
    </div>
  );
};
export default SenderMsg;
