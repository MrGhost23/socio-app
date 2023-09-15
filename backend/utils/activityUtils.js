const Activity = require("../models/Activity");

const cleanupActivities = async (userId) => {
  try {
    const userActivities = await Activity.find({ userId }).sort("-timestamp");
    if (!userActivities) {
      return;
    }

    if (userActivities.length > 5) {
      const activitiesToDelete = userActivities.slice(
        0,
        userActivities.length - 5
      );

      for (const activity of activitiesToDelete) {
        await Activity.deleteOne({ _id: activity._id });
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error cleaning up activities");
  }
};

const createActivity = async (userId, postId, type) => {
  const newActivity = new Activity({
    userId,
    postId,
    type,
    timestamp: Date.now(),
  });
  await newActivity.save();
  await cleanupActivities(5);

  console.log(newActivity);

  return newActivity;
};

const deleteActivity = async (userId, postId, type) => {
  const test = await Activity.findOneAndDelete({ userId, postId, type });
  console.log(test);
};

const getLatestActivities = async (username) => {
  return Activity.findOne({ username }).sort({ timestamp: -1 }).limit(5).exec();
};

module.exports = {
  createActivity,
  deleteActivity,
  getLatestActivities,
  cleanupActivities,
};
