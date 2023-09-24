import UserImage from "../User/UserImage";
import isArabic from "../../utils/isArabic";

type Props = {
  userPicture: string;
  username: string;
  msg: string;
};

const SenderMsg: React.FC<Props> = ({ userPicture, username, msg }) => {
  const textIsInArabic = isArabic(msg);

  return (
    <div className="flex justify-end gap-2">
      <div
        className={
          textIsInArabic
            ? "py-3 px-4 bg-sky-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-right"
            : "py-3 px-4 bg-sky-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-left"
        }
      >
        {msg}
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
