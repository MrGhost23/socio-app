const User = require("../models/User");
const Activity = require("../models/Activity");

const getAllUserActivities = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const activities = await Activity.find({ userId: user._id })
      .sort({
        timestamp: -1,
      })
      .populate([
        { path: "userId", select: "username" },
        { path: "postId", select: "username" },
      ]);
    const formattedActivities = activities.map((activity) => ({
      _id: activity._id,
      actionType: activity.actionType,
      postId: activity.postId._id,
      postAuthorUsername: activity.postId.username,
    }));
    res.status(200).json(formattedActivities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllUserActivities };
