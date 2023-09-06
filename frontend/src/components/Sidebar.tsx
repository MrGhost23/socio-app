import { Link } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { MdOutlineRssFeed } from "react-icons/md";
import { HiOutlineBookmark } from "react-icons/hi";
import { BiCog } from "react-icons/bi";
import UserImage from "./User/UserImage";
import { useEffect, useRef } from "react";
import VerticalLine from "../ui/VerticalLine";
import UserFullName from "./User/UserFullName";
import UserTag from "./User/UserTag";

const Sidebar = () => {
  const currentUserFullName = "Omar Mohamed";
  const currentUserTag = "MrGhost";
  const currentUserImage =
    "https://i.pinimg.com/564x/c7/58/a5/c758a5b04e0e7080dc19187e8c62a9c3.jpg";

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
      } else if (sideRef.current) {
          sideRef.current.classList.remove("sticky-sidebar");
        }
    });
  };

  useEffect(() => {
    stickySidebar();

    return () => window.removeEventListener("scroll", stickySidebar);
  }, []);

  const list = [
    { id: 1, text: 'feed', path: '/', icon: <MdOutlineRssFeed /> },
    { id: 2, text: 'chats', path: '/messages', icon: <AiOutlineMessage /> },
    { id: 3, text: 'find friends', path: '/find-friends', icon: <BsPeople /> },
    { id: 4, text: 'bookmarks', path: '/bookmarks', icon: <HiOutlineBookmark /> },
    { id: 5, text: 'settings', path: '/settings', icon: <BiCog /> }
  ];

  return (
    <div
      className="h-[calc(100vh-82px)] sticky left-0 shadow-lg"
      ref={sideRef}
    >
      <div className="px-20 pt-10">
        <Link
          className="mb-5 flex items-center gap-3 roup"
          to="/profile"
        >
          <UserImage
            className="w-14 !m-0"
            src={currentUserImage}
            alt={currentUserFullName}
          />
          <div className="flex flex-col">
            <UserFullName className='!text-lg font-medium group-hover:text-gray-700' fullName={currentUserFullName} />
            <UserTag tag={currentUserTag} />
          </div>
        </Link>
        <VerticalLine className="my-3" />
        <ul className="m-0 list-none">
          {
            list.map(link =>
              <li
                key={link.id}
                className="mb-4 p-2 text-2xl text-gray-700 cursor-pointer transition duration-500 hover:bg-gray-200"
              >
                <Link to={link.path} className="flex items-center gap-2">
                  {link.icon}
                  <span className="text-lg capitalize">{link.text}</span>
                </Link>
              </li>
            )
          } 
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
