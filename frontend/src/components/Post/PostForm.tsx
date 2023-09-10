import { BsCameraVideo, BsImage } from "react-icons/bs";
import Card from "../../ui/Card";
import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  src: string | undefined;
};

const PostForm: React.FC<Props> = ({ src }) => {
  const [media, setMedia] = useState<object>();

  const uploadMediaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    console.log(file)
    setMedia(file);
  }

  const removeMediaHandler = () => {
    setMedia({});
  }

  return (
    <Card>
      <div className="mb-8 mx-10 py-6 flex flex-col items-center lg:items-start lg:flex-row gap-4">
        <img className="w-14 h-14 rounded-full shadow-lg" src={src} alt="" />
        <div className="w-full flex flex-col items-center md:items-start">
          <textarea
            className="w-full h-24 mb-3 px-4 py-3 border rounded-xl outline-none resize-none"
            placeholder="Share something.."
          />
          <div className="flex flex-row gap-3">
            <div className="relative flex flex-row items-center gap-1 border rounded-xl px-5 py-2 cursor-pointer transition duration-500 hover:text-white hover:bg-sky-500">
              <BsImage />
              <span className="text-sm font-semibold tracking-wide">Photo</span>
              <input className="absolute top-0 right-0 w-full h-full opacity-0" type="file" value="" onChange={uploadMediaHandler} />
            </div>
            <div className="relative flex flex-row items-center gap-1 border rounded-xl px-5 py-2 cursor-pointer transition duration-500 hover:text-white hover:bg-sky-500">
              <BsCameraVideo />
              <span className="text-sm font-semibold tracking-wide">Video</span>
              <input className="absolute top-0 right-0 w-full h-full opacity-0" type="file" />
            </div>
          </div>
            {
              media?.size > 0 && URL.createObjectURL(media) &&
              <div className="mt-3 relative rounded-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center grow opacity-0 transition duration-500 hover:opacity-100">
                  <MdOutlineClose className="text-3xl text-white z-50" onClick={removeMediaHandler} />
                  <div className="absolute w-full h-full bg-black bg-opacity-20"></div>
                </div>
                <img className="w-16 h-16" src={URL.createObjectURL(media)} alt="" />
              </div>
            }
        </div>
      </div>
    </Card>
  );
};

export default PostForm;
