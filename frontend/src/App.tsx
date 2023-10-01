import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { selectMode, selectUser, setUser } from "./store/slices/authSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "./pages/ErrorPage";

import Navbar from "./components/Navbar";

import MainLayout from "./pages/MainLayout";
import ProfileLayout from "./pages/ProfileLayout";

import Register from "./pages/Register";
import LogIn from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Followings from "./pages/Following";

import Timeline from "./pages/Timeline";
import PostPage from "./pages/PostPage";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import FindFriends from "./pages/FindFriends";
import Chats from "./pages/Chats";
import { MessageType } from "./Types/Message.types";
import { NotificationType } from "./Types/Notification.types";
import { ProfileType } from "./Types/Profile.types";

const App: React.FC = () => {
  const mode = useSelector(selectMode);
  document.body.classList.toggle("dark", mode === "dark");
  document.documentElement.classList.toggle("dark", mode === "dark");

  const [navIsSticky, setNavIsSticky] = useState(false);

  const stickyNav = () => {
    if (
      document.body.scrollTop > 120 ||
      document.documentElement.scrollTop > 120
    ) {
      setNavIsSticky(true);
    } else {
      setNavIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyNav);

    return () => window.removeEventListener("scroll", stickyNav);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);
  const [onlineUsers, setOnlineUsers] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [sendMessage, setSendMessage] = useState<MessageType | null>(null);
  const [receiveMessage, setReceiveMessage] = useState<MessageType | null>(
    null
  );

  const dispatch = useDispatch();
  const localToken = localStorage.getItem("token");
  useEffect(() => {
    if (!localToken) {
      setIsLoading(false);
      return;
    }
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "https://socio-irdl.onrender.com/api/v1/validateToken",
          {
            token: localToken,
          }
        );
        dispatch(setUser(response.data.userData));
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchToken();
  }, [dispatch, localToken]);

  const [socketio] = useState<Socket>(io("wss://socio-irdl.onrender.com/"));

  useEffect(() => {
    if (user) {
      socketio.emit("new-user-add", user?.username);
      socketio.on("get-users", (users) => {
        const status: { [key: string]: boolean } = {};
        users.forEach((user: ProfileType) => {
          status[user.username] = true;
        });
        setOnlineUsers(status);
      });

      const receiveMessageHandler = (data: MessageType) => {
        setReceiveMessage(data);
      };
      socketio.on("receive-message", receiveMessageHandler);

      const getNotificationHandler = (data: NotificationType) => {
        const currentDateAndTime = new Date().toISOString();
        setNotifications((prev) => [
          { ...data, createdAt: currentDateAndTime },
          ...prev,
        ]);
      };
      socketio.on("getNotification", getNotificationHandler);

      return () => {
        socketio.off("receive-message", receiveMessageHandler);
        socketio.off("getNotification", getNotificationHandler);
        socketio.disconnect();
        setReceiveMessage(null);
      };
    }
  }, [user, socketio]);
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get(
        "https://socio-irdl.onrender.com/api/v1/notifications"
      );
      setNotifications(response.data);
    };
    fetchNotifications();
  }, []);

  if (isLoading) return;
  return (
    <div className="dark:bg-primaryDark w-full h-full">
      <Navbar
        navIsSticky={navIsSticky}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
        <Route
          path="/chats"
          element={
            !user ? (
              <LogIn />
            ) : (
              <Chats
                setSendMessage={setSendMessage}
                sendMessage={sendMessage}
                receiveMessage={receiveMessage}
                setReceiveMessage={setReceiveMessage}
                socket={socketio}
                onlineUsers={onlineUsers}
              />
            )
          }
        />
        <Route
          path="/chats/:username"
          element={
            !user ? (
              <LogIn />
            ) : (
              <Chats
                setSendMessage={setSendMessage}
                sendMessage={sendMessage}
                receiveMessage={receiveMessage}
                setReceiveMessage={setReceiveMessage}
                socket={socketio}
                onlineUsers={onlineUsers}
              />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          element={
            user ? (
              <MainLayout socket={socketio} navIsSticky={navIsSticky} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/" element={<Timeline socket={socketio} />} />
          <Route path="/post/:id" element={<PostPage socket={socketio} />} />
          <Route
            path="/find-friends"
            element={<FindFriends socket={socketio} />}
          />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
        <Route
          path="/settings"
          element={
            user ? (
              <Settings navIsSticky={navIsSticky} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          element={
            user ? (
              <ProfileLayout socket={socketio} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route
            path="/profile/:username"
            element={<Profile socket={socketio} />}
          />
          <Route
            path="/profile/:username/followers"
            element={<Followers socket={socketio} />}
          />
          <Route
            path="/profile/:username/following"
            element={<Followings socket={socketio} />}
          />
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
        progressStyle={{ backgroundColor: "#0ea5e9" }}
      />
    </div>
  );
};

export default App;
