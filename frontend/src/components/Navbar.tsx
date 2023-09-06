import React, { useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiFillMessage } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const isLoggedIn = false;
  const navRef = useRef<HTMLDivElement | null>(null);

  const stickyNav = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        if (navRef.current) {
          navRef.current.classList.add("sticky-nav");
        }
      } else if (navRef.current) {
          navRef.current.classList.remove("sticky-nav");
        }
    });
  };

  useEffect(() => {
    stickyNav();

    return () => window.removeEventListener("scroll", stickyNav);
  }, []);

  return (
    <header className="bg-white dark:bg-primaryDark" ref={navRef}>
      {!isLoggedIn ? (
        <div className="flex justify-center items-center py-5">
          <Link className="font-bold text-4xl text-sky-500" to="/">
            Socio
          </Link>
        </div>
      ) : (
        <div className="mx-auto px-12 py-5 flex items-center">
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
                <a className="" href="">
                  <div className="absolute -top-3 -right-2 z-10 bg-sky-500 text-xs font-bold px-1 py-0.5 rounded-lg text-white">
                    3
                  </div>
                  <AiFillMessage className="text-2xl text-gray-700 dark:text-gray-200" />
                </a>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <div className="absolute -top-2 -right-1 z-10 bg-sky-500 text-xs font-bold px-1 py-0.5 rounded-lg text-white">
                  1
                </div>
                <IoIosNotifications className="text-3xl text-gray-700 dark:text-gray-200" />
              </li>
            </ul>
          </nav>

          <div className="ml-8 hidden sm:flex flex-col font-bold">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <button className="md:mr-5 md:hidden ml-auto mr-0 flex items-center gap-2">
            <span className="text-2xl">
              <FiMenu />
            </span>
            <span className="font-semibold hidden md:inline-block">Menu</span>
          </button>
        </div>
      )}

      <hr />
    </header>
  );
};

export default Navbar;
