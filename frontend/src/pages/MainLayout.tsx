import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/User/SuggestedUsers";
import Card from "../ui/Card";
import { selectSideOpen } from "../store/slices/sidebarSlice";
import { useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {UserType} from '../Types/User.types';
import Loading from '../ui/Loading';
import { selectUser } from "../store/slices/authSlice";

const MainLayout = () => {
  const currentUser = useSelector(selectUser);

  const[suggestedUsers, setSuggestedUsers] = useState<UserType[]>();
  const[suggestedUsersLoading, setSuggestedUsersLoading] = useState<boolean>(true);
  const[suggestedUsersError, setSuggestedUsersError] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser!.username) return;

    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${currentUser!.username}/suggested-users`
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
    <div
      className={`w-full min-h-screen ${
        sideOpen ? "fixed" : ""
      } px-4 sm:px-10 md:px-20 lg:pl-0 flex flex-col lg:grid lg:grid-cols-4 gap-8 lg:gap-16`}
    >
      <Sidebar />
      <div className="col-span-3 flex flex-col xl:grid xl:grid-cols-3 gap-8 xl:gap-16">
        <div className="col-span-2 pb-10 xl:pt-10 order-2 xl:order-1">
          <Outlet />
        </div>
        <Card className="xl:sticky xl:top-32 mt-10 xl:mt-0 xl:mb-10 px-8 py-4 pb-6 flex flex-col !text-left order-1 xl:order-2">
          <h3 className="mb-5 text-xl">Suggested for you</h3>
          {
            suggestedUsersLoading ?
              <Loading />
            : suggestedUsersError ?
              'An error occurred'
            : suggestedUsers?.length ?
                <SuggestedUsers users={suggestedUsers} />
            :
              'Found no users to suggest'
          }
        </Card>
      </div>
    </div>
  );
};

export default MainLayout;
