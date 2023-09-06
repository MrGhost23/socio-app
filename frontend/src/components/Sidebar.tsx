import { AiOutlineMessage } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineRssFeed } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import UserImage from "./User/UserImage";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Sidebar = () => {
  const sideRef = useRef<HTMLDivElement | null>(null);

  const stickySidebar = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        if (sideRef.current) {
          sideRef.current.classList.add("sticky-sidebar");
        }
      } else {
        if (sideRef.current) {
          sideRef.current.classList.remove("sticky-sidebar");
        }
      }
    });
  };

  useEffect(() => {
    stickySidebar();

    return () => window.removeEventListener("scroll", stickySidebar);
  }, []);
  return (
    <div
      className="h-[calc(100vh-82px)] sticky left-0 top-82px shadow-lg"
      ref={sideRef}
    >
      <div className="px-4 pt-5">
        <ul className="p-0 m-0 list-none">
          <Link
            className="flex items-center cursor-pointer group"
            to="/profile"
          >
            <UserImage
              className="w-12 mr-2"
              src="https://i.pinimg.com/564x/c7/58/a5/c758a5b04e0e7080dc19187e8c62a9c3.jpg"
              alt="Profile Picture"
            />
            <div className="flex flex-col">
              <span className="font-medium group-hover:text-gray-700">
                Omar Mohamed
              </span>
              <span className="text-sm text-gray-400">@MrGhost</span>
            </div>
          </Link>
          <li className="flex items-center mb-4 hover:bg-gray-200 cursor-pointer p-2">
            <MdOutlineRssFeed className="mr-2 text-xl text-gray-700" />
            <span>Feed</span>
          </li>
          <li className="flex items-center mb-4  hover:bg-gray-200 cursor-pointer p-2">
            <AiOutlineMessage className="mr-2 text-lg text-gray-700" />
            <span>Chats</span>
          </li>
          <li className="flex items-center mb-4 hover:bg-gray-200 cursor-pointer p-2">
            <LiaUserFriendsSolid className="mr-2 text-xl text-gray-700" />
            <span>Find Friends</span>
          </li>
          <li className="flex items-center mb-4  hover:bg-gray-200 cursor-pointer p-2">
            <BsBookmark className="mr-2 text-lg text-gray-700" />
            <span>Bookmarks</span>
          </li>
        </ul>
        <button className="w-32 border-none px-2 py-1 rounded-md font-semibold">
          Show More
        </button>
        <hr className="my-4" />
      </div>
    </div>
  );
};
export default Sidebar;
