import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "./pages/ErrorPage";

import Register from "./pages/Register";
import LogIn from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import ProfileLayout from "./pages/ProfileLayout";
import Timeline from "./pages/Timeline";
import Navbar from "./components/Navbar";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import MainLayout from "./pages/MainLayout";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Timeline />} />
        </Route>
        <Route element={<ProfileLayout />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id/followers" element={<Followers />} />
          <Route path="/profile/:id/following" element={<Following />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        progressStyle={{ backgroundColor: "#D9083A" }}
      />
    </>
  );
};

export default App;
