const { find, deleteOne } = require("../models/Activity");

const cleanupActivities = async (userId) => {
  try {
    const userActivities = await find({ userId });
    userActivities.sort((a, b) => b.timestamp - a.timestamp);

    if (userActivities.length === 0) {
      return;
    }

    if (userActivities.length > 5) {
      const activitiesToDelete = userActivities.slice(
        0,
        userActivities.length - 5
      );
      await deleteOne({ _id: { $in: activitiesToDelete.map((a) => a._id) } });
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Error cleaning up activities: ${error.message}`);
  }
};

module.exports = {
  cleanupActivities,
};
