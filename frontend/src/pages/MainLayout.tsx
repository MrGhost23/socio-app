import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/User/SuggestedUsers";
import Card from "../ui/Card";
import { selectSideOpen } from "../store/slices/sidebarSlice";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { UserType } from "../Types/User.types";
import Loading from "../ui/Loading";
import { selectUser } from "../store/slices/authSlice";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navIsSticky, setNavIsSticky] = useState(false);

  const stickyNav = () => {
    const navbarHeight = navbarRef.current!.offsetHeight;
    console.log(navbarHeight);
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        setNavIsSticky(true);
      } else {
        setNavIsSticky(false);
      }
    });
  };

  useEffect(() => {
    stickyNav();

    return () => window.removeEventListener("scroll", stickyNav);
  }, []);


  const currentUser = useSelector(selectUser);

  const [suggestedUsers, setSuggestedUsers] = useState<UserType[]>();
  const [suggestedUsersLoading, setSuggestedUsersLoading] =
    useState<boolean>(true);
  const [suggestedUsersError, setSuggestedUsersError] =
    useState<boolean>(false);

  useEffect(() => {
    if (!currentUser!.username) return;

    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${
            currentUser!.username
          }/suggested-users`
        );
        setSuggestedUsers(response.data);
      } catch (error) {
        setSuggestedUsersError(!!error);
      }
      setSuggestedUsersLoading(false);
    };
    fetchSuggestedUsers();
  }, [currentUser]);

  const sideOpen = useSelector(selectSideOpen);

  return (
    <>
      <Navbar ref={navbarRef} navIsSticky={navIsSticky} />
      <div
        className={`w-full ${
          sideOpen ? "fixed" : ""
        } px-4 sm:px-10 md:px-10 lg:pl-0 flex flex-col lg:grid lg:grid-cols-4 gap-8 lg:gap-16`}
      >
        <Sidebar navIsSticky={navIsSticky} />
        <div className="col-span-3 flex flex-col xl:grid xl:grid-cols-3 gap-8 xl:gap-16">
          <div className="col-span-2 pb-10 xl:pt-10 order-2 xl:order-1">
            <Outlet />
          </div>
          <Card className="xl:sticky xl:top-32 mt-10 xl:mt-0 xl:mb-10 px-8 py-4 pb-6 flex flex-col !text-left order-1 xl:order-2">
            <h3 className="mb-5 text-xl">Suggested for you</h3>
            {suggestedUsersLoading ? (
              <Loading />
            ) : suggestedUsersError ? (
              "An error occurred"
            ) : suggestedUsers?.length ? (
              <SuggestedUsers users={suggestedUsers} />
            ) : (
              "Found no users to suggest"
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
