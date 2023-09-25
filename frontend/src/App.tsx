import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { selectUser, setUser } from "./store/slices/authSlice";

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

interface Message {
  senderUsername: string;
  text: string;
  chatId: string;
  receiverUsername: string;
}

const App: React.FC = () => {
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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [sendMessage, setSendMessage] = useState<Message | null>(null);
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
          "http://localhost:5000/api/v1/validateToken",
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

  const [socketio] = useState<Socket>(io("ws://localhost:5000"));

  useEffect(() => {
    if (user) {
      const socket = io("ws://localhost:5000");
      socket.emit("new-user-add", user?.username);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
      socket.on("receive-message", (data) => {
        setReceiveMessage(data);
      });
      socket.on("getNotification", (data) => {
        const currentDateAndTime = new Date().toISOString();
        setNotifications((prev) => [
          { ...data, createdAt: currentDateAndTime },
          ...prev,
        ]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/notifications"
      );
      setNotifications(response.data);
    };
    fetchNotifications();
  }, []);

  if (isLoading) return;
  return (
    <>
      <Navbar navIsSticky={navIsSticky} notifications={notifications} />
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
                socket={socketio}
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
                socket={socketio}
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
        <Route element={user ? <ProfileLayout /> : <Navigate to="/login" />}>
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
    </>
  );
};

export default App;
