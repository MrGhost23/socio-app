import UserImage from "../User/UserImage";

type Props = {
  userPicture: string;
  msg: string;
};

const SenderMsg: React.FC<Props> = ({ userPicture, msg }) => {
  return (
    <div className="flex justify-end gap-2">
      <div className="py-3 px-4 bg-sky-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
        {msg}
      </div>
      <UserImage src={userPicture} className="w-10 h-10 object-cover" />
    </div>
  );
};
export default SenderMsg;
