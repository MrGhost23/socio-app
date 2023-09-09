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
const cookieParser = require("cookie-parser");
const { authenticateUser } = require("./middleware/authentication");
const jwt = require("jsonwebtoken");
const CustomError = require("./errors/index");

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const path = require("path");

// EXPRESS STATIC HERE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "build")));

app.post("/api/v1/auth/register", upload.single("picture"), register);
app.post("/posts", authenticateUser, upload.single("picture"), createPost);

app.use("/api/v1/validateToken", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    throw new CustomError.NotFoundError("Could not find token");
  }

  const userData = jwt.decode(token, process.env.JWT_SECRET);
  if (!userData) {
    throw new CustomError.UnauthenticatedError("Token not valid");
  }
  res.status(200).json({ userData });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

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
