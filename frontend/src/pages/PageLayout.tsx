import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
      <Outlet />
    </div>
  );
};

export default PageLayout;
