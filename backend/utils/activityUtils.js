const Activity = require("../models/Activity");

const cleanupActivities = async (limit) => {
  const activities = await Activity.find().sort({ timestamp: 1 });
  if (activities.length > limit) {
    const activitiesToDelete = activities.slice(0, activities.length - limit);
    for (const activity of activitiesToDelete) {
      await Activity.findByIdAndRemove(activity._id);
    }
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
