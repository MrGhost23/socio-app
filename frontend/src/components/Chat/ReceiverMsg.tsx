import UserImage from "../User/UserImage";

type Props = {
  userPicture: string;
  msg: string;
};

const ReceiverMsg: React.FC<Props> = ({ userPicture, msg }) => {
  return (
    <div className="flex justify-start mb-4">
      <UserImage src={userPicture} className="w-10 h-10 object-cover" />
      <div className="ml-2 py-3 px-4 bg-[#2798cc] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        {msg}
      </div>
    </div>
  );
};
export default ReceiverMsg;
