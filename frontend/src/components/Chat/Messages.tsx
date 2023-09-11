import RecieverMsg from "./RecieverMsg";
import SenderMsg from "./SenderMsg";
import TypeMsg from "./TypeMsg";

const Messages = () => {
  return (
    <div className="w-full px-5 flex flex-col h-[calc(100vh-82px)] justify-between">
      <div className="flex flex-col mt-5">
        <SenderMsg
          userPicture="https://i.pinimg.com/564x/c7/58/a5/c758a5b04e0e7080dc19187e8c62a9c3.jpg"
          msg="بدخله"
        />
        <RecieverMsg
          userPicture="https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024"
          msg="ايوة كمان"
        />
      </div>
      <TypeMsg />
    </div>
  );
};
export default Messages;
