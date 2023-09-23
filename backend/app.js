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
const { createPost } = require("./controllers/postsController");
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
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
const path = require("path");
const authenticateUser = require("./middleware/authenticateUser");
const { updateUserPicture } = require("./controllers/usersController");
const User = require("./models/User");

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
    const { receiverUsername } = data;
    const user = onlineUsers.find((user) => user.username === receiverUsername);

    console.log("Sending from socket to:", receiverUsername);
    console.log("Data:", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
      console.log(user.socketId);
      console.log("RECEIVED");
    }
  });

  socket.on(
    "sendNotification",
    async ({
      senderUsername,
      receiverUsername,
      actionType,
      postId,
      userPicture,
      firstName,
      lastName,
    }) => {
      const sender = await User.findOne({ username: senderUsername });

      const receiver = getUsers(receiverUsername);
      io.to(receiver.socketId).emit("getNotification", {
        senderUsername,
        actionType,
        postId,
        userPicture: sender.userPicture,
        firstName: sender.firstName,
        lastName: sender.lastName,
      });
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
