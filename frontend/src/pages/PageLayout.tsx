import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mx-4 sm:mx-10 md:mx-20 mt-10">
      <Outlet />
    </div>
  );
};

export default PageLayout;
