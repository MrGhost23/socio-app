const User = require("../models/User");
const Post = require("../models/Post");

const searchUsers = async (query, currentUser) => {
  const regex = new RegExp(query, "i");

  const allUsers = await User.find({
    $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
  });

  const blockedUserIds = currentUser.blockedUsers.map((userId) =>
    userId.toString()
  );
  const blockedByIds = currentUser.blockedBy.map((userId) => userId.toString());

  const users = allUsers.filter((user) => {
    return (
      !blockedUserIds.includes(user._id.toString()) &&
      !blockedByIds.includes(user._id.toString())
    );
  });

  return users;
};

const searchPosts = async (query, currentUser) => {
  const regex = new RegExp(query, "i");
  const blockedUserIds = currentUser.blockedUsers.map((userId) =>
    userId.toString()
  );
  const blockedByIds = currentUser.blockedBy.map((userId) => userId.toString());

  const posts = await Post.find({
    $and: [
      { $or: [{ description: regex }] },
      {
        userId: {
          $nin: [...blockedUserIds, ...blockedByIds],
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
