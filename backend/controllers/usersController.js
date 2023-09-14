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
  try {
    const userToFollow = await User.findOne({ username: req.params.username });
    const currentUser = await User.findOne({ username: req.body.username });

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(userToFollow._id);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (userId) => userId.toString() !== userToFollow._id.toString()
      );
      await currentUser.save();

      userToFollow.followers = userToFollow.followers.filter(
        (userId) => userId.toString() !== currentUser._id.toString()
      );
      await userToFollow.save();

      res.status(200).json("You have unfollowed this user.");
    } else {
      currentUser.following.push(userToFollow._id);
      await currentUser.save();

      userToFollow.followers.push(currentUser._id);
      await userToFollow.save();

      res.status(200).json("You are now following this user.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error.");
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $match: { username: req.params.username },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followersData",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstName: 1,
          lastName: 1,
          userPicture: 1,
          followers: { $size: "$followersData" },
        },
      },
    ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $match: { username: req.params.username },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followersData",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstName: 1,
          lastName: 1,
          userPicture: 1,
          followers: { $size: "$followersData" },
        },
      },
    ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const isFollowing = async (req, res) => {
  try {
    const currentUser = req.user;

    const userToCheck = await User.findOne({ username: req.params.username });
    if (!userToCheck) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(
      userToCheck._id.toString()
    );

    res.status(200).json({ isFollowing });
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

    const isBlocked = currentUser.blockedUsers.includes(userToModify._id);

    if (isBlocked) {
      currentUser.blockedUsers = currentUser.blockedUsers.filter(
        (blockedUserId) =>
          blockedUserId.toString() !== userToModify._id.toString()
      );
      await currentUser.save();
      res.status(200).json({ message: "User has been unblocked" });
    } else {
      currentUser.blockedUsers.push(userToModify._id);
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
    }).populate("blockedUsers", "username firstName lastName userPicture");

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
      res.status(200).json({
        message: "Post has been unbookmarked",
      });
    } else {
      currentUser.bookmarks.push(postToToggle._id);
      await currentUser.save();
      res.status(200).json({
        message: "Post has been bookmarked",
      });
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
      "_id username firstName lastName description postImage userPicture createdAt"
    );

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarkedPosts = currentUser.bookmarks.reverse();
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
  isFollowing,
  blockUnblockUser,
  getBlockedUsers,
  toggleBookmark,
  getBookmarkedPosts,
};
