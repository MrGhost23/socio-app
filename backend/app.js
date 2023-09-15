require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const CustomError = require("./errors/index");

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
const path = require("path");
const authenticateUser = require("./middleware/authenticateUser");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/assets", express.static(path.join(__dirname, "public", "assets")));

app.use(express.static(path.join(__dirname, "build")));

app.post("/api/v1/auth/register", upload.single("userPicture"), register);
app.post(
  "/api/v1/posts",
  authenticateUser,
  upload.single("postImage"),
  createPost
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", activityRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/posts", commentRouter);

app.use("/api/v1/validateToken", authenticateUser, async (req, res) => {
  const userData = req.user;
  if (!userData) {
    throw new CustomError.UnauthenticatedError("Token not valid");
  }
  res.status(200).json({ userData });
});
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
