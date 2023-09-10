import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/User/SuggestedUsers";
import Card from "../ui/Card";
import { selectSideOpen } from "../store/slices/sidebarSlice";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const suggestedUsers = [
    {
      id: "1",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480477833203742/ce7ca87cc7bd870fc40642fd245b011b.png",
      fullName: "Omar Mohamed",
      followers: 400,
    },
    {
      id: "2",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480078644531220/352a1b49195bfa773765b4fdfb17da42.png",
      fullName: "Tomasa Runolfsson",
      followers: 400,
    },
    {
      id: "3",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140479590012309534/50e2e84b6427e2112ea02507b5bc849f.png",
      fullName: "Hubert White",
      followers: 400,
    },
    {
      id: "4",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140477104467742791/6183b49eced8a25862b25a0f2f110f94.png",
      fullName: "Adelbert Sawayn",
      followers: 400,
    },
    {
      id: "5",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140476544339427468/38f761c6e7dd7701cacaa81409ffbaa2.png",
      fullName: "Yvette Mayer",
      followers: 400,
    },
  ];

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
