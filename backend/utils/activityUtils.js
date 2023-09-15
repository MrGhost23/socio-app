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

module.exports = {
  cleanupActivities,
};
