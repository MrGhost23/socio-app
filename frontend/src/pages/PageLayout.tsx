import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className='grid grid-cols-4 gap-12 mx-72 my-10'>
    
      <Outlet />
    </div>
  );
};

export default PageLayout;