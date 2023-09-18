import React, { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { BsSearch } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiFillMessage } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RootState } from "../store/store";
import { selectUser } from "../store/slices/authSlice";
import { selectSideOpen, toggleSidebar } from "../store/slices/sidebarSlice";
import UserImage from "./User/UserImage";
import Button from "../ui/Button";

type Props = {
  navIsSticky: boolean;
};

const Navbar: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { navIsSticky },
  ref
) => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const user = useSelector(selectUser);
  const sideOpen = useSelector(selectSideOpen);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const notifications = [
    {
      firstName: "Omar",
      lastName: "Adel",
      userPicture:
        "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024",
      isLiked: false,
      isCommented: false,
      isFollowed: true,
    },
    {
      firstName: "سا",
      lastName: "را",
      userPicture:
        "https://i.pinimg.com/564x/69/e5/91/69e5910fa609615eff2704c928e24354.jpg",
      isLiked: false,
      isCommented: true,
      isFollowed: false,
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      userPicture:
        "http://localhost:5000/profile_pics/1694862840973-273453682-c758a5b04e0e7080dc19187e8c62a9c3.jpg",
      isLiked: true,
      isCommented: false,
      isFollowed: false,
    },
    {
      firstName: "Emily",
      lastName: "Brown",
      userPicture:
        "http://localhost:5000/profile_pics/1694862840973-273453682-c758a5b04e0e7080dc19187e8c62a9c3.jpg",
      isLiked: false,
      isCommented: false,
      isFollowed: true,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      ref={ref}
      className={
        navIsSticky
          ? "sticky-nav bg-white dark:bg-primaryDark z-50"
          : "bg-white dark:bg-primaryDark z-50"
      }
    >
      {!user ? (
        <div className="flex justify-center items-center py-5">
          <Link className="font-bold text-4xl text-sky-500" to="/">
            Socio
          </Link>
        </div>
      ) : (
        <div className="mx-auto px-4 sm:px-10 md:px-10 py-5 flex items-center">
          <div className="md:w-48 flex-shrink-0 mr-auto">
            <Link className="font-bold text-4xl text-sky-500" to="/">
              Socio
            </Link>
          </div>
          <div className="w-full mr-auto max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden lg:flex items-center">
            <form className="flex items-center w-full">
              <label className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BsSearch className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="bg-gray-200 border outline-none appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500 focus:bg-gray-50"
                  placeholder="Search..."
                  required
                />
              </div>
            </form>
          </div>
          <nav className="contents">
            <ul className="ml-4 xl:w-48 flex items-center gap-2 justify-end">
              <li className="ml-2 lg:ml-4 relative inline-block">
                <a className="" href="">
                  <FaMoon className="text-2xl text-gray-700 dark:text-gray-200" />
                </a>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <Link to="/chats">
                  <div className="absolute -top-3 -right-2 bg-sky-500 text-xs font-bold px-1 py-0.5 rounded-lg text-white">
                    3
                  </div>
                  <AiFillMessage className="text-2xl text-gray-700 dark:text-gray-200" />
                </Link>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <div className="absolute -top-2 -right-1 bg-sky-500 text-xs font-bold px-1 py-0.5 rounded-lg text-white">
                  1
                </div>
                <div onClick={() => setIsOpen((prev) => !prev)}>
                  <IoIosNotifications className="text-3xl text-gray-700 cursor-pointer dark:text-gray-200" />
                </div>
                {isOpen && (
                  <div className="relative">
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                      <div className="py-2">
                        {notifications.map((notification, index) => (
                          <a
                            key={index}
                            href="#"
                            className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                          >
                            <img
                              className="h-8 w-8 rounded-full object-cover mx-1"
                              src={notification.userPicture}
                              alt="avatar"
                            />
                            <p className="text-gray-600 text-sm mx-2">
                              <span className="font-bold">
                                {notification.firstName} {notification.lastName}
                              </span>{" "}
                              {notification.isLiked && "liked your post."}{" "}
                              {notification.isCommented &&
                                "commented on your post."}{" "}
                              {notification.isFollowed &&
                                "started following you."}{" "}
                              1h
                            </p>
                          </a>
                        ))}
                      </div>
                      <Button bg={true} text="See all notifications" />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>
          <div className="ml-8 hidden sm:flex flex-col font-bold">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <UserImage
                className="w-14 !m-0"
                src={user.userPicture}
                alt={user.firstName + " " + user.lastName}
                username={user.username}
              />
            </div>
          </div>
          <button
            className="md:mr-5 lg:hidden ml-auto mr-0 flex items-center gap-2 text-gray-600"
            onClick={handleSidebar}
          >
            <span className="text-2xl">
              {sideOpen ? <MdClose /> : <FiMenu />}
            </span>
            <span className="text-lg font-semibold hidden md:inline-block">
              Menu
            </span>
          </button>
        </div>
      )}
      <hr />
    </header>
  );
};

export default forwardRef(Navbar);
