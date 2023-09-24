const Notification = require("../models/Notification");

const getNotificationsWithUserData = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id })
      .populate("sender", "firstName lastName userPicture isRead createdAt")
      .sort({ createdAt: -1 });

    const formattedNotifications = notifications.map((notification) => ({
      firstName: notification.sender.firstName,
      lastName: notification.sender.lastName,
      userPicture: notification.sender.userPicture,
      actionType: notification.actionType,
      postId: notification.postId,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    }));

    formattedNotifications.sort((a, b) => b.createdAt - a.createdAt);

    res.json(formattedNotifications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getNotificationsWithUserData,
};
