import UserImage from "../User/UserImage";
import isArabic from "../../utils/IsArabic";

type Props = {
  userPicture: string;
  msg: string;
};

const ReceiverMsg: React.FC<Props> = ({ userPicture, msg }) => {
  const textIsInArabic = isArabic(msg);

  return (
    <div className="flex justify-start gap-2">
      <UserImage src={userPicture} className="w-10 h-10 object-cover" />
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
