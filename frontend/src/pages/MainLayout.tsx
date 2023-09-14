import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/User/SuggestedUsers";
import Card from "../ui/Card";
import { selectSideOpen } from "../store/slices/sidebarSlice";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const suggestedUsers = [];

  const sideOpen = useSelector(selectSideOpen);

  return (
    <div
      className={`w-full ${
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
          <SuggestedUsers users={suggestedUsers} />
        </Card>
      </div>
    </div>
  );
};

export default MainLayout;
