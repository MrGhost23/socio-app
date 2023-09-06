import { BsCameraVideo, BsImage } from "react-icons/bs";
import Card from "../../ui/Card";

const PostForm = () => {
  return (
    <Card>
      <div className="mb-8 py-6 flex flex-col items-center lg:items-start lg:flex-row gap-4">
        <img
          className="w-14 h-14 rounded-full shadow-lg"
          src="https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024"
          alt=""
        />
        <div className="grow flex flex-col">
          <textarea
            className="w-full h-24 mb-3 px-4 py-3 border rounded-xl outline-none resize-none"
            placeholder="Share something.."
          />
          <div className="flex flex-row gap-3">
            <div className="flex flex-row items-center gap-1 border rounded-xl px-5 py-2 cursor-pointer transition duration-500 hover:text-white hover:bg-indigo-700">
              <BsImage />
              <span className="text-sm font-semibold tracking-wide">Photo</span>
            </div>
            <div className="flex flex-row items-center gap-1 border rounded-xl px-5 py-2 cursor-pointer transition duration-500 hover:text-white hover:bg-indigo-700">
              <BsCameraVideo />
              <span className="text-sm font-semibold tracking-wide">Video</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostForm;
