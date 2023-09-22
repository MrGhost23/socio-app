import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { MdOutlineRssFeed } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { BiCog, BiLogOut } from "react-icons/bi";
import UserImage from "./User/UserImage";
import VerticalLine from "../ui/VerticalLine";
import UserFullName from "./User/UserFullName";
import UserTag from "./User/UserTag";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/slices/authSlice";
import { closeSidebar, selectSideOpen } from "../store/slices/sidebarSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import Backdrop from "./Backdrop";

type Props = {
  navIsSticky: boolean;
};

const Sidebar: React.FC<Props> = ({ navIsSticky }) => {
  const currentUser = useSelector(selectUser);
  const currentUserFullName =
    currentUser!.firstName + " " + currentUser!.lastName;
  const currentUserTag = currentUser!.username;
  const currentUserImage = currentUser!.userPicture;

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const sideOpen = useSelector(selectSideOpen);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const list = [
    { id: 1, text: "feed", path: "/", icon: <MdOutlineRssFeed /> },
    { id: 2, text: "chats", path: "/chats", icon: <AiOutlineMessage /> },
    { id: 3, text: "find friends", path: "/find-friends", icon: <BsPeople /> },
    {
      id: 4,
      text: "bookmarks",
      path: "/bookmarks",
      icon: <FaRegBookmark className="scale-90" />,
    },
    { id: 5, text: "settings", path: "/settings", icon: <BiCog /> },
    { id: 6, text: "logout", path: "/login", icon: <BiLogOut /> },
  ];

  return (
    <>
      {sideOpen && <Backdrop onClick={() => dispatch(closeSidebar())} />}
      <div
        className={`sidebar fixed z-40 h-[calc(100vh)] transition-all bottom-0 duration-300 inset-y-0 bg-white transform ${
          sideOpen ? "left-0 w-fit py-7 px-5" : "left-[-100%]"
        } lg:sticky lg:shadow-lg`}
      >
        <div
          className={
            navIsSticky
              ? "lg:absolute lg:top-20 w-full px-5 xl:px-10 pt-10"
              : "lg:absolute lg:top-0  w-full px-5 xl:px-10 pt-10"
          }
        >
          <div className="mb-5 flex flex-col xl:flex-row text-center xl:text-left items-center gap-3 group">
            <UserImage
              className="min-w-[5rem] w-20 lg:w-[4.5rem] min-h[5rem] h-20 !m-0"
              src={currentUserImage}
              username={currentUserTag}
              link={true}
            />
            <div className="flex flex-col">
              <UserFullName
                className="!text-lg font-medium group-hover:text-gray-700"
                fullName={currentUserFullName}
                username={currentUserTag}
              />
              <UserTag username={currentUserTag} />
            </div>
          </div>
          <VerticalLine className="my-3" />
          <ul className="m-0 list-none">
            {list.map((link) => (
              <li
                key={link.id}
                className="mb-4 p-2 text-2xl text-gray-700 cursor-pointer hover:bg-gray-200"
                onClick={
                  link.text === "logout"
                    ? handleLogout
                    : () => dispatch(closeSidebar())
                }
              >
                <Link to={link.path} className="flex items-center gap-2">
                  {link.icon}
                  <span className="text-lg capitalize">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
