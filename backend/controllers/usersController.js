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

module.exports = {
  getUser,
  followUser,
};
