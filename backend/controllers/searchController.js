const User = require("../models/User");
const Post = require("../models/Post");

const searchUsers = async (query, currentUser) => {
  const regex = new RegExp(query, "i");

  const allUsers = await User.find({
    $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
  });

  const users = allUsers.filter(
    (user) => !currentUser.blockedUsers.includes(user._id)
  );

  return users;
};

const searchPosts = async (query, currentUser) => {
  const regex = new RegExp(query, "i");
  const blockedUsers = currentUser.blockedUsers.map((userId) =>
    userId.toString()
  );

  const posts = await Post.find({
    $and: [
      { $or: [{ description: regex }] },
      {
        userId: {
          $nin: blockedUsers,
        },
      },
    ],
  });

  return posts;
};

module.exports = {
  searchUsers,
  searchPosts,
};
