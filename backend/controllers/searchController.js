const User = require("../models/User");
const Post = require("../models/Post");

const searchUsers = async (query) => {
  const regex = new RegExp(query, "i");
  const users = await User.find({
    $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
  });
  return users;
};

const searchPosts = async (query) => {
  const regex = new RegExp(query, "i");
  const posts = await Post.find({
    $or: [{ description: regex }],
  });
  return posts;
};

module.exports = {
  searchUsers,
  searchPosts,
};
