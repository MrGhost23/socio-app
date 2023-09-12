import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPen, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";
import Button from "../../ui/Button";

const PostMenu = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <BsThreeDots className="text-xl cursor-pointer" onClick={() => setMenuOpened((prevState) => !prevState)} />
        {menuOpened && (
          <ul className="absolute top-6 right-0 px-4 py-5 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-4">
            <li className="flex flex-row items-center gap-2">
              <FaRegBookmark />
              <Button text="Bookmark" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <FaPen />
              <Button text="Edit Post" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <FaRegTrashAlt />
              <Button text="Delete Post" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <ImBlocked />
              <Button text="Block User" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <PiWarningBold className="text-lg"  />
              <Button text="Report User" bg={false} />
            </li>
          </ul>
        )}
    </>
  );
};

export default PostMenu;