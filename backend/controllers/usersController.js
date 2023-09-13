const Post = require("../models/Post.js");
const User = require("../models/User.js");

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.find({ username }).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// const getUserFriends = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const friends = await Promise.all(
//       user.followings.map((friendId) => {
//         return User.find(friendId);
//       })
//     );
//     let friendList = [];
//     friends.map((friend) => {
//       const { _id, username, profilePicture } = friend;
//       friendList.push({ _id, username, profilePicture });
//     });
//     res.status(200).json(friendList);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const followUser = async (req, res) => {
  if (req.body.username !== req.params.username) {
    try {
      const user = await User.findOne({ username: req.params.username });
      const currentUser = await User.findOne({ username: req.body.username });

      if (!user.followers.includes(req.body.username)) {
        user.followers.push(req.body.username);
        currentUser.following.push(req.params.username);

        await user.save();
        await currentUser.save();

        res.status(200).json("User has been followed!");
      } else {
        res.status(403).json("You already follow this user.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal Server Error.");
    }
  } else {
    res.status(403).json("You can't follow yourself.");
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "followers"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const followers = user.followers;
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "following"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const following = user.following;
    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const blockUnblockUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.body.username });
    const userToModify = await User.findOne({ username: req.params.username });

    if (!currentUser || !userToModify) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBlocked = currentUser.blockedUsers.includes(userToModify.username);

    if (isBlocked) {
      currentUser.blockedUsers = currentUser.blockedUsers.filter(
        (blockedUsername) => blockedUsername !== userToModify.username
      );
      await currentUser.save();
      res.status(200).json({ message: "User has been unblocked" });
    } else {
      currentUser.blockedUsers.push(userToModify.username);
      await currentUser.save();
      res.status(200).json({ message: "User has been blocked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBlockedUsers = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      username: req.params.username,
    }).populate("blockedUsers", "username");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const blockedUsers = currentUser.blockedUsers;
    res.status(200).json(blockedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.params.username });
    const postToToggle = await Post.findById(req.params.postId);

    if (!currentUser || !postToToggle) {
      return res.status(404).json({ message: "User or post not found" });
    }

    const isBookmarked = currentUser.bookmarks.includes(postToToggle._id);

    if (isBookmarked) {
      currentUser.bookmarks = currentUser.bookmarks.filter(
        (postId) => postId.toString() !== postToToggle._id.toString()
      );
      await currentUser.save();
      res.status(200).json({ message: "Post has been unbookmarked" });
    } else {
      currentUser.bookmarks.push(postToToggle._id);
      await currentUser.save();
      res.status(200).json({ message: "Post has been bookmarked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookmarkedPosts = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      username: req.params.username,
    }).populate(
      "bookmarks",
      "_id username firstName lastName description postImage userPicture"
    );

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarkedPosts = currentUser.bookmarks;
    res.status(200).json(bookmarkedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUser,
  followUser,
  getFollowing,
  getFollowers,
  blockUnblockUser,
  getBlockedUsers,
  toggleBookmark,
  getBookmarkedPosts,
};
