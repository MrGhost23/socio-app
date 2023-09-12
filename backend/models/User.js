const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    username: {
      type: String,
      required: [true, "Username must be provided"],
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email must be provided"],
      validator: {
        validate: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      minlength: 6,
    },
    userPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      default: "",
      max: 50,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    country: String,
    occupation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
