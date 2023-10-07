require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const { register } = require("./controllers/authController");
const { createPost, editPost } = require("./controllers/postsController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/usersRoutes");
const postRouter = require("./routes/postsRoutes");
const activityRouter = require("./routes/activityRoutes");
const commentRouter = require("./routes/commentsRoutes");
const searchRouter = require("./routes/searchRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messagesRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const CustomError = require("./errors/index");
var cron = require("node-cron");
const axios = require("axios");

const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*" }));
const path = require("path");
const authenticateUser = require("./middleware/authenticateUser");
const { updateUserPicture } = require("./controllers/usersController");
const User = require("./models/User");
const Notification = require("./models/Notification");

const profilePictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/profile_pics");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const postAssetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/post_assets");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const uploadProfilePicture = multer({ storage: profilePictureStorage });
const uploadPostAsset = multer({ storage: postAssetStorage });

app.get("/", (req, res) => {
  const responseData = {
    message: "YO, HOW U DOIN?",
  };

  res.status(200).json(responseData);
});

cron.schedule("*/5 * * * *", () => {
  console.log("SERVER PING IS ALRIGHT!");
  const serverUrl = "https://socio-irdl.onrender.com";
  axios
    .get(serverUrl)
    .then((response) => {
      if (response.status === 200) {
        console.log(`Request sent to ${serverUrl}`);
      } else {
        console.error(
          `Failed to send request to ${serverUrl}. Status code: ${response.status}`
        );
      }
    })
    .catch((error) => {
      console.error(`Error sending request to ${serverUrl}: ${error.message}`);
    });
});

app.use(
  "/profile_pics",
  express.static(path.join(__dirname, "public/uploads/profile_pics"))
);
app.use(
  "/post_assets",
  express.static(path.join(__dirname, "public/uploads/post_assets"))
);

app.use(express.static(path.join(__dirname, "build")));

app.post(
  "/api/v1/posts",
  authenticateUser,
  uploadPostAsset.single("postImage"),
  createPost
);

app.patch(
  "/api/v1/posts/:postId",
  uploadPostAsset.single("postImage"),
  authenticateUser,
  editPost
);

app.post(
  "/api/v1/updateUserPicture",
  authenticateUser,
  uploadProfilePicture.single("userPicture"),
  updateUserPicture
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", activityRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/posts", commentRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/notifications", notificationRouter);

app.use("/api/v1/validateToken", authenticateUser, async (req, res) => {
  const userData = req.user;
  if (!userData) {
    throw new CustomError.UnauthenticatedError("Token not valid");
  }
  res.status(200).json({ userData });
});

let onlineUsers = [];

const getUsers = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUsername) => {
    if (!onlineUsers.some((user) => user.username === newUsername)) {
      onlineUsers.push({ username: newUsername, socketId: socket.id });
      console.log("New User Connected", onlineUsers);
    }

    io.emit("get-users", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", onlineUsers);

    io.emit("get-users", onlineUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverUsername, _id } = data;
    const user = onlineUsers.find((user) => user.username === receiverUsername);

    console.log("Sending from socket to:", receiverUsername);
    console.log("Data:", data);

    if (user) {
      io.to(user.socketId).emit("receive-message", { ...data, _id });
      console.log(user.socketId);
      console.log("RECEIVED");
    }
  });

  socket.on(
    "sendNotification",
    async ({ senderUsername, receiverUsername, actionType, postId }) => {
      if (senderUsername !== receiverUsername) {
        const sender = await User.findOne({ username: senderUsername }).lean();

        const receiver = getUsers(receiverUsername);

        if (receiver && receiver.socketId) {
          let notification = await Notification.findOne({
            senderUsername,
            actionType,
            postId,
          }).lean();

          const notificationData = {
            _id: notification._id,
            senderUsername,
            actionType,
            username: sender.username,
            userPicture: sender.userPicture,
            firstName: sender.firstName,
            lastName: sender.lastName,
          };
          if (actionType !== "follow") {
            notificationData.postId = postId;
          }
          io.to(receiver.socketId).emit("getNotification", notificationData);
        }
      }
    }
  );
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
